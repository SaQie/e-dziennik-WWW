import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { AuthGuard } from './auth/authorization/guard/auth.guard';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';
import { SchoolManagementComponent } from './modules/admin/school/school-management/school-management.component';
import { CreateSchoolComponent } from './modules/admin/school/school-management/options/school-management-options/create-school/create-school/create-school.component';
import { SchoolManagementTableComponent } from './modules/admin/school/school-management/table/school-management-table/school-management-table.component';
import { ShowSchoolComponent } from './modules/admin/school/school-management/options/school-management-options/show-school/show-school/show-school.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'ROLE_ADMIN', },
    children: [
      {
        path: 'school-management', component: SchoolManagementComponent,
        children: [
          {
            path: '', component: SchoolManagementTableComponent
          },
          {
            path: 'create-school', component: CreateSchoolComponent,
          },
          {
            path: 'show-school', component: ShowSchoolComponent,
          }
        ]
      }
    ]
  },
  { path: '', component: AuthorizationComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
