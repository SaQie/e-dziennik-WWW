import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/auth/services/authorization.service';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  constructor(private dialog: MatDialog) {

  }

  logoutButtonClick() {
    this.dialog.open(LogoutConfirmationDialog, { disableClose: true });
  }
}

@Component({
  selector: 'logout-confirmation-dialog',
  templateUrl: 'logout-confirmation-dialog.html',
  styleUrls: ['./admin-header.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class LogoutConfirmationDialog {


  constructor(private dialogRef: MatDialogRef<LogoutConfirmationDialog>,
    private authService: AuthorizationService,
    private router: Router) {

  }

  onLogoutButton() {
    this.authService.logout().subscribe({
      next: () => {
        this.dialogRef.close();
        this.authService.clear();
        const navigationExtras: NavigationExtras = {
          state: {
            logoutMessage: 'Successfully log out'
          }
        };
        this.router.navigate([''], navigationExtras);
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

}
