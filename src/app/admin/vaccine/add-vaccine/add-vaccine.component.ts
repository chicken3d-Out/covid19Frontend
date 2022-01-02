import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Vaccine } from 'src/app/covid19Interface';
import { VaccineService } from '../vaccine.service';

@Component({
  selector: 'app-add-vaccine',
  templateUrl: './add-vaccine.component.html',
  styleUrls: ['./add-vaccine.component.css']
})
export class AddVaccineComponent implements OnInit {

  constructor(private vaccineService: VaccineService, private router: Router) { }
  panelOpenState = false;
  //selectedCatgory

  //Email Error Notification
  duplicateVaccine = false;

  //Create new record of vaccine
  onSubmit(data:any){

    const vaccinename = data.value.vaccineName;
    const stock = data.value.stock;
    const manufacturer = data.value.manufacturer;
    const efficacyrate = data.value.efficacyRate;

    const newVaccineData = {
      id: null,
      vaccineName: vaccinename,
      stock: stock,
      manufacturer: manufacturer,
      efficacyRate: efficacyrate,
    };

    //Check Duplicate Vaccine Name
    this.vaccineService.getAllVaccineInfo().subscribe( results => {
      const checkVaccine = results.find((auth: any) => {
        return auth.vaccineName === vaccinename;
      })
      if (checkVaccine){
        this.duplicateVaccine = true;
      }
      else {
        this.duplicateVaccine = false;

        //Create a new record
        this.vaccineService.createNewVaccine(newVaccineData as Vaccine).subscribe( data => {
          console.log(data);

          Swal.fire({
            title: 'Record Successfully Created!',
            text: "Go back to dashboard?",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Dashboard'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['dashboard/vaccine']); 
            }
          })
        })
      }
    })
    
  }
  ngOnInit(): void {
  }

}
