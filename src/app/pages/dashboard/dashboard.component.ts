import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private restapiService: RestApiService) { }
  //Get admin Name
  adminName = this.restapiService.adminName;
  currentNav: String = 'Overview'
  
  logout(){
    this.restapiService.logout();
  }

  currentNavigation(nav: String){
    this.currentNav = nav
  }
  
  ngOnInit(): void {
  }

}
