import qs from "qs";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});

const getStrapiData = async (path: string) => {
  const baseUrl = "http://localhost:1337";

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  console.log(url.href)

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");
  const { title, description } = strapiData.data.attributes;
  return (
    <main className="containter mx-auto py-6">
      <h1>{title}</h1>
      <p>{description}</p>
    </main>
  );
}
