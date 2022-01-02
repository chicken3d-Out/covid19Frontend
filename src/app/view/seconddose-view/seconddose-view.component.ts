import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SecondDose } from 'src/app/covid19Interface';
import { SeconddoseService } from 'src/app/admin/seconddose/seconddose.service';

@Component({
  selector: 'app-seconddose-view',
  templateUrl: './seconddose-view.component.html',
  styleUrls: ['./seconddose-view.component.css']
})
export class SeconddoseViewComponent implements OnInit {

  constructor(private seconddoseService: SeconddoseService) { }
  //store all data
  seconddose: SecondDose[] = [];
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

  ngOnInit(): void {
    this.getAllSecondDose();
  }

}
