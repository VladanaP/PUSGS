import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientGuard } from './shared/jwt/jwt-guard';
import { TokenInterceptor } from './shared/jwt/token.interceptor';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    CustomerComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'landing', component: LandingComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'Customer', component: CustomerComponent, canActivate: [PatientGuard],
        children: [
          {
            path: 'profile', component: ProfileComponent, canActivate: [PatientGuard]
          }
        ]
      },
      { path: 'Deliverer', component: LandingComponent, canActivate: [PatientGuard] },
      { path: 'Admin', component: LandingComponent, canActivate: [PatientGuard] },

      //{ path: 'basic-scheduling', component: StepperComponent, canActivate: [PatientGuard] },
      //{ path: 'recommended-scheduling', component: RecommendedAppointmentSchedulingComponent, canActivate: [PatientGuard] },
      { path: '**', redirectTo: 'landing' }
    ]),

  ],
  providers: [
    PatientGuard,
    { provide: 'API_URL', useValue: 'http://localhost:9429/' },
    { provide:  HTTP_INTERCEPTORS,  useClass: TokenInterceptor,  multi: true}
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
