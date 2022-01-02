import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccineService } from '../vaccine.service';
import Swal from 'sweetalert2';
import { Vaccine } from 'src/app/covid19Interface';

@Component({
  selector: 'app-edit-vaccine',
  templateUrl: './edit-vaccine.component.html',
  styleUrls: ['./edit-vaccine.component.css']
})
export class EditVaccineComponent implements OnInit {

  //Get details of vaccine details
  vaccine:Vaccine[] = [];

  //avoid suplicate vaccine record
  duplicateVaccine = false;

  constructor(private vaccineService: VaccineService, 
              private activeRoute: ActivatedRoute, 
              private router: Router) { }

  getVaccineDetails():void {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.vaccineService.getVaccineDetails(id).subscribe( data => {
      this.vaccine = data
    })

  }
  //Go Back 
  goBack(): void {
    this.router.navigate(['dashboard/vaccine']);
  }

  //Save Update
  save():void {
    this.vaccine.forEach( element => {
      const id = element.id;
      const vaccinename = element.vaccineName;
      const stock = element.stock;
      const manufacturer = element.manufacturer;
      const efficacyrate = element.efficacyRate;

      //turn data to json
      const updateData = {
        id : id,
        vaccineName : vaccinename,
        stock : stock,
        manufacturer: manufacturer,
        efficacyRate: efficacyrate
      }

      //Call Servive to update
      this.vaccineService.updateVaccine(updateData as Vaccine).subscribe( data => {
        //SweetAlert
        Swal.fire({
          title: 'Record Successfully Updated!',
          text: "Go back to dashboard?",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go Back to Dashboard'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['dashboard/vaccine']); 
          }
        })
      })
    })
  }
  ngOnInit(): void {
    this.getVaccineDetails();
  }

}
