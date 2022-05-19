import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDetailComponent } from './login-detail/login-detail.component';
import { HomeComponent } from './home/home.component';
import { PensionComponent } from './pension/pension.component';
import { CalculationComponent } from './pension/calculation/calculation.component';
import { PensionerFormComponent } from './pension/pensioner-form/pensioner-form.component';

const routes: Routes = [
  { path: 'login', component: LoginDetailComponent },
  { path: 'register', component: LoginDetailComponent },
  {
    path: 'pension',
    component: PensionComponent,
    children: [
      { path: 'pension-calculation', component: CalculationComponent },
      { path: 'save-pensioner', component: PensionerFormComponent },
    ],
  },
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
