import { Component, OnInit } from '@angular/core';
import { SecondDose, RecipientID } from 'src/app/covid19Interface';
import { Router } from '@angular/router';
import { VaccineID } from 'src/app/covid19Interface';
import { VaccineAdminID } from 'src/app/covid19Interface';
import { SeconddoseService } from '../seconddose.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-seconddose',
  templateUrl: './add-seconddose.component.html',
  styleUrls: ['./add-seconddose.component.css']
})
export class AddSeconddoseComponent implements OnInit {

  constructor(private seconddoseService: SeconddoseService, private router: Router) { }

  //Email Error Notification
  duplicateRecipient = false;

  //GET data to put in combo Box
  recipientid: RecipientID[] = [];
  vaccineid: VaccineID[] = [];
  vaccineadminid: VaccineAdminID[] = [];

  //Value From ComboBox
  selectedRecipient: any;
  selectedVaccine:any;
  selectedVaccineAdmin:any;

  //GET Important Data
  getData(): void {
    this.seconddoseService.getRecipientID().subscribe( data =>{
      this.recipientid = data
    })
    this.seconddoseService.getVaccineID().subscribe( data => {
      this.vaccineid = data
    })
    this.seconddoseService.getvaccineadminID().subscribe( data => {
      this.vaccineadminid = data
    })
  }

  //Create new record of vaccine
  onSubmit(data:any){

    const recipient = data.value.recipient;
    const vaccine = data.value.vaccine;
    const vaccineadmin = data.value.vaccineadmin;

    const newSecondDoseData = {
      sdID: null,
      vrID: recipient,
      vID: vaccine,
      vaID: vaccineadmin,
      date: null
    };

    //Check Duplicate Recipient
    this.seconddoseService.getAllSecondDoseInfo().subscribe( results => {
      const checkDuplicateRecipient = results.find((auth: any) => {
        return auth.vrID === recipient;
      })
      if (checkDuplicateRecipient){
        this.duplicateRecipient = true;
      }
      else {
        this.duplicateRecipient = false;

        //Create a new record
        this.seconddoseService.createNewSecondDose(newSecondDoseData as SecondDose).subscribe( data => {
          console.log(data);

          Swal.fire({
            title: 'Record Successfully Created!',
            text: "Go back to dashboard?",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Dashboard'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['dashboard/second-dose']); 
            }
          })
        })
      }
    })
  }

  ngOnInit(): void {
    this.getData();
  }

}
