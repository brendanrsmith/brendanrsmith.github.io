import Image from "next/image";
import Post from "../components/post";
import Section from "../components/section";

export default function Rebu() {
  return (
    <Post title="Rebu Native" date="December 18, 2021">
      <Section>
        <div className="flex justify-center">
          <div className="m-4 max-w-lg">
            <Image
              src={"/images/rebu/rebu-square.png"}
              alt="Rebu home screen"
              width={1000}
              height={1000}
              className="rounded"
            />
          </div>
        </div>
        <p>
          Rebu is a React Native app built during a 4-day team sprint, with the
          goal of providing the basic functionality of a ride-sharing app:
          Riders can request pickup at a location, set a destination and be
          notified of pickup and dropoff; Drivers can select a new ride, see the
          pickup location, and notify passengers of pickup and drop-off events.
        </p>

        <div className="m-4">
          <Image
            src={"/images/rebu/rebu-db.png"}
            height={1112}
            width={2734}
            className="rounded"
            alt="Rebu uml"
          />
        </div>

        <p>
          The backend of Rebu consists of an Express server deployed to Heroku,
          using a MongoDB deployed to Atlas to manage data storage.
        </p>

        <div className="m-4">
          <Image
            src={"/images/rebu/rebu-wireframe.png"}
            height={1642}
            width={1868}
            alt="Rebu wireframe"
          />
          <p className="text-sm">
            Wireframe mockups were completed before development began.
          </p>
        </div>

        <p>
          Before any code was written, we agreed on a wireframe for the entire
          app. This allowed us to scope our goals early, and ultimately made the
          developmet process much simpler by providing a road map for every
          screen on the frontend.
        </p>

        <p>
          The frontend was constructed with React Native, and deployed to Expo.
          This allowed us to iterate rapidly, and use our familiarity with react
          frontends to explore a new format for application delivery. I was
          pleasantly surprised at how familiar React Native felt, and how
          quickly it allowed us to write a functional mobile application - I
          will definitely look to use this platform for future projects!
        </p>
        <a href="https://github.com/CeylinBrooks/RebuNative">Github Repo</a>
      </Section>
    </Post>
  );
}
