import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { OverviewComponent } from './admin/overview/overview.component';
import { VaccineRecipientComponent } from './admin/vaccine-recipient/vaccine-recipient.component';
import { FirstdoseComponent } from './admin/firstdose/firstdose.component';
import { SeconddoseComponent } from './admin/seconddose/seconddose.component';
import { VaccineComponent } from './admin/vaccine/vaccine.component';
import { VaccineAdministratorComponent } from './admin/vaccine-administrator/vaccine-administrator.component';
import { AddVaccineRecipientComponent } from './admin/vaccine-recipient/add-vaccine-recipient/add-vaccine-recipient.component';
import { EditVaccineRecipientComponent } from './admin/vaccine-recipient/edit-vaccine-recipient/edit-vaccine-recipient.component';
import { EditVaccineComponent } from './admin/vaccine/edit-vaccine/edit-vaccine.component';
import { AddVaccineComponent } from './admin/vaccine/add-vaccine/add-vaccine.component';
import { AddVaccineAdminComponent } from './admin/vaccine-administrator/add-vaccine-admin/add-vaccine-admin.component';
import { EditVaccineAdminComponent } from './admin/vaccine-administrator/edit-vaccine-admin/edit-vaccine-admin.component';
import { ReservationComponent } from './admin/reservation/reservation.component';
import { AddFirstdoseComponent } from './admin/firstdose/add-firstdose/add-firstdose.component';
import { EditFirstdoseComponent } from './admin/firstdose/edit-firstdose/edit-firstdose.component';
import { AddSeconddoseComponent } from './admin/seconddose/add-seconddose/add-seconddose.component';
import { EditSeconddoseComponent } from './admin/seconddose/edit-seconddose/edit-seconddose.component';
//View Components
import { ViewDashboardComponent } from './view/view-dashboard/view-dashboard.component';
import { OverviewViewComponent } from './view/overview-view/overview-view.component';
import { FirstdoseViewComponent } from './view/firstdose-view/firstdose-view.component';
import { SeconddoseViewComponent } from './view/seconddose-view/seconddose-view.component';
import { ReservationViewComponent } from './view/reservation-view/reservation-view.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { StatisticsComponent } from './view/statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminLoginComponent,
    DashboardComponent,
    OverviewComponent,
    VaccineRecipientComponent,
    FirstdoseComponent,
    SeconddoseComponent,
    VaccineComponent,
    VaccineAdministratorComponent,
    AddVaccineRecipientComponent,
    EditVaccineRecipientComponent,
    EditVaccineComponent,
    AddVaccineComponent,
    AddVaccineAdminComponent,
    EditVaccineAdminComponent,
    ReservationComponent,
    AddFirstdoseComponent,
    EditFirstdoseComponent,
    AddSeconddoseComponent,
    EditSeconddoseComponent,
    ViewDashboardComponent,
    OverviewViewComponent,
    FirstdoseViewComponent,
    SeconddoseViewComponent,
    ReservationViewComponent,
    AddAdminComponent,
    PagenotfoundComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    RouterModule.forRoot([
      {path: '', component: WelcomeComponent},//change the path later to ''
      {path: 'admin-login', component: AdminLoginComponent},
      //View Paths
      {path: 'dashboard-view', component: ViewDashboardComponent, children: [
          { path: 'overview-view', component: OverviewViewComponent },
          { path: 'first-dose-view', component: FirstdoseViewComponent },
          { path: 'second-dose-view', component: SeconddoseViewComponent },
          { path: 'statistics-view', component: StatisticsComponent },
          { path: 'reservation-view', component: ReservationViewComponent },
          { path: '', redirectTo: 'overview-view', pathMatch: 'full' }
      ]},//Remove auth guard later
      {path: 'dashboard', component: DashboardComponent, children: [
          { path: 'overview', component: OverviewComponent},
          { path: 'recipient', component: VaccineRecipientComponent},
          { path: 'first-dose', component: FirstdoseComponent},
          { path: 'second-dose', component: SeconddoseComponent},
          { path: 'vaccine', component: VaccineComponent},
          { path: 'vaccine-administrator', component: VaccineAdministratorComponent},
          { path: 'reservation', component: ReservationComponent},
          { path: 'add-admin', component: AddAdminComponent},
          { path: '', redirectTo: 'overview', pathMatch: 'full'},

          //Vaccine Recipient Paths
          { path: 'recipient/add-vaccine-recipient', component: AddVaccineRecipientComponent},
          { path: 'recipient/edit-vaccine-recipient/:id', component: EditVaccineRecipientComponent},
          //Vaccine Paths
          { path: 'vaccine/add-vaccine', component: AddVaccineComponent},
          { path: 'vaccine/edit-vaccine/:id', component: EditVaccineComponent},
          //Vacine Admin Paths
          { path: 'vaccine-administrator/add-vaccine-admin', component: AddVaccineAdminComponent},
          { path: 'vaccine-administrator/edit-vaccine-admin/:id', component: EditVaccineAdminComponent},
          //FirstDose Paths
          { path: 'first-dose/add-first-dose', component: AddFirstdoseComponent},
          { path: 'first-dose/edit-first-dose/:id', component: EditFirstdoseComponent},
          //SecondDose Paths
          { path: 'second-dose/add-second-dose', component: AddSeconddoseComponent},
          { path: 'second-dose/edit-second-dose/:id', component: EditSeconddoseComponent},

      ], 
      canActivate: [AuthGuard]},
      //Path if paths are invalid
      { path: '**', redirectTo: 'Page404NotFound' },
      { path: 'Page404NotFound', component: PagenotfoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
