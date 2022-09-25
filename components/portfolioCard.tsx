import Image from "next/future/image";
import Link from "next/link";
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
          <div className={utilStyles.card}>
            <div>
              <div>{props.title}</div>
              <div>{props.subTitle}</div>
            </div>
            <Image src={props.img} alt={props.title} width={50} height={50} />
          </div>
        </a>
      </Link>
    </div>
  );
}
