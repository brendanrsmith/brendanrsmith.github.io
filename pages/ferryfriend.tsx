import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { customLoader } from "./index";
import Post from "../components/post";
import utilStyles from "../styles/utils.module.css";

export default function FerryFriend() {
  return (
    <Post title={"FerryFriend 4.0"}>
      <p className={utilStyles.caption}>February 3, 2022</p>
      <section>
        <h2>Introduction</h2>
        <p>
          <a href="https://www.ferryfriend.com/">FerryFriend</a>, currently in version
          3.0, is the premier schedule app for the Washington State Ferries,
          with an average App Store rating of 5.0 and over 1500 reviews.
          However, the app, originally written in Swift, has to this point only been available for
          iOS. As usage grew, many Android users expressed their desire to see
          the app come to that platform.
        </p>
        <p>
          I had the great opportunity to join the FerryFriend team for the
          development of an Android version of the app, originally conceived to
          be a standalone version alongside the existing iOS app (more on that
          later). Based on my previous experience with React Native, we decided
          it would be the best choice of framework to build the new version.
          The goal throughout the project was to emulate the functionality and
          aesthetic of the existing app, which provided a desing schematic to start from.
        </p>
        <Row className="justify-content-center">
          <div style={{ margin: "1rem", maxWidth: "40rem" }}>
            <Image
              loader={customLoader}
              src={"/images/ff/hero-long.png"}
              height={586}
              width={1024}
              alt="FerryFriend 4.0"
            />
          </div>
        </Row>

        <h3>Integrating with the WSF Api</h3>
        <p>Washington State (WSDOT) provides a number of useful APIs for public access to ferry information. These form the backbone of the data used by FerryFriend to show schedules, alerts, fares, and vessel positions. Additionally, FerryFriend has its own public API which provides sailing delays (using its own prediction model), as well as reservation information and ticket lookups.</p>
        <p>One of the challenges of the WSDOT API is that there are inconsistencies and proprietary data formats between the different routes. To handle these inconsistencies, we chose to implement a &quot;Provider&quot; model in order to preprocess all incoming WSF data into a common format used throughout the app. This model consists of 5 different WSF Api providers which retrieve data from the APIs using Axios. The results are stored in a local cache to reduce the total number of network requests, as well as aid in offline data storage. </p>
        <p>A &quot;Data Manager&quot; then consumes these providers, packaging different data sources together for use in individual components, which consume the data via a global context reference. A subscriber model is used to continually check for schedule and delay updates while the app is focused, a particularly important feature for the time-sensitive data they represent. For example, the route schedule screen below consumes data from the WSF schedule provider (scheduled sailing times), WSF Reservation details provider (reservable space availability), WSF terminal info provider (drive-up spaces), and FerryFriend predictions provider (delay predictions).
        </p>
        <Row className="justify-content-center">
          <div style={{ margin: "1rem", maxWidth: "20rem" }}>
            <Image
              loader={customLoader}
              src={"/images/ff/ff-schedule.jpeg"}
              height={1334}
              width={750}
              alt="FerryFriend 4.0"
            />
          </div>
        </Row>
      </section>

      <section>
        <h2>FerryFriend Native becomes FerryFriend 4.0</h2>
        <p>
          As the main functionality of the app began to come together, we
          gradually realized that the increase in maintainability, and ability
          of one code-base to support two separate native versions of the app
          would ultimately make the React Native version of the app a logical choice to
          become the new primary codebase for FerryFriend, necessitating a new
          major version of the iOS app as well. With this in mind, we began to
          implement several completely new features alongside the existing
          features from FerryFriend 3.0.
        </p>

        <h3>Improvements in user interface design</h3>
        <p>
          One of the benefits of having an existing user base was the
          availability of plenty of user feedback on existing designs. Some of
          this feedback led to redesigns of user interaction elements. First up was the tab navigation interface:
        </p>
        <Row className="align-items-start" xs={1} md={2}>
          <Col>
            <div style={{ margin: "1rem" }}>
              <p>Before</p>
              <Image
                loader={customLoader}
                src={"/images/ff/ff-old-menu.png"}
                height={375}
                width={750}
                alt="old menu"
              />
              <p className={utilStyles.caption}>
                The original menu was functional, but dense user controls could
                be confusing and difficult to target.
              </p>
            </div>
          </Col>

          <Col>
            <div style={{ margin: "1rem" }}>
              <p>After</p>
              <Image
                loader={customLoader}
                src={"/images/ff/ff-menu.png"}
                height={375}
                width={750}
                alt="vessel menu"
              />
              <p className={utilStyles.caption}>
                Using space freed up by the tab navigator, we were able to
                redesign the route top bar to increase legibility and simplify
                user interaction.{" "}
              </p>
            </div>
          </Col>

          <Col>
            <div style={{ margin: "1rem" }}>
              <Image
                loader={customLoader}
                src={"/images/ff/ff-tab.png"}
                height={375}
                width={750}
                alt="tab navigator"
              />
              <p className={utilStyles.caption}>
                The tab navigator was moved from the upper margin of the route
                screen to the bottom, improving access with one hand.
              </p>
            </div>
          </Col>
        </Row>

        <p>
          Two of the most popular features on FerryFriend are the ferry line
          screen, and the vessel watch screen. We took care to improve the
          usability of these screens without drastically changing their layout.
        </p>

        <Row className="align-items-start" xs={1} md={2}>
          <Col>
            <div style={{ margin: "1rem" }}>
              <Image
                loader={customLoader}
                src={"/images/ff/ff-camera.png"}
                height={1008}
                width={750}
                alt="camera screen"
              />
              <p className={utilStyles.caption}>
                On the cameras screen, we improved touch targets on the carousel
                viewer and increased the legibility of the map.
              </p>
            </div>
          </Col>

          <Col>
            <div style={{ margin: "1rem" }}>
              <Image
                loader={customLoader}
                src={"/images/ff/ff-vessel.png"}
                height={1008}
                width={750}
                alt="vessel screen"
              />
              <p className={utilStyles.caption}>
                On the vessel view screen, we added additional vessel details to
                the vessel modal, with important details like vehicle and
                passenger capacity.
              </p>
            </div>
          </Col>
        </Row>

        <h4>Dark mode</h4>
        <p>
          In response to another user request, we spent a good amount of time implementing a
          theming engine and thinking carefully about how to implement a dark
          mode well. Users are able to toggle this mode manually, or follow the
          system settings. I am quite happy with how this turned out.
        </p>

        <Row className="justify-content-center">
          <div style={{ margin: "1rem", maxWidth: "22rem" }}>
            <Image
              loader={customLoader}
              src={"/images/ff/ff-dark.jpeg"}
              height={1334}
              width={750}
              alt="dark mode"
            />
            <p className={utilStyles.caption}>Easy on the eyes</p>
          </div>
        </Row>
      </section>

      <section>
        <h4>Favorites</h4>
        <p>
          Favorite routes are a key feature for regular ferry users, and we
          wanted to find a way to show schedule prediction info for favorite
          routes directly on the home screen. Using the colors from route predictions to indicate severity of delay, we added badges to the existing favorite route component for a simple but effective
          solution.
        </p>

        <Row className="justify-content-center">
          <div style={{ margin: "1rem", maxWidth: "40rem" }}>
            <Image
              loader={customLoader}
              src={"/images/ff/ff-favorites.png"}
              height={750}
              width={750}
              alt="favorites badge"
            />
            <p className={utilStyles.caption}></p>
          </div>
        </Row>
      </section>

      <section>
        <h4>Tickets</h4>
        <p>
          Next up was a major redesign of the saved ticket display. This feature
          allows regular ferry riders to scan a Washington State Ferry ticket
          with the app, which then checks the WSF ticket API for remaining uses
          and expiry dates. The user can then show a representation of the
          physical ticket barcode at the ticketing booth, negating the need to
          carry a physical copy of every ticket they may own.
        </p>

        <Row className="justify-content-center" xs={1} md={2}>
          <Col>
            <div style={{ margin: "1rem", maxWidth: "22rem" }}>
              <Image
                loader={customLoader}
                src={"/images/ff/ff-old-ticket.jpeg"}
                height={1334}
                width={750}
                alt="old ticket menu"
              />
              <p className={utilStyles.caption}>
                The FerryFriend 3.0 ticket screen. Although functional, there
                was lots of room for improvement here.
              </p>
            </div>
          </Col>
          <Col>
            <div style={{ margin: "1rem", maxWidth: "22rem" }}>
              <Image
                loader={customLoader}
                src={"/images/ff/ff-ticket.jpeg"}
                height={1334}
                width={750}
                alt="new ticket screen"
              />
              <p className={utilStyles.caption}>
                The new ticket screen shows all relevant information in one
                place, and emulates the look of a physical WSF ticket.
              </p>
            </div>
          </Col>
        </Row>

        <p>
          This stored digital ticket offers an opportunity to easily share
          tickets between users. With an implementation on Ferryfriend.com, we
          were able to use the link query string parameters to render a web
          based visualization of the same ticket, allowing anyone to utilize a
          shared FerryFriend ticket, even if they don&apos;t have the app
          installed on their phone.{" "}
          <a target={"_blank"} href="https://www.ferryfriend.com/share_ticket/?barcode=5761680130777154343691&type=An-FH%20Adult%20Passenger&expiryDate=February%207%2C%202020&remainingUses=0&lastLookup=2022-02-03T02%3A10%3A31.435Z&plu=761531221AWOPT&description=An-FH%20Adult%20Passenger&price=%2414.00&status=Invalid&itemName=Adult%20Psgr%20%28T%29&name=My%20ticket%20" rel="noreferrer">
            See for yourself here
          </a>
          .
        </p>
        <Row className="justify-content-center">
          <div style={{ margin: "1rem", maxWidth: "40rem" }}>
            <Image
              loader={customLoader}
              src={"/images/ff/ff-web-tix.png"}
              height={1974}
              width={1376}
              alt="web ticket screen"
            />
            <p className={utilStyles.caption}>
              A web-based display of tickets allows ticket sharing to users who
              do not have the app installed.
            </p>
          </div>
        </Row>
      </section>

      <section>
        <h2>Testing</h2>
        <p>
          As of this writing, FerryFriend 4.0 for Android is in public beta (
          <a href="https://play.google.com/store/apps/details?id=com.truecourse.FerryFriend">
            see it on the Play Store
          </a>
          ). An iOS beta is coming soon! In the meantime,{" "}
          <a href="https://www.ferryfriend.com/">
            Check out the FerryFriend website.{" "}
          </a>
        </p>
        <p>
          This was a project of “firsts” for me: my first time working on a
          full-scale application, and my first project with a “real” user base.
          I am hugely grateful for the team at FerryFriend and the many hours of
          mentorship they provided over the course of this project, as well as
          their encouragement to take on new features and domains outside of my
          comfort zone. I am proud of what I helped make, and am looking forward
          to seeing what happens with the app in the future!
        </p>
      </section>
    </Post>
  );
}
