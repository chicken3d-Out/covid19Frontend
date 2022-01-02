import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { RestApiService } from 'src/app/rest-api.service';
import { Reservation, Message } from 'src/app/covid19Interface';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private reservationService: RestApiService) { }

  //instantiate an object from interface reservation
  reservation:Reservation[] = [];

  //For Displaying If email was sent
  emailVerify = false;
  emailFailed = false;
  alreadySend = false;

  //Pass data to data Source
  dataSource!: MatTableDataSource<any>;
  //Pagination
  @ViewChild('paginator') paginator!: MatPaginator;
  //Sort
  @ViewChild(MatSort) sort!: MatSort;
  
  //Data column to display
  columnsToDisplay = ['id', 'firstname', 'lastname', 'email', 'status', 'send'];
  //clear input value from the search
  value = '';

  //Get all data from the service by subscribing to it
  getAllReservation(): void{
    this.reservationService.getAllReservation().subscribe( 
      data => { 
        this.reservation = data;   
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });     
  }

  //Search by Name
  filterData($event: any){
    this.dataSource.filter = $event.target.value;
  }

  //Call Method for Sending Email
  sendEmail(id: number, firstname: string, lastname: string, email: string){
    //Convert To jSON type
    const reservationData = {
      id: id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      status: 'Sent',
    }
    this.reservationService.getAllReservation().subscribe( data => {
      const sendStat = data.find((stat:any) => {
        return stat.status === 'Sent' && stat.id === id
      })
      if(sendStat){
        this.alreadySend = true;
      }else {
        this.alreadySend = false;

        //Send Email
        this.reservationService.sendEmail(reservationData as Reservation).subscribe( data => {
          if(data.message === 'Success' && data.status === '200'){
            this.emailFailed = false;
            this.emailVerify = true;
    
            this.getAllReservation();

          }else{
            this.emailVerify = false;
            this.emailFailed = true
          }   
        })
      }
     }) 
  }
  ngOnInit(): void {
    this.getAllReservation();
  }
}
