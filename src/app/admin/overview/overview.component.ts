import { Component, OnInit } from '@angular/core';
import { OverviewService } from './overview.service';
import { VaccinatedPerDay, EfficacyRate, FirstDoseCount, 
  SecondDoseCount, AvailableVaccine } from 'src/app/covid19Interface';
import { Chart, registerables } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  vaccinatedperday: VaccinatedPerDay[] = [];
  vaDay:any = []
  vaDate:any = []
  table:any = []

  //Store Data
  firstdosecount: FirstDoseCount[] = [];
  seconddosecount: SecondDoseCount[] = [];
  availablevaccine: AvailableVaccine[] = [];
  //Charts Lower Section
  efficacyrate: EfficacyRate[] = []
  vaccinename: EfficacyRate[] = []

  //Pass data to data Source
  dataSource!: MatTableDataSource<any>;
  dataSourceSecond!: MatTableDataSource<any>;
  //Column in Table
  displayedColumns: string[] = ['day', 'vaccinated'];
  displayedColumnsSecond: string[] = ['day', 'vaccinatedSecond'];

  constructor(private overviewService: OverviewService) { 
    Chart.register(...registerables);
  }
//Get data
  getData(){
    //Charts Lower Section
    this.overviewService.getEfficacyRate().subscribe( data => {
      data.map((er:any) => {
        this.efficacyrate.push(er.efficacyRate);
        
      })
      console.log(this.efficacyrate)
    })
    this.overviewService.getEfficacyRate().subscribe( data => {
       data.map((name:any) => {
        this.vaccinename.push(name.vaccineName);
      })
      console.log(this.vaccinename)
    })

    //Vaccinated per day
    this.overviewService.getVaccinatedPerDay().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.displayChart();
    })
    //Get Seconddose
    this.overviewService.getVaccinatedSeconddose().subscribe( data => {
      this.dataSourceSecond = new MatTableDataSource(data)
    })
    
    this.overviewService.getFirstDoseCount().subscribe( data => {
      this.firstdosecount = data;
    })
    this.overviewService.getSecondDoseCount().subscribe( data => {
      this.seconddosecount = data;
    })
    this.overviewService.getAvailableVaccine().subscribe( data => {
      this.availablevaccine = data;
    })
  }
  displayChart(){
        //Efficacy Rate
        //display chart
        this.table = new Chart("canvas", {
          type: "bar",
          data: {
            labels: this.vaccinename,
            datasets: [{
              backgroundColor: ["#d5cddb", "#C8A4D4","#b0b8db","#E090DF","#A44CD3"],
              data: this.efficacyrate
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: `Vaccine's Efficacy Rate`,
                font : {
                  family: 'Arial',
                  size: 15
                }
              }
            }
          }
        }); 
        
  }
  ngOnInit(): void {
    this.getData() 
    
  }

}
