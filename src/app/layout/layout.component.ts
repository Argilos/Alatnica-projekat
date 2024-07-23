import { Component, OnInit } from '@angular/core';
import { UserService } from '../login/auth/user.service';
import { DashboardService } from '../dashboard-service.service'; 
import { DateTimeService } from '../date-time.service';
import { ToolService } from 'app/alat.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  activeSubMenuHome: string = '';
  activeSubMenuServisi: string = '';
  activeSubMenuBazdarenje: string = '';
  activeSubMenuRadnik: string = '';
  activeSubMenuDobavljac: string = '';
  activeSubMenuProjekti: string = '';
  activeSubMenuIzvjestaji: string = '';
  activeSubMenuInventura: string = '';
  currentDate!: string;
  userName: string = '';
  notificationsAboutServices: any[] = [];
  notificationsAboutUpcomingTuning: any[] = [];
  numberOfIssuedTools: number = 0;
  numberOfToolsOnService: number = 0;
  unseenNotificationsCount: number = 0;
  showNotifications: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private userService: UserService,
    private dashboardService: DashboardService,
    private dateTimeService: DateTimeService, // Add DateTimeService
    private toolService : ToolService,
    private router: Router,
    
  ) {}

  ngOnInit() {

    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
    
      this.checkAdminUser();
      this.fetchUserInfo();
    }


    // Subscribe to the currentDate$ observable from DateTimeService
    this.dateTimeService.currentDate$.subscribe((date) => {
      this.currentDate = date;
    });

    // Fetch user information
    this.userService.getCurrentUser().subscribe(user => {
      this.userName = user.name;
    });

    // Fetch data for notifications and counts
    // this.fetchNotificationsAboutServices();
    // this.fetchNotificationsAboutUpcomingTuning();
    this.fetchNumberOfIssuedTools();
    this.fetchNumberOfToolsOnService();


    // Fetch unseen notifications count
    this.fetchUnseenNotificationsCount();

    //Changes in number of issued tools
    this.toolService.numberOfIssuedTools$.subscribe((count) =>{
      this.numberOfIssuedTools = count;
    } )

    
  }

  fetchUserInfo() {
    
    this.userService.getCurrentUser().subscribe(user => {
      console.log('User:', user); 
      this.userName = user.username; 
    });
  }
  

  checkAdminUser() {
    const userRole = sessionStorage.getItem('userRole');
    console.log('User role:', userRole);
    this.isAdmin = (userRole === 'admin');
  }

  logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  toggleSubMenu(subMenu: string) {
    switch (subMenu) {
      case 'home':
        this.activeSubMenuHome = (this.activeSubMenuHome === 'home') ? '' : 'home';
        break;
      case 'servisi':
        this.activeSubMenuServisi = (this.activeSubMenuServisi === 'servisi') ? '' : 'servisi';
        break;
      case 'bazdarenje':
        this.activeSubMenuBazdarenje = (this.activeSubMenuBazdarenje === 'bazdarenje') ? '' : 'bazdarenje';
        break;
      case 'radnik':
        this.activeSubMenuRadnik = (this.activeSubMenuRadnik === 'radnik') ? '' : 'radnik';
        break;
      case 'dobavljac':
        this.activeSubMenuDobavljac = (this.activeSubMenuDobavljac === 'dobavljac') ? '' : 'dobavljac';
        break;
      case 'projekti':
        this.activeSubMenuProjekti = (this.activeSubMenuProjekti === 'projekti') ? '' : 'projekti';
        break;
      case 'izvjestaji':
        this.activeSubMenuIzvjestaji = (this.activeSubMenuIzvjestaji === 'izvjestaji') ? '' : 'izvjestaji';
        break;
      case 'inventura':
        this.activeSubMenuInventura = (this.activeSubMenuInventura === 'inventura') ? '' : 'inventura';
        break;
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  private fetchNotificationsAboutServices() {
    this.dashboardService.getNotificationsAboutServices().subscribe(data => {
      this.notificationsAboutServices = data;
    });
  }

  private fetchNotificationsAboutUpcomingTuning() {
    this.dashboardService.getNotificationsAboutUpcomingTuning().subscribe(data => {
      this.notificationsAboutUpcomingTuning = data;
    });
  }

  private fetchNumberOfIssuedTools() {
    this.dashboardService.getNumberOfIssuedTools().subscribe(count => {
      this.numberOfIssuedTools = count;
    });
  }

  private fetchNumberOfToolsOnService() {
    this.dashboardService.getNumberOfToolsOnService().subscribe(count => {
      this.numberOfToolsOnService = count;
    });
  }

  private fetchUnseenNotificationsCount() {
    // Replace 'your_endpoint_for_unseen_notifications_count' with your actual endpoint
    this.dashboardService.getUnseenNotificationsCount().subscribe(count => {
      this.unseenNotificationsCount = count;
    });
  }

  
}