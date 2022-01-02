import { Component, OnInit } from '@angular/core';
import { Category, Recipient} from 'src/app/covid19Interface';
import { VaccineRecipientService } from '../vaccine-recipient.service';
import { Gender } from 'src/app/covid19Interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vaccine-recipient',
  templateUrl: './add-vaccine-recipient.component.html',
  styleUrls: ['./add-vaccine-recipient.component.css']
})
export class AddVaccineRecipientComponent implements OnInit {
  
  constructor( private vaccinerecipientService: VaccineRecipientService, private router: Router) { }
  panelOpenState = false;
  //selectedCatgory
  selected: any;
  selectedGender:any;

  //Email Error Notification
  duplicateEmail = false;

  //placeholder for CustomID
  customID:any;

  category: Category[] = [
    {category: 'A'},
    {category: 'B'},
    {category: 'C'},
    {category: 'D'},
    {category: 'E'}
  ];

  gender :Gender[] = [
    {gender: 'M'},
    {gender: 'F'}
  ]

//Create new record of vaccine recipient
  onSubmit(data:any){

    const firstname = data.value.firstname;
    const middlename = data.value.middlename;
    const lastname = data.value.lastname;
    const category = this.selected;

    const mobileNum = data.value.number;
    const email = data.value.email;
    const address = data.value.address;
    const birthday = data.value.birthday;
    const gender = this.selectedGender;

    const newRecipientData = {
      id: null,
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      category: category,
      contactnum: mobileNum,
      email: email,
      address: address,
      birthday: birthday,
      gender: gender
    };
    //Check Duplicate Email
    this.vaccinerecipientService.getAllRecipient().subscribe( results => {
      const checkEmail = results.find((auth: any) => {
        return auth.email === email;
      })
      if (checkEmail){
        this.duplicateEmail = true;
      }
      else {
        this.duplicateEmail = false;

        //Create a new record
        this.vaccinerecipientService.createNewRecipient(newRecipientData as Recipient).subscribe( data => { 
          const ID = data.customid;  
            Swal.fire({
              title: `Success! Your ID: ${ID}`,
              text: 'Go Back To Dashboard?',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Dashboard'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['dashboard/recipient']); 
              }
            })
        })
      }
    })
  }
  ngOnInit(): void {
    

  }

}
