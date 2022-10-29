import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  
  private apiKey: string = 'xxxxx';

  constructor(private httpClient: HttpClient) {}

  getWeatherInformation(city: string) {
    const baseUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    return this.httpClient.get<any>(baseUrl);
  }
}
