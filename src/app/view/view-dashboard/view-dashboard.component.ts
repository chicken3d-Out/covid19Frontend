import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.css']
})
export class ViewDashboardComponent implements OnInit {
  currentNav: String = 'Overview'
  constructor() { }


  currentNavigation(nav: String){
    this.currentNav = nav
  }
  ngOnInit(): void {
  }

}
