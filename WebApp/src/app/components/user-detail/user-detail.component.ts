import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { Observable, switchMap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  providers: [UserService],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetail implements OnInit {
  user$!: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return this.userService.getUser(Number(id));
      })
    );
  }
}
