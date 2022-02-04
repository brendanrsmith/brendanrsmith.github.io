import Link from "next/link";
import { Card } from "react-bootstrap";
import utilStyles from "../styles/utils.module.css";

export default function PortfolioCard(props: {
  url: string;
  img: string;
  title: string;
  subTitle: string;
}): JSX.Element {
  return (
    <div>
      <Link href={props.url} as={process.env.BACKEND_URL + props.url}>
        <a>
          <Card className={utilStyles.card}>
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Subtitle>{props.subTitle}</Card.Subtitle>
            </Card.Body>
            <Card.Img variant="bottom" src={props.img} alt={props.title} />
          </Card>
        </a>
      </Link>
    </div>
  );
}
