import Link from "next/link";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Layout from "../components/layout";

export default function Post({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Layout>
      <Container>
        <Navbar>
          <Nav></Nav>
        </Navbar>
        <Row>
          <Col xs={0} lg={3}></Col>
          <Col lg={9}>
            <Link href="/" as={`${process.env.BACKEND_URL}/`}>
              ← Home
            </Link>
            <h1 style={{ paddingBottom: "2rem", paddingTop: "3rem" }}>
              {title}
            </h1>
            {children}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
