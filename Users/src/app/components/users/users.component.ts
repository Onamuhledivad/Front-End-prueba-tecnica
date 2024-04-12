import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource: any;
  userData:User[] = [];
  //se establecen las columnas
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'details'];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private userService: UsersService){}

  ngOnInit(): void {
    //Servicio para obtener la lista de usuarios
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.userData = users;
        //paginacion
        this.dataSource = new MatTableDataSource<User>(this.userData);
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  //Boton para ver los detalles de cada usuario en otra pagina 
  moreDetails(userId: number){
    this.router.navigate(['/user-details', userId]);
  }

  //Funcion para buscar un usuario por cualquier dato
  search(event: Event) {
    const valueSearch = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valueSearch.trim().toLowerCase();
    this.userData = this.dataSource.filteredData;
    
  }

  

}
