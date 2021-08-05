import Head from "next/head";
import { useEffect } from "react";

export async function getStaticProps() {
  let catGiphys = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=memes&api_key=MBIWS7egmUvQexSSBnZHyvytFdKcsx7l&limit=10"
  );
  catGiphys = await catGiphys.json();
  return { props: { catGiphys: catGiphys } };
}
const About = (props) => {
  useEffect(() => {
    console.log("props", props);
  });

  const handleInputs = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
  };

  const search = (event) => {
    event.preventDefault();
    console.log(formInputs.searchTerm);
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>Giphy Search App</h1>

      <form onSubmit={search}>
        <input name="searchTerm" type="text" onChange={handleInputs} required />
        <button>Search</button>
      </form>

      {props.catGiphys.data.map((each, index) => {
        return (
          <div key={each.id} className="giphy-search-results-grid">
            <h3>{each.title}</h3>
            <img src={each.images.original.url} alt={each.title} />
          </div>
        );
      })}
    </div>
  );
};

export default About;
