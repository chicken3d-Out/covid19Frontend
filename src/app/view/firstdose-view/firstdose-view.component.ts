import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FirstDose } from 'src/app/covid19Interface';
import { FirstdoseService } from 'src/app/admin/firstdose/firstdose.service';

@Component({
  selector: 'app-firstdose-view',
  templateUrl: './firstdose-view.component.html',
  styleUrls: ['./firstdose-view.component.css']
})
export class FirstdoseViewComponent implements OnInit {

  constructor(private firstdoseService: FirstdoseService) { }
  //store all data
  firstdose: FirstDose[] = [];
  //Pass data to data Source
  dataSource!: MatTableDataSource<any>;
  //Pagination
  @ViewChild('paginator') paginator!: MatPaginator;
  //Sort
  @ViewChild(MatSort) sort!: MatSort;
  
  //Data column to display
  columnsToDisplay = ['customid', 'firstname', 'lastname', 'category', 'gender', 'vaccinename', 'healthfacility', 'date'];
  //clear input value from the search
  value = '';

  getAllFirstdose(): void{
    this.firstdoseService.getAllFirstdoseInfo().subscribe( 
      data => { 
        this.firstdose = data; 
        console.log(this.firstdose)

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });     
  }

  //Search by Name
  filterData($event: any){
    this.dataSource.filter = $event.target.value;
  }


  ngOnInit(): void {
    this.getAllFirstdose();
  }

}
