import { Component, OnInit, ViewChild } from '@angular/core';
import { VaccineRecipientService } from './vaccine-recipient.service';
import { MatTableDataSource } from '@angular/material/table';
import { RecipientAge } from 'src/app/covid19Interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vaccine-recipient',
  templateUrl: './vaccine-recipient.component.html',
  styleUrls: ['./vaccine-recipient.component.css']
})
export class VaccineRecipientComponent implements OnInit {
  //instantiate an object from interface vaccine recipient
  recipient:RecipientAge[] = [];

  /*firstName: any;*/
  //Pass data to data Source
  dataSource!: MatTableDataSource<any>;
  //Pagination
  @ViewChild('paginator') paginator!: MatPaginator;
  //Sort
  @ViewChild(MatSort) sort!: MatSort;
  
  
  //Data column to display
  columnsToDisplay = ['id', 'firstname', 'middlename', 'lastname', 'category', 'contactnum', 'email', 'address', 'age', 'gender', 'action'];
  //clear input value from the search
  value = '';

  constructor(private vaccinerecipientService: VaccineRecipientService, private route: Router) {  }
  //Get all data from the service by subscribing to it
  getAllVaccineRecipient(): void{

    this.vaccinerecipientService.getAllWithAge().subscribe( 
      data => { 
        this.recipient = data;   
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });     
  }

  //Search by Name
  filterData($event: any){
    this.dataSource.filter = $event.target.value;
  }

  //Delete Recipient 
  deleteConfirm(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to delete this record?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          //Delete the record if confirmed YES
          this.vaccinerecipientService.deleteSelectedRecipient(id).subscribe( result => {
            this.getAllVaccineRecipient();
          });
        } else if (
          /* IF Dismiss Close Modal */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.close();
        }
      })
  }

  ngOnInit(): void {
    this.getAllVaccineRecipient();
    
  }

}


 