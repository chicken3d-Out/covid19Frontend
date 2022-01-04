import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VaccineAdmin } from 'src/app/covid19Interface';
@Injectable({
  providedIn: 'root'
})
export class VaccineAdminServiceService {

  constructor(private http: HttpClient) { }
  //Get all list of vaccine
  urlVaccineAdmin = "https://covid19backend.000webhostapp.com/api/vaccineadmin/";

  //GET Method for all vaccine administrator
  getAllVaccineAdminInfo(): Observable<VaccineAdmin[]> {
    return this.http.get<VaccineAdmin[]>(`${this.urlVaccineAdmin}read.php`);
  }

  //POST Method for Vaccine Administrator
  createNewVaccineAdmin(vaccineadmin: VaccineAdmin): Observable<VaccineAdmin> {
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.post<VaccineAdmin>(`${this.urlVaccineAdmin}create.php`, vaccineadmin, { headers: httpHeader })
  }

  //PUT Method for VaccineAdmin VaccineAdmin
  //Get Details of recipient for edit
  getVaccineAdminDetails(id: number): Observable<VaccineAdmin[]> {
    return this.http.get<VaccineAdmin[]>(`${this.urlVaccineAdmin}selectID.php?id=${id}`)
  }
  //update VaccineAdmin VaccineAdmins
  updateVaccineAdmin(vaccineadmin: VaccineAdmin): Observable<VaccineAdmin> {
    //make the data JSON Format
    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'Application/JSON');
    return this.http.put<VaccineAdmin>(`${this.urlVaccineAdmin}update.php`, vaccineadmin, { headers: httpHeader })
  }
  //DELETE Method for VaccineAdmin VaccineAdmin
  deleteSelectedVaccineAdmin(id: number) {
    return this.http.delete(`${this.urlVaccineAdmin}delete.php?id=${id}`);
  }


}
