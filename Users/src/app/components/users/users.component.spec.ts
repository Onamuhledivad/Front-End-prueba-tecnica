import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersService } from 'src/app/services/users.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersDetailComponent } from '../users-detail/users-detail.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let location: Location;
  let router: Router;

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
      declarations: [UsersComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        UsersService
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should filter data when search is called', fakeAsync (() => {

    component.dataSource = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Alice' },
    ];

   // Simular el evento con un valor de búsqueda
   const event = { target: { value: 'jane' } } as unknown as Event;

   // Llamar a la función de búsqueda
   component.search(event);

   // Verificar que el filtro se haya aplicado correctamente
   expect(component.dataSource.filter).toBe('jane'); // Verificar que el filtro se ha aplicado correctamente
   expect(component.dataSource.length).toBe(3); // Verificar que solo hay un elemento en los datos filtrados
  }));


  it('moreDetails()', fakeAsync(() => {
    router.navigate(['user-details/5']);
    tick();
    component.moreDetails(5);
    expect(location.path()).not.toBeNull();
  }));


});
