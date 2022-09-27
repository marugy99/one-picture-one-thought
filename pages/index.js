import Head from "next/head";
import client from "../client";

const Home = ({ data }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>One Picture, One Thought</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">One Picture, One Thought</h1>
        {data.map((elem, index) => (
          // Make this a button that opens a modal when clicked
          <img key={index} src={elem.photo.asset.url} alt={elem.photo.alt} />
        ))}
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(`
    *[ _type == "photo" ] | order(_createdAt desc) {
        title,
        thought,
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
