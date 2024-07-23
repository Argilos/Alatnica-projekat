import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LicnaKartaComponent } from './unesi-novi-alat/unesi-novi-alat';
import { ToolService } from './alat.service';
import { IzdajAlatComponent } from './izdaj-alat/izdaj-alat.component';
import { ToolListComponent } from './tools/tool-list.component';
import { AlatService } from './pregled-alata/tool.service';
import { ToolProfileComponent } from './tools/tool-profile.component';
import { BazdarenjeComponent } from './bazdarenje/bazdarenje.component';
import { ServisModule } from './servis/servis.module';
import { BazdarenjeInProgressComponent } from './bazdarenje-in-progress/bazdarenje-in-progress.component';

import { ServiceInProgressComponent } from './service-in-progress/service-in-progress.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WorkerFormComponent } from './worker-form/worker-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WorkerService } from './worker-form/worker.service';
//import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkerListComponent } from './worker-profile/worker-list.component';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';
import { AddCompanyComponent } from './kompanije/add-company.component';
import { ListCompaniesComponent } from './kompanije/list-companies.component';
import { CompanyDetailsComponent } from './kompanije/company-details.component';
import { WorkerReportComponent } from './worker-reports/worker-report.component';
import { ToolRentalsComponent } from './tool-rentals/tool-rentals.component';
import { ReturnToolsComponent } from './vrati-alat/vrati-alat.component';
import { ToolReturnConfirmationDialogComponent } from './tool-return-conf-dialog/tool-return-conf-dialog.component';
import { MarkAsConsumedComponent } from './mark-as-consumed/mark-as-consumed.component';
import { ToolsRashodovanoComponent } from './tools-rashodovano/tools-rashodovano.component';
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this line for MatFormFieldModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Add this line for MatPaginatorModule
import { MatSortModule } from '@angular/material/sort'; // Add this line for MatSortModule
import { ToolsByYearComponent } from './tools-by-year/tools-by-year.component';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { LayoutComponent } from './layout/layout.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NalogListComponent } from './nalog-lista/nalog-lista.component';
import { RentalDetailsDialogComponent } from './rental-details-dialog/rental-details-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { NotificationService } from './notification.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    LicnaKartaComponent,
    IzdajAlatComponent,
    ToolListComponent,
    ToolProfileComponent,
    BazdarenjeComponent,
    ServiceInProgressComponent,
    WorkerFormComponent,
    WorkerListComponent,
    WorkerProfileComponent,
    AddCompanyComponent,
    ListCompaniesComponent,
    CompanyDetailsComponent,
    WorkerReportComponent,
    ToolRentalsComponent,
    ReturnToolsComponent,
    ToolReturnConfirmationDialogComponent,
    MarkAsConsumedComponent,
    ToolsRashodovanoComponent,
    BazdarenjeInProgressComponent,
    ToolsByYearComponent,
    YearSelectorComponent,
    LayoutComponent,
    AddProjectComponent,
    ProjectListComponent,
    NalogListComponent,
    RentalDetailsDialogComponent,
    NotificationBarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Make sure this comes after FormsModule
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule,
    ServisModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    //MatSnackBarModule,
    MatDialogModule,
    RouterModule.forRoot([]),
    MatFormFieldModule, 
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSortModule,
    MatSort,
    MatCardModule
   
  ],
  providers: [ToolService, WorkerService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
