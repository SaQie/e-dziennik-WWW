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
import { CreateSchoolComponent } from './modules/admin/school/school-management/options/school-management-options/create-school/create-school/create-school.component';
import { SchoolManagementTableComponent } from './modules/admin/school/school-management/table/school-management-table/school-management-table.component';
import { MatSelectModule } from '@angular/material/select';
import { ShowSchoolComponent } from './modules/admin/school/school-management/options/school-management-options/show-school/show-school/show-school.component';
import { SchoolClassManagementComponent } from './modules/admin/admin/school-class/school-class-management/school-class-management.component';
import { SchoolClassManagementOptionsComponent } from './modules/admin/admin/school-class/school-class-management/options/school-class-management-options/school-class-management-options.component';
import { SchoolClassManagementTableComponent } from './modules/admin/admin/school-class/school-class-management/table/school-class-management-table/school-class-management-table.component';
import { ChatComponent } from './modules/chat/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ChattingComponent } from './modules/chat/chatting/chatting.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScriptComponent } from './modules/script/script.component';

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
    SuccessOperationComponent,
    CreateSchoolComponent,
    SchoolManagementTableComponent,
    ShowSchoolComponent,
    SchoolClassManagementComponent,
    SchoolClassManagementOptionsComponent,
    SchoolClassManagementTableComponent,
    ChatComponent,
    ChattingComponent,
    ScriptComponent
  ],
  imports: [
    MatProgressBarModule,
    FormsModule,
    MatSelectModule,
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
