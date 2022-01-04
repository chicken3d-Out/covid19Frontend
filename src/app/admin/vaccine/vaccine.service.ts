import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaccine } from 'src/app/covid19Interface';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private http: HttpClient) { }
  //Get all list of vaccine
  urlVaccine = "https://covid19backend.000webhostapp.com/api/vaccine/";

  //GET Method for all vaccine 
  getAllVaccineInfo(): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(`${this.urlVaccine}read.php`);
  }

  //POST Method for Vaccine Vaccine
  createNewVaccine(vaccine: Vaccine): Observable<Vaccine> {
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.post<Vaccine>(`${this.urlVaccine}create.php`, vaccine, { headers: httpHeader })
  }

  //PUT Method for Vaccine Vaccine
  //Get Details of recipient for edit
  getVaccineDetails(id: number): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(`${this.urlVaccine}selectID.php?id=${id}`)
  }
  //update vaccine Vaccines
  updateVaccine(vaccine: Vaccine): Observable<Vaccine> {
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.put<Vaccine>(`${this.urlVaccine}update.php`, vaccine, { headers: httpHeader })
  }
  //DELETE Method for Vaccine Vaccine
  deleteSelectedVaccine(id: number) {
    return this.http.delete(`${this.urlVaccine}delete.php?id=${id}`);
  }

}
