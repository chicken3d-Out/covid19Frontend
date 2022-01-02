import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecondDose } from 'src/app/covid19Interface';
import { SeconddoseService } from '../seconddose.service';
import { RecipientID, VaccineID, VaccineAdminID } from 'src/app/covid19Interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-seconddose',
  templateUrl: './edit-seconddose.component.html',
  styleUrls: ['./edit-seconddose.component.css']
})
export class EditSeconddoseComponent implements OnInit {

  constructor(private seconddoseService: SeconddoseService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  //Value Holder
  seconddose: SecondDose[] = [];

  duplicateRecipient = false;

  //GET data to put in combo Box
  recipientid: RecipientID[] = [];
  vaccineid: VaccineID[] = [];
  vaccineadminid: VaccineAdminID[] = [];

  //Value From ComboBox
  selectedRecipient: any;
  selectedVaccine:any;
  selectedVaccineAdmin:any;

  //Current Recipient ID
  seconddoseID!: number;

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

  //Bind Current REcipient Value to Edit HTML
  getSecondDoseDetails(): void{
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.seconddoseID = id;
    this.seconddoseService.getSecondDoseDetails(id).subscribe( data => {
      this.seconddose = data
      data.find((detail:any) => {
        this.selectedRecipient = detail.recipientid
        this.selectedVaccine = detail.vaccineid
        this.selectedVaccineAdmin = detail.vaccineadminid
      })
    });
  }
  //Back
  goBack(): void {
    this.router.navigate(['dashboard/second-dose']);
  }

  //Save Update
  save():void {
    //turn data to json object
    const updateData = {
      
      sdID: this.seconddoseID,
      vrID : this.selectedRecipient,
      vID : this.selectedVaccine,
      vaID : this.selectedVaccineAdmin,
    }

    //Call Servive to update
    this.seconddoseService.updateSecondDose(updateData as SecondDose).subscribe( data => {
      //SweetAlert
      Swal.fire({
        title: 'Record Successfully Updated!',
        text: "Go back to dashboard?",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go Back to Dashboard'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['dashboard/second-dose']); 
        }
      })
    })
  }
  ngOnInit(): void {
    this.getData();
    this.getSecondDoseDetails();
  }

}
