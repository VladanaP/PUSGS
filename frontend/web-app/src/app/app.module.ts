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
import { AdminComponent } from './admin/admin.component';
import { DelivererComponent } from './deliverer/deliverer.component';
import { VerificationComponent } from './verification/verification.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    CustomerComponent,
    ProfileComponent,
    AdminComponent,
    DelivererComponent,
    VerificationComponent,
    AddArticleComponent,
    OrdersComponent,
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
          },
        ]
      },
      { path: 'Deliverer', component: DelivererComponent, canActivate: [PatientGuard], 
        children: [
          {
            path: 'profile', component: ProfileComponent, canActivate: [PatientGuard]
          }
        ]
      },
      { path: 'Admin', component: AdminComponent, canActivate: [PatientGuard],
        children: [
          {
            path: 'profile', component: ProfileComponent, canActivate: [PatientGuard]
          },
          {
            path: 'verification', component: VerificationComponent, canActivate: [PatientGuard]
          },
          {
            path: 'article', component: AddArticleComponent, canActivate: [PatientGuard]
          },
          {
            path: 'orders', component: OrdersComponent, canActivate: [PatientGuard]
          },
        ]
      },
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
