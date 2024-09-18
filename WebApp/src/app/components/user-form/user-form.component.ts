import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { catchError, Observable, of, switchMap, map } from 'rxjs';
import {
  formatDateForInput,
  formatDateForApi,
} from '../../helpers/date-helpers';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserForm implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId$: Observable<number | null>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: [''],
      phoneNumber: [''],
      address: [''],
      city: [''],
      state: [''],
      zipcode: [''],
    });

    this.userId$ = this.route.params.pipe(
      switchMap((params) => of(params['id'] ? +params['id'] : null))
    );
  }

  ngOnInit(): void {
    this.userId$
      .pipe(
        switchMap((id) => {
          if (id) {
            this.isEditMode = true;
            return this.userService.getUser(id).pipe(
              map((user) => {
                if (user && user.birthdate) {
                  user.birthdate = formatDateForInput(user.birthdate);
                }
                return user;
              })
            );
          }
          return of(null);
        }),
        catchError((error) => {
          console.error('Error Loading User', error);
          return of(null);
        })
      )
      .subscribe((user) => {
        if (user) {
          this.userForm.patchValue(user);
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (user.birthdate) {
        user.birthdate = formatDateForApi(user.birthdate);
      }

      this.userId$
        .pipe(
          switchMap((id) => {
            if (this.isEditMode && id) {
              user.userId = id;
              return this.userService.updateUser(user);
            } else {
              return this.userService.createUser(user);
            }
          }),
          catchError((error) => {
            console.error(
              `Error ${this.isEditMode ? 'Updating' : 'Creating'} User`,
              error
            );
            return of(null);
          })
        )
        .subscribe((result) => {
          if (result !== null) {
            this.router.navigate(['/users']);
          }
        });
    }
  }
}
