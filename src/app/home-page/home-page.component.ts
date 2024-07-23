import { Component, OnInit } from '@angular/core';
import { UserService } from '../login/auth/user.service';
import { DashboardService } from '../dashboard-service.service';
import { DateTimeService } from '../date-time.service';
import { ToolService } from 'app/alat.service';
import { Router } from '@angular/router';
import { NotificationService } from 'app/notification.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  activeSubMenu: string = '';
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
  notifications: string[] = [];
  tools: any[] = [];

  constructor(
    private userService: UserService,
    private dashboardService: DashboardService,
    private dateTimeService: DateTimeService,
    private toolService: ToolService,
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (this.isLoggedIn) {
      this.checkAdminUser();
      this.fetchUserInfo();
      this.loadNotifications();
      // this.checkWarranty();
      this.fetchTools();
    }

    this.dateTimeService.currentDate$.subscribe((date) => {
      this.currentDate = date;
    });

    this.userService.getCurrentUser().subscribe(user => {
      this.userName = user.name;
    });

    this.fetchNumberOfIssuedTools();
    this.fetchNumberOfToolsOnService();
    this.fetchUnseenNotificationsCount();

    this.toolService.numberOfIssuedTools$.subscribe((count) => {
      this.numberOfIssuedTools = count;
    });
  }

  fetchUserInfo() {
    this.userService.getCurrentUser().subscribe(user => {
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
    const currentSubMenu = this.activeSubMenu;
    this.activeSubMenu = (currentSubMenu === subMenu) ? '' : subMenu;

    const arrow = document.querySelector(`.${subMenu} .arrow`);
    if (arrow) {
      arrow.classList.toggle('collapsed', currentSubMenu === subMenu);
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
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
    this.dashboardService.getUnseenNotificationsCount().subscribe(count => {
      this.unseenNotificationsCount = count;
    });
  }

  loadNotifications(): void {
    this.notifications = this.notificationService.getNotifications();
  }


  fetchTools(): void {
    console.log('Fetching tools warranty');
    this.toolService.getTools4Warranty().subscribe(tools => {
      console.log('Tools fetched:', tools); // Log the fetched tools
      this.tools = tools;
      this.checkWarranty();  // Move the call here
    });
  }
  


  checkWarranty(): void {
    console.log('Warranty started to work');
  
    this.tools.forEach((tool) => {
      console.log('Checking tool:', tool); 
      if (tool.remaining_warranty && typeof tool.remaining_warranty === 'number' && tool.remaining_warranty > 1) {
        console.log(`Adding notification for tool ${tool.naziv} (ID: ${tool.ets_id})`);
        this.notificationService.addNotification(
          `Tool ${tool.naziv} (ID: ${tool.ets_id}) has less than 1 day of warranty left.`
        );
        console.log('Notification added');
      }
    });
  }
  
  
  
  
}
