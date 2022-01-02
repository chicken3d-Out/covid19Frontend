import { Component, OnInit } from '@angular/core';
import { Recipient } from 'src/app/covid19Interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccineRecipientService } from '../vaccine-recipient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vaccine-recipient',
  templateUrl: './edit-vaccine-recipient.component.html',
  styleUrls: ['./edit-vaccine-recipient.component.css']
})
export class EditVaccineRecipientComponent implements OnInit {

  //holds all the data of the selected recipient
  recipient: Recipient[] = [];
  //Display error on email if become true
  duplicateEmail = false;
  //Category 
  category = [
    {category: "A"},
    {category: "B"},
    {category: "C"},
    {category: "D"},
    {category: "E"},
    {category: "F"},
  ]
  //GENDER 
  gender = [
    {gender: "M"},
    {gender: "F"}
  ]
  constructor(private vaccinerecipientService: VaccineRecipientService, 
              private activeRoute: ActivatedRoute,
              private route: Router) { }

  //Get Details of the recipient to be edited
  getRecipient():void {
    //get the id in the active route
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    //Subscribe to get details by the current id
    this.vaccinerecipientService.getRecipientDetails(id).subscribe(data => {
      this.recipient = data
    })
  }
  //When G0 back button is click
  goBack():void {
    this.route.navigate(['dashboard/recipient']);
  }

  //When the data is save
  save(): void {
    //Get all the value thru ngModel
    this.recipient.forEach(element => {
      const id = element.id
      const firstname = element.firstname
      const middlename = element.middlename
      const lastname = element.lastname
      const category = element.category
      const gender = element.gender
      const contactnum = element.contactnum
      const email = element.email
      const address = element.address
      const birthday = element.birthday

      //Make JSON object of the data
      const updateData = {
        id: id ,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        category: category,
        gender: gender,
        contactnum: contactnum,
        email: email,
        address: address,
        birthday: birthday 
      };

      this.vaccinerecipientService.updateVaccineRecipients(updateData as Recipient).subscribe( data => {
        //SweetAlert
        Swal.fire({
          title: 'Record Successfully Updated!',
          text: "Go back to dashboard?",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go Back to Dashboard'
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['dashboard/recipient']); 
          }
        })
      });
    });
  }
  ngOnInit(): void {
    this.getRecipient();
  }

}
