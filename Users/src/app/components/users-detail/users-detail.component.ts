import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UsersService } from 'src/app/services/users.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent {

  map: mapboxgl.Map | undefined;
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
      this.map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1Ijoib25hbXVoIiwiYSI6ImNqcThpYnJxbTBmZnM0M2p3Nm1jaXBtODMifQ.QWxJ2Qn_CfPHzHOw8I8f3Q',
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 8,
        center: [-99.3084269, 19.3909832]
      });
      //Crear un marcador con las cordenadas del usuario
      // const marker1 = new mapboxgl.Marker()
      // .setLngLat([+this.userDetails.address.geo.lat, +this.userDetails.address.geo.lng])
      // .addTo(this.map);

    }

    // Navega hacia la ruta "/users"
    goBack(){
      this.router.navigate(['/']); 
    }
  
}
