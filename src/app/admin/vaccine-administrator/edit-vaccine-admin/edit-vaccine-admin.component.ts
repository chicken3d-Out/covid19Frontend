import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccineAdmin } from 'src/app/covid19Interface';
import { VaccineAdminServiceService } from '../vaccine-administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vaccine-admin',
  templateUrl: './edit-vaccine-admin.component.html',
  styleUrls: ['./edit-vaccine-admin.component.css']
})
export class EditVaccineAdminComponent implements OnInit {

  //Store all the details
  vaccineadmin:VaccineAdmin[] = [];

  //Avoid Duplicate Vaccine Administrator
  duplicateAdmin = false;

  constructor(private vaccineadminService: VaccineAdminServiceService, 
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  getVaccineAdminDetails():void {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));
    this.vaccineadminService.getVaccineAdminDetails(id).subscribe( data => {
      this.vaccineadmin = data
    })
  }
  //Go Back 
  goBack(): void {
    this.router.navigate(['dashboard/vaccine-administrator']);
  }
  //Save Update
  save():void {
    this.vaccineadmin.forEach( element => {
      const id = element.id;
      const healthfacility = element.healthFacility;
      const vaccinator = element.vaccinator;
      const address = element.address;

      //turn data to json
      const updateData = {
        id : id,
        healthFacility : healthfacility,
        vaccinator : vaccinator,
        address: address
      }
      console.log(updateData)

      //Call Servive to update
      this.vaccineadminService.updateVaccineAdmin(updateData as VaccineAdmin).subscribe( data => {
        //SweetAlert
        Swal.fire({
          title: 'Record Successfully Updated!',
          text: "Go back to dashboard?",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go Back to Dashboard'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['dashboard/vaccine-administrator']); 
          }
        })
      })
    })
  }

  ngOnInit(): void {
    this.getVaccineAdminDetails();
  }

}
