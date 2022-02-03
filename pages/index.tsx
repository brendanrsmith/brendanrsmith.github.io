import Image from "next/image";
import utilStyles from "../styles/utils.module.css";
import { Col, Container, Row } from "react-bootstrap";
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
      <Container fluid="xl" className={utilStyles.wrapper}>
        <Row className="align-items-start">
          <Col lg={4} xl={3} className={utilStyles.homeCard}>
            <Image
              priority
              loader={customLoader}
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={180}
              width={180}
              alt={name}
            />
            <h1 style={{ marginTop: "0.5rem" }}>Brendan Smith</h1>
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
          </Col>
          <Col id="Content" lg={8} xl={9}>
            <Container>
              <Row>
                <h4 className={"mt-4"}>Portfolio</h4>
              </Row>
              <Row xs={1}>
                <Col style={{}}>
                  <PortfolioCard
                    url={"/ferryfriend"}
                    img={"/images/ff/hero-long.png"}
                    title={"FerryFriend 4.0"}
                    subTitle={
                      "A ground-up rebuild of the FerryFriend app for React Native"
                    }
                  />
                </Col>
              </Row>
              <Row xs={1} md={2}>
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
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
