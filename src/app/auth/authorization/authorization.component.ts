import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthData } from './model/AuthData';
import { AuthorizationService } from '../services/authorization.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from './model/Role';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {

  authorizationForm: FormGroup;
  error!: string;
  logoutMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private jwtDecoder: JwtHelperService,
    private router: Router) {

    this.authorizationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    
  }


  login() {
    const values = this.authorizationForm.value;
    let authData = new AuthData(values.username, values.password);
    this.authService.login(authData).subscribe({
      next: (response: any) => {
        let decodedToken = this.jwtDecoder.decodeToken(response.token);
        this.authService.setUserData(decodedToken);
        this.authService.setToken(response.token);
        this.authService.setRefreshToken(response.refreshToken);

        const role = decodedToken.roles[0];
        this.showCorrectSceneAfterLogin(role);

      },
      error: (error: any) => {
        this.error = error.error.message;
      }
    });
  }

  private showCorrectSceneAfterLogin(role: Role) {
    switch (role) {
      case (Role.ROLE_ADMIN):
        console.log("You are a admin");
        this.router.navigate(['/admin']);
        break;
      case (Role.ROLE_STUDENT):
        console.log("You are a student");
        break;
      case (Role.ROLE_PARENT):
        console.log("You are a parent");
        break;
      case (Role.ROLE_TEACHER):
        console.log("You are a teacher");
        break;

    }
  }

  receiveLogoutMessage($event: any) {
    console.log($event);
    this.logoutMessage = $event.message;
  }

}
