export interface City {
  name: string
  lat: number
  lon: number
}

export interface CurrentWeatherData {
  temperature: number
  humidity: number
  weatherCode: number
  windSpeed: number
}

export interface DailyForecast {
  date: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
}

export interface WeatherResponse {
  current: CurrentWeatherData
  daily: DailyForecast[]
}

export interface WeatherCodeInfo {
  label: string
  icon: string
}
