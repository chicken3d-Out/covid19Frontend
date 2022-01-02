import { formatDate } from '@angular/common';
import { Component, OnInit,Inject,LOCALE_ID } from '@angular/core';
import { philippineStatistics } from 'src/app/covid19Interface';
import { philippineVaccinated } from 'src/app/covid19Interface';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  timeline: any
  yesterday = new Date(new Date().setDate(new Date().getDate()-1));

  datevaccinated = formatDate(this.yesterday, 'MM/dd/yy', this.locale)

  //Initialize to get data
  philippineStatistic: philippineStatistics[] = [];
  philippineVaccinated: philippineVaccinated[] = []

  constructor(private statisticService: StatisticsService, @Inject(LOCALE_ID) public locale: string) { }

  getAlldata(){
    this.statisticService.getAllPhilippineStat().subscribe( data => {
      this.philippineStatistic = data
    })
    this.statisticService.getAllPhilippineVaccinated().subscribe( data => {
      this.timeline = data.timeline
    })
    console.log(this.timeline)

  }
  ngOnInit(): void {
    this.getAlldata();
  }

}
