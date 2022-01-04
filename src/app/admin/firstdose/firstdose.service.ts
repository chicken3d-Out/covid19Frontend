import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FirstDose } from 'src/app/covid19Interface';
import { RecipientID } from 'src/app/covid19Interface';
import { VaccineID } from 'src/app/covid19Interface';
import { VaccineAdminID } from 'src/app/covid19Interface';
import { RestApiService } from 'src/app/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class FirstdoseService {

  constructor(private http: HttpClient, private restApiService: RestApiService) { }
  //Get all list of vaccine
  urlFirstDose = "https://covid19backend.000webhostapp.com/api/firstdose/";

  //GET Method for all Firstdose 
  getAllFirstdoseInfo(): Observable<FirstDose[]> {
    return this.http.get<FirstDose[]>(`${this.urlFirstDose}read.php`);
  }
  //Get Necessary data before performing POST REQUEST
  getRecipientID(): Observable<RecipientID[]> {
    return this.http.get<RecipientID[]>(`${this.urlFirstDose}getrecipientID.php`);
  }
  getVaccineID(): Observable<VaccineID[]> {
    return this.http.get<VaccineID[]>(`${this.urlFirstDose}getvaccineID.php`);
  }
  getvaccineadminID(): Observable<VaccineAdminID[]> {
    return this.http.get<VaccineAdminID[]>(`${this.urlFirstDose}getvaccineadminID.php`)
  }

  //POST Method for Firstdose Firstdose
  createNewFirstdose(firstdose: FirstDose): Observable<FirstDose> {
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.post<FirstDose>(`${this.urlFirstDose}create.php`, firstdose, { headers: httpHeader })
  }

  //PUT Method for Firstdose Firstdose
  //Get Details of recipient for edit
  getFirstdoseDetails(id: number): Observable<FirstDose[]> {
    return this.http.get<FirstDose[]>(`${this.urlFirstDose}selectID.php?id=${id}`)
  }
  //update Firstdose Firstdoses
  updateFirstdose(firstdose: FirstDose): Observable<FirstDose> {
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.put<FirstDose>(`${this.urlFirstDose}update.php`, firstdose, { headers: httpHeader })
  }
  //DELETE Method for Firstdose Firstdose
  deleteSelectedFirstdose(id: number) {
    return this.http.delete(`${this.urlFirstDose}delete.php?id=${id}`);
  }
  url = 'https://covid19backend.000webhostapp.com/api/pdfConvert/';
  admin = this.restApiService.adminName;
  export() {
    return this.http.get(`${this.url}pdfFirstdose.php?admin=${this.admin}`);
  }

}
