import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
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
  dataSource: any;
  totalRecords: number = 0;
  pageSize: number = 5;
  userData:User[] = [];
  //se establecen las columnas
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'details'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private userService: UsersService){}

  ngOnInit(): void {
    //Servicio para obtener la lista de usuarios
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userData = users;
        //paginacion
        this.dataSource = new MatTableDataSource(this.userData);
        this.totalRecords = this.dataSource.data.length;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }


  verDetalles(userId: number){
    //Boton para ver los detalles de cada usuario en otra pagina 
    this.router.navigate(['/user-details', userId]);
  }

  search(event: Event) {
    //Funcion para buscar un usuario por cualquier dato
    const valueSearch = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valueSearch.trim().toLowerCase();
    this.userData = this.dataSource.filteredData;
    
  }

  

}
