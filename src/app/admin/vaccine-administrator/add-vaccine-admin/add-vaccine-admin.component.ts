import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VaccineAdmin } from 'src/app/covid19Interface';
import { VaccineAdminServiceService } from '../vaccine-administrator.service';

@Component({
  selector: 'app-add-vaccine-admin',
  templateUrl: './add-vaccine-admin.component.html',
  styleUrls: ['./add-vaccine-admin.component.css']
})
export class AddVaccineAdminComponent implements OnInit {

  constructor(private vaccineadminService: VaccineAdminServiceService, private router: Router) { }

  /*panelOpenState = false;*/
  //selectedCatgory

  //Email Error Notification
  duplicateVaccineAdmin = false;

  //Create new record of vaccine
  onSubmit(data:any){

    const healthfacility = data.value.healthfacility;
    const vaccinator = data.value.vaccinator;
    const address = data.value.address;

    const newVaccineAdminData = {
      id: null,
      healthFacility: healthfacility,
      vaccinator: vaccinator,
      address: address,
    };
    console.log(newVaccineAdminData)

    //Check Duplicate Vaccine Administrator
    this.vaccineadminService.getAllVaccineAdminInfo().subscribe( results => {
      const checkVaccineAdmin = results.find((auth: any) => {
        return auth.healthFacility === healthfacility;
      })
      if (checkVaccineAdmin){
        this.duplicateVaccineAdmin = true;
      }
      else {
        this.duplicateVaccineAdmin = false;

        //Create a new record
        this.vaccineadminService.createNewVaccineAdmin(newVaccineAdminData as VaccineAdmin).subscribe( data => {
          console.log(data);

          Swal.fire({
            title: 'Record Successfully Created!',
            text: "Go back to dashboard?",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Dashboard'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['dashboard/vaccine-administrator']); 
            }
          })
        })
      }
    })
  }
  ngOnInit(): void {
  }

}
