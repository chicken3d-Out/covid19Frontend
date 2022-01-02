import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RestApiService } from 'src/app/rest-api.service';
import { Reservation } from 'src/app/covid19Interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.css']
})
export class ReservationViewComponent implements OnInit {
  duplicateEmail = false;

  AddReservations!: FormGroup;

  constructor(private fb: FormBuilder, private restapiService: RestApiService, private route: Router) { }

  //Form Validation
  formValidation(){
    this.AddReservations = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })  
  }
  get getControl(){
    return this.AddReservations.controls;
  }
  resetForm(){
    this.AddReservations.reset();
  }
  
  onSubmit(data: any){
    const firstname = data.value.firstname;
    const lastname = data.value.lastname;
    const email = data.value.email;
    //Convert to json
    const reservationData = {
      id: null,
      firstname: firstname,
      lastname: lastname,
      email: email,
      status: 'Pending'
    }
    this.restapiService.getAllReservation().subscribe( data => {
      const emailDuplicate = data.find((data: any) => {
        return data.email === email
      })
      if(emailDuplicate){
        this.duplicateEmail = true;
      }else {
        this.duplicateEmail = false

        this.restapiService.addReservation(reservationData as Reservation).subscribe( data => {
          console.log(data)
          this.resetForm();
    
          //Success Modal
          Swal.fire({
            title: 'Record Successfully Created!',
            text: "Go back to add reservations?",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Done!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigate(['dashboard-view/reservation-view']); 
            }
          })
    
        })
      }
    }) 

  }
  ngOnInit(): void {
    this.formValidation();
  }

}
