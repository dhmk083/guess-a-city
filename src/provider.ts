import { random, randomUniq } from "utils";
import { Card } from "types";

const getCitiesFactory = () => {
  let cities: readonly string[] = [];

  return async () => {
    if (cities.length) return cities;

    cities = await fetch("https://restcountries.com/v2/all")
      .then((r) => r.json())
      .then((d) => d.map(({ capital }) => capital).filter(Boolean));

    return cities;
  };
};

const getCityImageFactory = () => {
  return async (city) => {
    const query = new URLSearchParams({
      key: process.env.REACT_APP_PIXABAY_API_KEY!,
      q: city,
      category: "buildings",
    });
    const r = await fetch(`https://pixabay.com/api/?${query}`).then((r) =>
      r.json()
    );

    return r.totalHits ? r.hits[0].webformatURL : null;
  };
};

const getCardFactory = () => {
  const getCities = getCitiesFactory();
  const getCityImage = getCityImageFactory();

  return async () => {
    let cities = await getCities();
    let choices;
    let correct;
    let img;

    while (!img) {
      choices = randomUniq(4, cities).map((city) => ({ id: city, name: city }));
      correct = choices[random(choices.length)].id;
      img = await getCityImage(correct);
      // eslint-disable-next-line no-loop-func
      if (!img) cities = cities.filter((x) => x !== correct);
    }

    return {
      img,
      choices,
      correct,
    } as ReturnType<Card["data"]>;
  };
};

export default getCardFactory;
