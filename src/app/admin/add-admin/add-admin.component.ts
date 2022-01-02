import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RestApiService } from 'src/app/rest-api.service';
import { AddAdmin } from 'src/app/signin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(private resapiService: RestApiService, private route: Router) { }

  //Email Error Notification
  duplicateUsername = false;

  //Password input
  hide= true;

  //Create new record of vaccine
  onSubmit(data:any){

    const firstname = data.value.firstname;
    const lastname = data.value.lastname;
    const username = data.value.username;
    const password = data.value.password;

    const newAdminData = {
      id: null,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      date: null
    };

    //Check Duplicate Admin Name
    this.resapiService.getAllAdmin().subscribe( results => {
      const checkUsername = results.find((auth: any) => {
        return auth.username === username;
      })
      if (checkUsername){
        this.duplicateUsername = true;
      }
      else {
        this.duplicateUsername = false;

        //Create a new record
        this.resapiService.addAdmin(newAdminData as AddAdmin).subscribe( data => {
          console.log(data);
          //Modal Success
          Swal.fire({
            title: 'Record Successfully Created!',
            text: "Go back to overview?",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Dashboard'
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigate(['dashboard/overview']); 
            }
          })
        })
      }
    })
    
  }

  ngOnInit(): void {
  }

}
