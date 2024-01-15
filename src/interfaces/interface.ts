interface ModifyRequest {
  message: string;
}

// ---------- ABOUT INTERFACES ----------
export interface AboutUs {
  _id: string;
  title: string;
  content: string;
}

export interface AboutUsPUT extends ModifyRequest {
  about: AboutUs;
}

// ---------- SERVICES INTERFACES ----------
export interface ServicesImage extends AboutUs {
  image: string;
}

// ---------- REVIEWS INTERFACES ----------
export interface Review {
  _id: string;
  author: string;
  content: string;
}

export interface ReviewPOST extends ModifyRequest {
  review: Review;
}

export interface ReviewDELETE extends ModifyRequest {
  slettet: boolean;
}

// ---------- OPENWEATHER INTERFACES -----------
export interface OpenWeather {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface OpenWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: [OpenWeather];
  city: OpenWeatherCity;
}

export interface OpenWeatherCity {
  id: number;
  name: string;
  coord: OpenWeatherCoords;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface OpenWeatherCoords {
  lat: number;
  lon: number;
}

// ---------- NEWSAPI ---------
export interface NewsAPI {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: [NewsAPI];
}

// ----------- ELSPOT ----------
export interface Elspot {
  HourUTC: string;
  HourDK: string;
  PriceArea: string;
  SpotPriceDKK: number;
  SpotPriceEUR: number;
}

export interface ElspotResponse {
  total: number;
  filters: string;
  sort: string;
  dataset: string;
  records: [Elspot];
}
