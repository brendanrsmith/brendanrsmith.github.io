#!/usr/bin/env bun
/**
 * Fetches recent Strava activities across ski/bike/run categories.
 * Paginates until it finds enough of each type or exhausts the feed.
 * Writes output to src/data/strava.json.
 *
 * Usage: bun scripts/strava-fetch.ts
 */

const TARGET_PER_CATEGORY = 20;

const CATEGORIES: Record<string, string[]> = {
  ski: ["BackcountrySki", "AlpineSki", "NordicSki"],
  bike: ["Ride", "MountainBikeRide", "GravelRide"],
  run: ["Run", "TrailRun"],
};

const ALL_SPORT_TYPES = new Set(Object.values(CATEGORIES).flat());

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE = "https://www.strava.com/api/v3";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

interface SummaryActivity {
  id: number;
  name: string;
  type: string;
  sport_type: string;
  start_date: string;
  distance: number; // meters
  moving_time: number; // seconds
  total_elevation_gain: number;
}

interface StreamSet {
  latlng?: { data: [number, number][] };
  altitude?: { data: number[] };
}

async function refreshTokens(): Promise<string> {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: parseInt(process.env.STRAVA_CLIENT_ID!, 10),
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: process.env.STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok)
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);

  const tokens = (await res.json()) as TokenResponse;
  console.log("Tokens refreshed. Update your .env with:");
  console.log(`  STRAVA_ACCESS_TOKEN=${tokens.access_token}`);
  console.log(`  STRAVA_REFRESH_TOKEN=${tokens.refresh_token}`);
  return tokens.access_token;
}

async function getAccessToken(): Promise<string> {
  return await refreshTokens();
}

function categoryFor(sportType: string): string | null {
  for (const [cat, types] of Object.entries(CATEGORIES)) {
    if (types.includes(sportType)) return cat;
  }
  return null;
}

async function fetchActivitiesByCategory(
  token: string,
): Promise<(SummaryActivity & { category: string })[]> {
  const counts: Record<string, number> = { ski: 0, bike: 0, run: 0 };
  const results: (SummaryActivity & { category: string })[] = [];
  let page = 1;

  while (Object.values(counts).some((n) => n < TARGET_PER_CATEGORY)) {
    const res = await fetch(
      `${BASE}/athlete/activities?per_page=50&page=${page}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!res.ok)
      throw new Error(
        `Activities fetch failed: ${res.status} ${await res.text()}`,
      );

    const batch = (await res.json()) as SummaryActivity[];
    if (batch.length === 0) break;

    let added = 0;
    for (const a of batch) {
      const cat = categoryFor(a.sport_type);
      if (cat && counts[cat] < TARGET_PER_CATEGORY) {
        results.push({ ...a, category: cat });
        counts[cat]++;
        added++;
      }
    }

    console.log(
      `  Page ${page}: ${batch.length} activities, ${added} kept — ski:${counts.ski} bike:${counts.bike} run:${counts.run}`,
    );
    page++;
  }

  return results;
}

async function fetchStreams(
  token: string,
  activityId: number,
): Promise<StreamSet> {
  const res = await fetch(
    `${BASE}/activities/${activityId}/streams?keys=latlng,altitude&key_by_type=true`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!res.ok) {
    console.warn(`  Streams fetch failed for ${activityId}: ${res.status}`);
    return {};
  }
  return res.json() as Promise<StreamSet>;
}

function normalizePath(latlng: [number, number][]): string {
  if (latlng.length < 2) return "";

  const lats = latlng.map((p) => p[0]);
  const lngs = latlng.map((p) => p[1]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;

  const scale = Math.min(1 / lngRange, 1 / latRange);
  const offsetX = (1 - lngRange * scale) / 2;
  const offsetY = (1 - latRange * scale) / 2;

  const points = latlng.map(([lat, lng]) => {
    const x = (lng - minLng) * scale + offsetX;
    const y = (maxLat - lat) * scale + offsetY; // flip Y axis
    return `${x.toFixed(4)},${y.toFixed(4)}`;
  });

  return `M${points.join("L")}`;
}

async function main() {
  console.log("Fetching Strava data...");

  const token = await getAccessToken();
  const activities = await fetchActivitiesByCategory(token);
  console.log(`Got ${activities.length} total activities`);

  const results = [];

  for (const activity of activities) {
    console.log(
      `  Fetching streams for: ${activity.name} (${activity.sport_type})`,
    );
    const streams = await fetchStreams(token, activity.id);

    const latlng = streams.latlng?.data ?? [];
    const path = normalizePath(latlng);

    results.push({
      id: activity.id,
      name: activity.name,
      type: activity.sport_type,
      category: activity.category,
      date: activity.start_date,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elevation_gain: activity.total_elevation_gain,
      point_count: latlng.length,
      path,
    });
  }

  const outDir = join(__dirname, "../src/data");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "strava.json");
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nWrote ${results.length} activities to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
