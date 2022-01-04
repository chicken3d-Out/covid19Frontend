import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecondDose } from 'src/app/covid19Interface';
import { RecipientID } from 'src/app/covid19Interface';
import { VaccineID } from 'src/app/covid19Interface';
import { VaccineAdminID } from 'src/app/covid19Interface';
import { RestApiService } from 'src/app/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class SeconddoseService {

  constructor(private http: HttpClient, private restApiService: RestApiService) { }
  //Get all list of vaccine
  urlSecondDose = "https://covid19backend.000webhostapp.com/api/seconddose/";

  //GET Method for all Firstdose 
  getAllSecondDoseInfo(): Observable<SecondDose[]> {
    return this.http.get<SecondDose[]>(`${this.urlSecondDose}read.php`);
  }
  //Get Necessary data before performing POST REQUEST
  getRecipientID(): Observable<RecipientID[]> {
    return this.http.get<RecipientID[]>(`${this.urlSecondDose}getrecipientID.php`);
  }
  getVaccineID(): Observable<VaccineID[]> {
    return this.http.get<VaccineID[]>(`${this.urlSecondDose}getvaccineID.php`);
  }
  getvaccineadminID(): Observable<VaccineAdminID[]> {
    return this.http.get<VaccineAdminID[]>(`${this.urlSecondDose}getvaccineadminID.php`)
  }

  //POST Method for SecondDose SecondDose
  createNewSecondDose(seconddose: SecondDose): Observable<SecondDose> {
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.post<SecondDose>(`${this.urlSecondDose}create.php`, seconddose, { headers: httpHeader })
  }

  //PUT Method for SecondDose SecondDose
  //Get Details of recipient for edit
  getSecondDoseDetails(id: number): Observable<SecondDose[]> {
    return this.http.get<SecondDose[]>(`${this.urlSecondDose}selectID.php?id=${id}`)
  }
  //update SecondDose SecondDoses
  updateSecondDose(seconddose: SecondDose): Observable<SecondDose> {
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.put<SecondDose>(`${this.urlSecondDose}update.php`, seconddose, { headers: httpHeader })
  }
  //DELETE Method for SecondDose SecondDose
  deleteSelectedSecondDose(id: number) {
    return this.http.delete(`${this.urlSecondDose}delete.php?id=${id}`);
  }

  url = 'https://covid19backend.000webhostapp.com/api/pdfConvert/';
  admin = this.restApiService.adminName;
  export() {
    return this.http.get(`${this.url}pdfSeconddose.php?admin=${this.admin}`);
  }

}
