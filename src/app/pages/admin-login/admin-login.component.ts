import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/rest-api.service';
import { Router } from '@angular/router';
import { SigninData } from 'src/app/signin';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  //initialization
  credentials!:boolean;
  hide = true;

  constructor(private restapiService: RestApiService, private router: Router) { }
  //setCredential status in Servive
  onSubmit(data: any){
    //store value in a container
    const username = data.value.username;
    const password = data.value.password;
     this.credentials = this.restapiService.authenticate({"username":username,"password":password}as SigninData);
  }
  ngOnInit(): void {
    
  }

}
