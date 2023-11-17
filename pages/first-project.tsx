import Image from "next/image";
import Post from "../components/post";
import Section from "../components/section";

export default function FirstProject() {
  return (
    <Post title="TileMaker" date="Oct 5, 2022">
      <Section>
        <div className="flex justify-center">
          <div className="m-4 max-w-2xl">
            <Image
              src={"/images/tilemaker/tile-purple.png"}
              alt="Purple and blue tile"
              width={3000}
              height={2000}
            />
          </div>
        </div>
        <p>
          TileMaker is the first thing functioning web application I ever built.
          A last minute application to a coding bootcamp, I constructed this app
          from start to finish in two days, over christmas, while visiting my
          parents.
        </p>
        <div className="flex justify-center">
          <div className="m-4 max-w-2xl">
            <Image
              src={"/images/tilemaker/tile-home.png"}
              alt="Purple and blue tile"
              width={1280}
              height={1209}
              className="rounded"
            />
          </div>
        </div>
        <p>
          Built using basic HTML, CSS, and (poorly understood) Javascipt, along
          with extensive googling, it allows for users to design a tile
          (rectangle) with varying rotation, color, size, and background colors.
          The resultant tile is then repeated 3x3 on a canvas element, with an
          option to save individual &apos;mosaics&apos; using the browser&apos;s
          localStorage. This simple recipe gives rise to lots of interesting
          designs.
        </p>
        <div className="flex justify-center">
          <div className="m-4 max-w-2xl">
            <Image
              src={"/images/tilemaker/tile-gallery.png"}
              alt="Purple and blue tile"
              width={1280}
              height={1218}
              className="rounded"
            />
          </div>
        </div>
        <p>
          Later, I deployed the site to Github pages, where it{" "}
          <a href="https://www.brendansmith.dev/tilemaker">lives to this day</a>
          .
        </p>
        <p>
          I really enjoy looking back on this project, and marveling at how far
          I&apos;ve come on my journey as a developer in such a relatively short
          period of time. This project felt expansive in its possibility at the
          time, and was a definitey cayalyst for my getting more serious about
          pursiing software developement.
        </p>
        <p>Plus, it&apos;s still fun to try and design the *perfect* tile.</p>
      </Section>
    </Post>
  );
}
