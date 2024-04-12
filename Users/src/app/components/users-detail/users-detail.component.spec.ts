import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailComponent } from './users-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersComponent } from '../users/users.component';
import { UsersService } from 'src/app/services/users.service';

describe('UsersDetailComponent', () => {
  let component: UsersDetailComponent;
  let fixture: ComponentFixture<UsersDetailComponent>;

  const routes = [
    {
      path: '',
      component: UsersComponent,
    },
    {
      path: 'user-details/:userId',
      component: UsersDetailComponent,
     }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersDetailComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        UsersService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(UsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
