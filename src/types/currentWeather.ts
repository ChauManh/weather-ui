export interface CurrentWeather {
  cityName: string;
  weather_description: string;
  cur_timestamp: number;
  icon: string;
  temperature: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  clouds: number;
  uv: number;
  visibility: number;
  wind_speed: number;
  aqi: number;
}
