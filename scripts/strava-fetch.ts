#!/usr/bin/env bun
/**
 * Fetches 12 most recent Strava activities + their latlng streams.
 * Writes output to src/data/strava.json.
 *
 * Usage: bun scripts/strava-fetch.ts
 */

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
      client_id: process.env.STRAVA_CLIENT_ID,
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
  // Check if current token is still valid (Strava tokens expire after 6 hours)
  // We always refresh to keep things simple
  return await refreshTokens();
}

async function fetchActivities(token: string): Promise<SummaryActivity[]> {
  const res = await fetch(`${BASE}/athlete/activities?per_page=12&page=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok)
    throw new Error(
      `Activities fetch failed: ${res.status} ${await res.text()}`,
    );
  return res.json() as Promise<SummaryActivity[]>;
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

  // Normalize to 0–1, preserve aspect ratio
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
  const activities = await fetchActivities(token);
  console.log(`Got ${activities.length} activities`);

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
      date: activity.start_date,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elevation_gain: activity.total_elevation_gain,
      point_count: latlng.length,
      path, // normalized SVG path string, 200x200 viewport
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
