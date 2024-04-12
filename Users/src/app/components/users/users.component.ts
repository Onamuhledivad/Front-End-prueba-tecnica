import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userData:User[] = [];
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'details'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private userService: UsersService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userData = users;
        this.paginator.firstPage();
        this.paginator.pageSize = 5;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
    
  }


  verDetalles(userId: number){
    console.log('Detalles del usuario:', userId);
    this.router.navigate(['/user-details', userId]);
  }

  

}
