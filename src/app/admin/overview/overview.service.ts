import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  VaccinatedPerDay, EfficacyRate,
  FirstDoseCount, SecondDoseCount, VaccinatedSeconddose,
  AvailableVaccine
} from 'src/app/covid19Interface';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(private http: HttpClient) { }

  urlCharts = "https://covid19backend.000webhostapp.com/api/overview/";

  //Get Vaccinated Per Day
  getVaccinatedPerDay(): Observable<VaccinatedPerDay[]> {
    return this.http.get<VaccinatedPerDay[]>(`${this.urlCharts}vaccinatedPerDay.php`);
  }
  //Get Vaccinated Sconddose
  getVaccinatedSeconddose(): Observable<VaccinatedSeconddose[]> {
    return this.http.get<VaccinatedSeconddose[]>(`${this.urlCharts}vaccinatedSeconddose.php`);
  }

  //Get Firstdose Count
  getFirstDoseCount(): Observable<FirstDoseCount[]> {
    return this.http.get<FirstDoseCount[]>(`${this.urlCharts}countFirstdose.php`);
  }
  //Get Seconddose Count
  getSecondDoseCount(): Observable<SecondDoseCount[]> {
    return this.http.get<SecondDoseCount[]>(`${this.urlCharts}countSeconddose.php`);
  }
  //Get Available Vaccine Count
  getAvailableVaccine(): Observable<AvailableVaccine[]> {
    return this.http.get<AvailableVaccine[]>(`${this.urlCharts}countVaccine.php`);
  }
  //Get Efficacy Rate
  getEfficacyRate(): Observable<EfficacyRate[]> {
    return this.http.get<EfficacyRate[]>(`${this.urlCharts}efficacyRate.php`);
  }
}
