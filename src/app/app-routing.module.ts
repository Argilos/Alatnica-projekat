import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LicnaKartaComponent } from './unesi-novi-alat/unesi-novi-alat';
import { PregledAlataComponent } from './pregled-alata/pregled-alata.component';
import { IzdajAlatComponent } from './izdaj-alat/izdaj-alat.component';
import { ToolListComponent } from './tools/tool-list.component';
import { ToolProfileComponent } from './tools/tool-profile.component';
// import { ToolProfileComponent } from './tool-profile/tool-profile.component';
import { ServisComponent } from './servis/servis.component';
import { BazdarenjeComponent } from './bazdarenje/bazdarenje.component';


// import { WorkersComponent } from './worker/worker.component';
//import { AddWorkerComponent } from './worker/add-worker.component';
import { ServiceInProgressComponent } from './service-in-progress/service-in-progress.component';
import { WorkerFormComponent } from './worker-form/worker-form.component';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';
import { WorkerListComponent } from './worker-profile/worker-list.component';
import { AddCompanyComponent } from './kompanije/add-company.component';
import { CompanyDetailsComponent } from './kompanije/company-details.component';
import { ListCompaniesComponent } from './kompanije/list-companies.component';
import { WorkerReportComponent } from './worker-reports/worker-report.component';
import { ToolRentalsComponent } from './tool-rentals/tool-rentals.component';
import { ReturnToolsComponent } from './vrati-alat/vrati-alat.component';
import { MarkAsConsumedComponent } from './mark-as-consumed/mark-as-consumed.component';
import { ToolsRashodovanoComponent } from './tools-rashodovano/tools-rashodovano.component';
import { BazdarenjeInProgressComponent } from './bazdarenje-in-progress/bazdarenje-in-progress.component';
import { ToolsByYearComponent } from './tools-by-year/tools-by-year.component';
import { LayoutComponent } from './layout/layout.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NalogListComponent } from './nalog-lista/nalog-lista.component';
import { AuthGuard } from './login/auth/AuthGuard.service';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protecting the entire layout
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'unesi_dobavljaca', component: AddCompanyComponent },
      { path: 'dobavljac/:id', component: CompanyDetailsComponent },
      { path: 'pregled_dobavljaca', component: ListCompaniesComponent },
      { path: 'vrati-alat', component: ReturnToolsComponent },
      { path: 'rashoduj', component: MarkAsConsumedComponent },
      { path: 'rashodovaniAlati', component: ToolsRashodovanoComponent },
      { path: 'bazdarenja-in-progress', component: BazdarenjeInProgressComponent },
      { path: 'transakcije', component: ToolsByYearComponent },
      { path: 'transakcijeAlata', component: ToolRentalsComponent },
      { path: 'radnikIzvjestaj', component: WorkerReportComponent },
      { path: 'unesi-radnika', component: WorkerFormComponent },
      { path: 'radnik-profile/:id', component: WorkerProfileComponent },
      { path: 'licnaKarta', component: LicnaKartaComponent },
      { path: 'pregledAlata', component: PregledAlataComponent },
      { path: 'izdajAlat', component: IzdajAlatComponent },
      { path: 'servis', component: ServisComponent },
      { path: 'bazdarenje', component: BazdarenjeComponent },
      { path: 'tools', component: ToolListComponent },
      { path: 'tool/:id', component: ToolProfileComponent },
      { path: 'tool/:ets_id', component: ToolProfileComponent },
      { path: 'service-in-progress', component: ServiceInProgressComponent },
      { path: 'radnici', component: WorkerListComponent },
      { path: 'add-project', component: AddProjectComponent },
      { path: 'project-list', component: ProjectListComponent },
      { path: 'nalog_list', component: NalogListComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
