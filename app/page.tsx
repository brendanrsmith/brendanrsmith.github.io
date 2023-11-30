import Image from "next/image";
import PortfolioCard from "../components/portfolioCard";

export default function Page() {
  return (
    <div className=" mx-auto ">
      <div className="mx-auto flex h-screen w-fit flex-col items-center justify-center ">
        <Image
          priority
          src="/images/profile.jpg"
          className="rounded-full"
          height={180}
          width={180}
          alt={"Brendan Smith"}
        />
        <h1 className="mt-3 text-3xl">Brendan Smith</h1>
        <div className="max-w-xs text-center text-lg">
          <section className="pt-4">
            <p>I am a software developer</p>
            <p>who solves real problems</p>
            <p>with modern technologies.</p>
            <p className="pt-4">
              Contact me by emailing{" "}
              <a className="decoration-2 " href="mailto:me@brendansmith.dev">
                me@brendansmith.dev
              </a>
            </p>
          </section>
          <section className="flex justify-around pt-4">
            <p>
              <a
                className="decoration-2 "
                href="https://github.com/brendanrsmith"
              >
                GitHub
              </a>
            </p>
            <p>
              <a
                className="decoration-2 "
                href="https://www.linkedin.com/in/brendanrsmith/"
              >
                LinkedIn
              </a>
            </p>
          </section>
        </div>
      </div>
      <div id="portfolio" className=" m-auto mb-10 max-w-4xl ">
        <div className="-mt-10 pt-2 text-center">
          <a
            className="text-inherit hover:animate-pulse hover:text-inherit hover:no-underline"
            href="#portfolio"
          >
            Projects ⤵
          </a>
        </div>
        <div className="mx-auto my-8 grid max-w-3xl grid-cols-1 sm:grid-cols-2 ">
          <PortfolioCard
            url={"/ferryfriend"}
            img={"/images/ff/hero-long.png"}
            title={"FerryFriend 4"}
            subTitle={
              "A ground-up rebuild of the FerryFriend app using React Native"
            }
            hero
          />
          <PortfolioCard
            url={"/rebu"}
            img={"/images/rebu/rebu-square.png"}
            title={"Rebu Native"}
            subTitle={"A React Native ridesharing app demo completed in 4 days"}
          />
          <PortfolioCard
            url={"/demos"}
            img={"/images/demos/todo-square.png"}
            title={"Demonstration Projects"}
            subTitle={"Classic feature demonstration apps"}
          />
          <PortfolioCard
            url={"/first-project"}
            img={"/images/tilemaker/tile-home.png"}
            title={"TileMaker"}
            subTitle={"The first thing I ever built"}
          />
        </div>
      </div>
    </div>
  );
}
