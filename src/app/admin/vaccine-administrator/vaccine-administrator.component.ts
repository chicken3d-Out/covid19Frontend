import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { VaccineAdmin } from 'src/app/covid19Interface';
import { VaccineAdminServiceService } from './vaccine-administrator.service';

@Component({
  selector: 'app-vaccine-administrator',
  templateUrl: './vaccine-administrator.component.html',
  styleUrls: ['./vaccine-administrator.component.css']
})
export class VaccineAdministratorComponent implements OnInit {

  constructor(private vaccineadminService: VaccineAdminServiceService,
              private router: Router) { }
  //get all vaccineadmin Data
  vaccineadmin: VaccineAdmin[] = [];

  //Pass data to data Source
  dataSource!: MatTableDataSource<any>;
  //Pagination
  @ViewChild('paginator') paginator!: MatPaginator;
  //Sort
  @ViewChild(MatSort) sort!: MatSort;

  //Data column to display
  columnsToDisplay = ['id', 'healthfacility', 'vaccinator', 'address', 'action'];
  //clear input value from the search
  value = '';

  //Get all data from the service by subscribing to it
  getAllVaccineAdmin(): void{
    this.vaccineadminService.getAllVaccineAdminInfo().subscribe( 
      data => { 
        this.vaccineadmin = data;   
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
          this.vaccineadminService.deleteSelectedVaccineAdmin(id).subscribe( result => {
            this.getAllVaccineAdmin();
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
    this.getAllVaccineAdmin();
  }

}
