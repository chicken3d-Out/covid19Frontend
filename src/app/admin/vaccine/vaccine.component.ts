import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Vaccine } from 'src/app/covid19Interface';
import { VaccineService } from './vaccine.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {
  //instantiate an object from interface vaccine
  vaccine:Vaccine[] = [];

  //Pass data to data Source
  dataSource!: MatTableDataSource<any>;
  //Pagination
  @ViewChild('paginator') paginator!: MatPaginator;
  //Sort
  @ViewChild(MatSort) sort!: MatSort;
  
  //Data column to display
  columnsToDisplay = ['id', 'vaccinename', 'stock', 'manufacturer', 'efficacyrate','usedVaccine', 'action'];
  //clear input value from the search
  value = '';

  constructor(private vacineService: VaccineService, private route: Router) { }
  //Get all data from the service by subscribing to it
  getAllVaccine(): void{
    this.vacineService.getAllVaccineInfo().subscribe( 
      data => { 
        this.vaccine = data;   
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
          this.vacineService.deleteSelectedVaccine(id).subscribe( result => {
            this.getAllVaccine();
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
    this.getAllVaccine();
  }

}
