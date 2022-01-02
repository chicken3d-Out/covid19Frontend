import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirstDose } from 'src/app/covid19Interface';
import { FirstdoseService } from '../firstdose.service';
import { RecipientID, VaccineID, VaccineAdminID } from 'src/app/covid19Interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-firstdose',
  templateUrl: './edit-firstdose.component.html',
  styleUrls: ['./edit-firstdose.component.css']
})
export class EditFirstdoseComponent implements OnInit {

  //Value Holder
  firstdose: FirstDose[] = [];

  duplicateRecipient = false;

  constructor( private firstdoseService: FirstdoseService,
                private activeRoute: ActivatedRoute,
                private router: Router ) { }

  //GET data to put in combo Box
  recipientid: RecipientID[] = [];
  vaccineid: VaccineID[] = [];
  vaccineadminid: VaccineAdminID[] = [];

  //Value From ComboBox
  selectedRecipient: any;
  selectedVaccine:any;
  selectedVaccineAdmin:any;

  //Current Recipient ID
  firstdoseID!: number;

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

  //Bind Current REcipient Value to Edit HTML
  getFirstDoseDetails(): void{
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.firstdoseID = id;
    this.firstdoseService.getFirstdoseDetails(id).subscribe( data => {
      this.firstdose = data
      data.find((detail:any) => {
        this.selectedRecipient = detail.recipientid
        this.selectedVaccine = detail.vaccineid
        this.selectedVaccineAdmin = detail.vaccineadminid
      })
    });
  }
    //Back
    goBack(): void {
      this.router.navigate(['dashboard/first-dose']);
    }

    //Save Update
    save():void {
        //turn data to json object
        const updateData = {
          
          fdID: this.firstdoseID,
          vrID : this.selectedRecipient,
          vID : this.selectedVaccine,
          vaID : this.selectedVaccineAdmin,
        }

        //Call Servive to update
        this.firstdoseService.updateFirstdose(updateData as FirstDose).subscribe( data => {
          //SweetAlert
          Swal.fire({
            title: 'Record Successfully Updated!',
            text: "Go back to dashboard?",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Go Back to Dashboard'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['dashboard/first-dose']); 
            }
          })
        })
      
    }

  ngOnInit(): void {
    this.getData();
    this.getFirstDoseDetails();
  }
}


