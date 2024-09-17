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

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserForm implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  UserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Birthdate: [''],
      PhoneNumber: [''],
      Address: [''],
      City: [''],
      State: [''],
      Zipcode: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.UserId = +params['id'];
        this.loadUser(this.UserId);
      }
    });
  }

  loadUser(id: number): void {
    this.userService.getUser(id).subscribe(
      (user) => this.userForm.patchValue(user),
      (error) => console.error('Error Loading User', error)
    );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (this.isEditMode && this.UserId) {
        this.userService.updateUser(user).subscribe(
          () => this.router.navigate(['/users/:id/edit']),
          (error) => console.error('Error Updating User', error)
        );
      } else {
        this.userService.createUser(user).subscribe(
          () => this.router.navigate(['/users']),
          (error) => console.error('Error Creating User', error)
        );
      }
    }
  }
}
