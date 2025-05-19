// import type { City } from './city';
// import type { WeatherCondition } from './weatherCondition';

export interface CurrentWeather {
  // current_weather_id: number;
  // city_id: number;
  // weather_condition_id: number;
  cur_timestamp: number;
  // icon: string;
  temperature: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  clouds: number;
  uv: number;
  visibility: number;
  wind_speed: number;
  aqi: number;

  // quan hệ join
  // city: City;
  // weatherCondition: WeatherCondition;
}
