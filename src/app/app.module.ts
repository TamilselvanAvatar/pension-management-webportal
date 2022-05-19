import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { PensionAllService } from './pension-all-service.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginDetailComponent } from './login-detail/login-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PensionComponent } from './pension/pension.component';
import { CalculationComponent } from './pension/calculation/calculation.component';
import { PensionerFormComponent } from './pension/pensioner-form/pensioner-form.component';
import { GlobalComponent } from './global.component';
import { DeletePensionerComponent } from './pension/delete-pensioner/delete-pensioner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginDetailComponent,
    PensionComponent,
    CalculationComponent,
    PensionerFormComponent,
    DeletePensionerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient , PensionAllService],
  bootstrap: [AppComponent]
})
export class AppModule { }
