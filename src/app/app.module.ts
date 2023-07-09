import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { AdminHeaderComponent } from './modules/admin/admin-header/admin-header.component';
import { AuthGuard } from './auth/authorization/guard/auth.guard';
import { AuthInterceptor } from './auth/authorization/auth.interceptor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SchoolManagementComponent } from './modules/admin/school/school-management/school-management.component';
import { SchoolManagementOptionsComponent } from './modules/admin/school/school-management/options/school-management-options/school-management-options.component';
import { DeleteSchoolComponent } from './modules/admin/school/school-management/options/school-management-options/delete-school/delete-school/delete-school.component';
import { ErrorDialogComponent } from './common/error/error-dialog/error-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SuccessOperationComponent } from './common/success/success-operation/success-operation.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    ForbiddenComponent,
    AdminComponent,
    AdminHeaderComponent,
    SchoolManagementComponent,
    SchoolManagementOptionsComponent,
    DeleteSchoolComponent,
    ErrorDialogComponent,
    SuccessOperationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        }
      }
    })

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
