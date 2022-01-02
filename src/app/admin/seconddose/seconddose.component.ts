import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { SecondDose } from 'src/app/covid19Interface';
import { SeconddoseService } from './seconddose.service';
import { RestApiService } from 'src/app/rest-api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-seconddose',
  templateUrl: './seconddose.component.html',
  styleUrls: ['./seconddose.component.css']
})
export class SeconddoseComponent implements OnInit {

  constructor(private seconddoseService: SeconddoseService, 
              private router: Router,
              private restapiService: RestApiService) { }

  //store all data
  seconddose: SecondDose[] = [];
  //Pass data to data Source
  dataSource!: MatTableDataSource<any>;
  //Pagination
  @ViewChild('paginator') paginator!: MatPaginator;
  //Sort
  @ViewChild(MatSort) sort!: MatSort;

  //Get Admin Name For Export PDF Reference
  admin = this.restapiService.adminName;
  //URL for export
  url = `../../../../api/pdfConvert/pdfSeconddose.php?admin=${this.admin}`;
  
  //Data column to display
  columnsToDisplay = ['customid', 'firstname', 'lastname', 'category', 'gender', 'vaccinename', 'healthfacility', 'date', 'action'];
  //clear input value from the search
  value = '';

  getAllSecondDose(): void{
    this.seconddoseService.getAllSecondDoseInfo().subscribe( 
      data => { 
        this.seconddose = data;   
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
          this.seconddoseService.deleteSelectedSecondDose(id).subscribe( result => {
            this.getAllSecondDose();
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
    this.getAllSecondDose();
  }

}
