import Post from "../components/post";
import Image from "next/image";
import Section from "../components/section";

export default function Demos() {
  return (
    <Post title="Demo Projects" date="December 16, 2021">
      <Section>
        <p>
          Below are a selection of simple feature demonstration applications
          designed to showcase various technologies and features.
        </p>

        <p>
          Technologies used include: React, Redux, React-Router, MongoDB,
          Express, Heroku, Netlify, Github Pages, and Axios.{" "}
        </p>
      </Section>

      <Section title="RESTy">
        <h4>RESTy</h4>
        <p>
          A React based application which allows users to hit HTTP routes with
          GET, PUT, POST, or DELETE method requests, utilizing React state to
          store user input, Ajax for api calls, react-router for route
          management, and local storage for persistence. The app is deployed via
          Github Pages.
          <a href="https://www.brendansmith.dev/resty/"> Check it out here </a>
          or view the
          <a href="https://github.com/brendanrsmith/resty"> Github Repo</a>.
        </p>
        <div className="m-4 max-w-xl shadow">
          <Image
            src={"/images/demos/resty-square.png"}
            height={1280}
            width={1280}
            alt="RESTy API utility"
            className="rounded"
          />
        </div>
      </Section>

      <Section title="Todo">
        <p>
          A React web application using context for state management, Axios for
          network requests, an Express server, and a MongoDB Database. The api
          server is deployed via Heroku, and the frontend is deployed via Github
          Pages.
          <a href="https://www.brendansmith.dev/todo/"> See the app here </a>
          or check out the
          <a href="https://github.com/brendanrsmith/todo"> Github Repo </a>
          (please note the server may take a few seconds to spin up).
        </p>
        <div className="m-4 max-w-xl shadow">
          <Image
            src={"/images/demos/todo-square.png"}
            height={1280}
            width={1280}
            alt="Todo app, styled with Material UI"
            className="rounded"
          />
        </div>
      </Section>

      <Section title="Storefront">
        <p>
          A React web application using Redux for state management, React-router
          for routing, Axios for network requests, deployed on Github Pages. An
          Express api server is deployed on Heroku, using MongoDB for data
          persistence.
          <a href="https://www.brendansmith.dev/storefront/"> View the app </a>
          or the
          <a href="https://github.com/brendanrsmith/storefront">
            {" "}
            Github Repo{" "}
          </a>
          (again, the server may take a few seconds to spin up).
        </p>
        <div className="m-4 max-w-xl shadow">
          <Image
            src={"/images/demos/storefront-square.png"}
            height={1250}
            width={1280}
            alt="Ecommerce emulation application"
            className="rounded"
          />
        </div>
      </Section>
    </Post>
  );
}
