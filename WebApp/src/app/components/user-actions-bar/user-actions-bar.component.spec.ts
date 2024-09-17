import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionsBarComponent } from './user-actions-bar.component';

describe('UserActionsBarComponent', () => {
  let component: UserActionsBarComponent;
  let fixture: ComponentFixture<UserActionsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActionsBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
