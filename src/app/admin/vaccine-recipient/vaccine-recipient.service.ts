import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipientAge, Recipient } from 'src/app/covid19Interface';

@Injectable({
  providedIn: 'root'
})
export class VaccineRecipientService {

  constructor(private http: HttpClient) { }
  //Get all list of vaccine recipient
  urlRecipient = "/api/recipient/";

  //GET Method for all vaccine recipient
  getAllRecipient(): Observable<Recipient[]>{
    return this.http.get<Recipient[]>(`${this.urlRecipient}read.php`);
  }
  //getAge
  getAllWithAge(): Observable<RecipientAge[]>{
    return this.http.get<RecipientAge[]>(`${this.urlRecipient}readAge.php`);
  }
  //POST Method for Vaccine Recipient
  createNewRecipient(recipient: Recipient):Observable<Recipient>{
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.post<Recipient>(`${this.urlRecipient}create.php`,recipient, { headers: httpHeader })
  }

  //PUT Method for Vaccine Recipient
    //Get Details of recipient for edit
    getRecipientDetails(id: number): Observable<Recipient[]>{
      return this.http.get<Recipient[]>(`${this.urlRecipient}selectID.php?id=${id}`)
    }
    //update vaccine recipients
    updateVaccineRecipients(recipient: Recipient):Observable<Recipient>{
      //make the data JSON Format
      const httpHeader = new HttpHeaders();
      httpHeader.append('Content-Type', 'Application/JSON');
      return this.http.put<Recipient>(`${this.urlRecipient}update.php`, recipient, { headers: httpHeader } )
    }
  //DELETE Method for Vaccine Recipient
  deleteSelectedRecipient(id: number) {
    return this.http.delete(`${this.urlRecipient}delete.php?id=${id}`);
  }
}
