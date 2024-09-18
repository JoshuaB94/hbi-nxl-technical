import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-actions-bar',
  standalone: true,
  imports: [],
  templateUrl: './user-actions-bar.component.html',
  styleUrl: './user-actions-bar.component.css',
})
export class UserActionsBar {
  constructor(private router: Router) {}

  openUserForm() {
    this.router.navigate(['/users/new']);
  }
}
