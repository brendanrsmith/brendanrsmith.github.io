import Image from "next/future/image";
import Layout from "../components/layout";
import PortfolioCard from "../components/portfolioCard";

const name = "Brendan Smith";
export const siteTitle = "Brendan Smith";
export const customLoader = ({ src }: { src: string }): string => {
  return src;
};

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto ">
        <div className="mx-auto flex flex-col items-center justify-center h-screen w-fit">
          <Image
            priority
            loader={customLoader}
            unoptimized
            src="/images/profile.jpg"
            className="rounded-full"
            height={180}
            width={180}
            alt={name}
          />
          <h1 className="text-3xl mt-3">Brendan Smith</h1>
          <div className="text-lg text-center max-w-xs">
            <section className="pt-4">
              <p>I am a software developer</p>
              <p>who solves real problems</p>
              <p>with modern technologies.</p>
              <p className="pt-4">
                Contact me by emailing{" "}
                <a
                  className="transition text-indigo-500 dark:text-indigo-300 hover:underline"
                  href="mailto:me@brendansmith.dev"
                >
                  me@brendansmith.dev
                </a>
              </p>
            </section>
            <section className="flex justify-around pt-4">
              <p>
                <a
                  className="text-indigo-500 dark:text-indigo-300 hover:underline"
                  href="https://github.com/brendanrsmith"
                >
                  GitHub
                </a>
              </p>
              <p>
                <a
                  className="text-indigo-500 dark:text-indigo-300 hover:underline"
                  href="https://www.linkedin.com/in/brendanrsmith/"
                >
                  LinkedIn
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
      <div className="-mt-8 text-center">
        <a href="#portfolio">Projects ⤵</a>
      </div>
      <div id="portfolio" className="">
        <div className={"mt-4"}>
          <h4>Portfolio</h4>
        </div>
        <div>
          <PortfolioCard
            url={"/ferryfriend"}
            img={"/images/ff/hero-long.png"}
            title={"FerryFriend 4.0"}
            subTitle={"A ground-up rebuild of FerryFriend using React Native"}
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
            title={"Demo Projects"}
            subTitle={"Feature demonstration apps"}
          />
        </div>
      </div>
    </Layout>
  );
}
