import Head from "next/head";
import client from "../client";
import Picture from "../components/Picture";

const Home = ({ data }) => {
  const dates = data.map((elem) =>
    new Date(elem.date).toISOString().substring(0, 10)
  );

  const uniqueDates = dates.filter(
    (date, index) => dates.indexOf(date) === index
  );

  const sortedDates = uniqueDates.sort(
    (date1, date2) => new Date(date2) - new Date(date1)
  );

  function currentStreak() {
    let count = 0;
    let consecutiveDates = [];

    const today = new Date();

    sortedDates.reverse().forEach((el, i) => {
      if (
        new Date(el).setUTCHours(0, 0, 0, 0) -
          new Date("2022-09-27").setUTCHours(0, 0, 0, 0) ===
        i * 86400000
      ) {
        count++;
        consecutiveDates.push(el);
        // Sort in ascending order
        consecutiveDates.sort(
          (date1, date2) => new Date(date1) - new Date(date2)
        );
      }
    });
    return { today, count, consecutiveDates };
  }

  const { today, count, consecutiveDates } = currentStreak();

  const earliestStreakDate = new Date(consecutiveDates[0]).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="bg-stone-100">
      <Head>
        <title>One Picture, One Thought</title>
        <meta name="description" content="Visual Journal made by Maru." />
        <meta property="og:title" content="One Picture, One Thought" />
        <meta
          property="og:description"
          content="Visual Journal made by Maru."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌌</text></svg>"
        />
      </Head>

      <main className="grid lg:grid-cols-[30%,1fr] gap-4 xl:container mx-auto">
        <header className="p-6 lg:h-screen flex flex-col justify-end lg:sticky top-0">
          <h1 className="text-3xl font-italic text-stone-600">
            One Picture, One Thought
          </h1>
          <ul className="font-light text-stone-500 text-sm space-y-1">
            <li className="mt-1">Visual journal.</li>
            <li>
              Current streak is {count} {count === 1 ? "day" : "days"}
              {count !== 0 ? <>, from {earliestStreakDate}.</> : "."}
            </li>
            <li>
              ©{" "}
              <a
                className="hover:underline"
                href="//marucodes.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Maru Lucena
              </a>{" "}
              {today.getFullYear()}.
            </li>
          </ul>
        </header>
        <div className="sm:columns-2 gap-3 space-y-3">
          {data.map((elem, index) => (
            // TODO: refactor the way I'm passing props
            <Picture
              key={index}
              picture={elem.photo}
              title={elem.title}
              thought={elem.thought}
              slug={elem.slug.current}
              date={new Date(elem.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(`
    *[ _type == "photo" ] | order(_createdAt desc) {
        title,
        date,
        thought,
        slug,
        photo{
          asset->{
              _id,
              url
          },
          alt
      }
    }
  `);

  return {
    props: {
      data,
    },
  };
}

export default Home;
