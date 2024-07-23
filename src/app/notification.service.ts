import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<string[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private notifications: string[] = [];

  addNotification(notification: string) {
    console.log('Adding notification:', notification); // Log the notification being added
    this.notifications.push(notification);
    this.notificationsSubject.next(this.notifications);
  }

  getNotifications(): string[] {
    return this.notifications;
  }

  clearNotifications(): void {
    this.notifications = [];
    this.notificationsSubject.next(this.notifications);
  }
}
