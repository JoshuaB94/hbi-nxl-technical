import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  providers: [UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserList {
  users$: Observable<User[]>;

  constructor(private userService: UserService, private router: Router) {
    this.users$ = userService.getUsers();
  }

  editUser(userId: number): void {
    this.router.navigate(['/users', userId, 'edit']);
  }
}
