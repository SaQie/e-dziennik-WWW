import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { AuthorizationComponent } from './auth/authorization/authorization.component';
import { AuthGuard } from './auth/authorization/guard/auth.guard';
import { ForbiddenComponent } from './auth/forbidden/forbidden.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: '', component: AuthorizationComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
