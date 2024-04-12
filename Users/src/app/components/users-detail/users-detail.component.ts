import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent {

  userId: number = 0;
  userDetails: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: ''
      }
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService){}

  
    ngOnInit(){
      // Obtiene el ID del usuario de los parámetros de ruta
      this.route.params.subscribe(params => {
        this.userId = +params['userId'];
        // Carga los detalles del usuario utilizando el ID
        this.userService.getUsersByID(this.userId).subscribe((user:User) => {
          this.userDetails = user;
          console.log(this.userDetails);
        });
      });
    }

    goBack(){
      this.router.navigate(['/']); // Navega hacia la ruta "/users"
    }
  
}
