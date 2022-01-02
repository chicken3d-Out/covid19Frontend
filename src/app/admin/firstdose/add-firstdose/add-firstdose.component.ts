import { Component, OnInit } from '@angular/core';
import { FirstdoseService } from '../firstdose.service';
import { FirstDose, RecipientID } from 'src/app/covid19Interface';
import { Router } from '@angular/router';
import { VaccineID } from 'src/app/covid19Interface';
import { VaccineAdminID } from 'src/app/covid19Interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-firstdose',
  templateUrl: './add-firstdose.component.html',
  styleUrls: ['./add-firstdose.component.css']
})
export class AddFirstdoseComponent implements OnInit {

  constructor(private firstdoseService: FirstdoseService, private router: Router) { }

  panelOpenState = false;
  //selectedCatgory

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
    this.firstdoseService.getRecipientID().subscribe( data =>{
      this.recipientid = data
    })
    this.firstdoseService.getVaccineID().subscribe( data => {
      this.vaccineid = data
    })
    this.firstdoseService.getvaccineadminID().subscribe( data => {
      this.vaccineadminid = data
    })
  }

  //Create new record of vaccine
  onSubmit(data:any){

    const recipient = data.value.recipient;
    const vaccine = data.value.vaccine;
    const vaccineadmin = data.value.vaccineadmin;

    const newFirstDoseData = {
      fdID: null,
      vrID: recipient,
      vID: vaccine,
      vaID: vaccineadmin,
      date: null
    };
    console.log(newFirstDoseData)

    //Check Duplicate Recipient
    this.firstdoseService.getAllFirstdoseInfo().subscribe( results => {
      const checkDuplicateRecipient = results.find((auth: any) => {
        return auth.vrID === recipient;
      })
      if (checkDuplicateRecipient){
        this.duplicateRecipient = true;
      }
      else {
        this.duplicateRecipient = false;

        //Create a new record
        this.firstdoseService.createNewFirstdose(newFirstDoseData as FirstDose).subscribe( data => {
          console.log(data);

          Swal.fire({
            title: 'Record Successfully Created!',
            text: "Go back to dashboard?",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Dashboard'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['dashboard/first-dose']); 
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
