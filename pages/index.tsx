import Image from "next/future/image";
import utilStyles from "../styles/utils.module.css";
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
      <div className={utilStyles.wrapper}>
        <div className="align-items-start">
          <div className={utilStyles.homeCard}>
            <Image
              priority
              loader={customLoader}
              unoptimized
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={180}
              width={180}
              alt={name}
            />
            <h1 className="text-2xl" style={{ marginTop: "0.5rem" }}>Brendan Smith</h1>
            <div className={utilStyles.bioText}>
              <section>
                <p style={{ paddingTop: "0.5rem" }}>
                  I am a software developer
                  <br />
                  who solves real problems
                  <br />
                  with modern technologies.
                </p>
                <p style={{ paddingTop: "1rem" }}>
                  Contact me by emailing{" "}
                  <a href="mailto:me@brendansmith.dev">me@brendansmith.dev</a>
                </p>
              </section>
              <section className={utilStyles.links}>
                <p>
                  <a href="https://github.com/brendanrsmith">GitHub</a>
                </p>
                <p>
                  <a href="https://www.linkedin.com/in/brendanrsmith/">
                    LinkedIn
                  </a>
                </p>
              </section>
            </div>
          </div>
          <div id="Content" >
            <div>
              <div>
                <h4 className={"mt-4"}>Portfolio</h4>
              </div>
              <div>
                <div style={{}}>
                  <PortfolioCard
                    url={"/ferryfriend"}
                    img={"/images/ff/hero-long.png"}
                    title={"FerryFriend 4.0"}
                    subTitle={
                      "A ground-up rebuild of FerryFriend using React Native"
                    }
                  />
                </div>
              </div>
              <div>
                <PortfolioCard
                  url={"/rebu"}
                  img={"/images/rebu/rebu-square.png"}
                  title={"Rebu Native"}
                  subTitle={
                    "A React Native ridesharing app demo completed in 4 days"
                  }
                />
                <PortfolioCard
                  url={"/demos"}
                  img={"/images/demos/todo-square.png"}
                  title={"Demo Projects"}
                  subTitle={"Feature demonstration apps"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
