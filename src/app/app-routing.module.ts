import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { AuthorizationComponent } from './auth/authorization/authorization.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent},
  { path: '', component: AuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
