import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/auth/services/authorization.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private authService: AuthorizationService){

  }



}
