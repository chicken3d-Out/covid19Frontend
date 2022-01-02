import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { philippineStatistics } from 'src/app/covid19Interface';
import { philippineVaccinated } from 'src/app/covid19Interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  covidAPIURL = "https://disease.sh/v3/covid-19/";
  getAllPhilippineStat(): Observable<philippineStatistics[]>{
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');

    return this.http.get<philippineStatistics[]>(`${this.covidAPIURL}countries/Indonesia, Philippines, Vietnam, Thailand, Myanmar, Malaysia, Cambodia, Laos, Singapore, Timor-Leste, Brunei`,{ headers: httpHeader });
  }
  getAllPhilippineVaccinated(): Observable<philippineVaccinated>{
    return this.http.get<philippineVaccinated>(`${this.covidAPIURL}vaccine/coverage/countries/Philippines?lastdays=1`);
  }
}
