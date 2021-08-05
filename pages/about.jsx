import Head from "next/head";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  let catGiphys = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=memes&api_key=MBIWS7egmUvQexSSBnZHyvytFdKcsx7l&limit=10"
  );
  catGiphys = await catGiphys.json();
  return { props: { catGiphys: catGiphys } };
}
const About = (props) => {
  const [formInputs, setFormInputs] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("cats");

  useEffect(() => {
    setSearchResults(props.catGiphys.data);
  }, [props]);

  const handleInputs = (event) => {
    let { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const search = async (event) => {
    event.preventDefault();
    let giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MBIWS7egmUvQexSSBnZHyvytFdKcsx7l&limit=10`
    );
    giphys = await giphys.json();
    setSearchResults(giphys.data);
    setSearchTerm(formInputs.searchTerm);
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

      <h1>Search results for: {searchTerm}</h1>
      {searchResults.map((each, index) => {
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
