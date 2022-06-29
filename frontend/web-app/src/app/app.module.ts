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
import { NewOrderComponent } from './new-order/new-order.component';
import { CounterComponent } from './counter/counter.component';
import { SelectOrderComponent } from './select-order/select-order.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';


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
    NewOrderComponent,
    CounterComponent,
    SelectOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'landing', component: LandingComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'Customer', component: CustomerComponent, canActivate: [PatientGuard],
        children: [
          {
            path: 'profile', component: ProfileComponent, canActivate: [PatientGuard]
          },
          {
            path: 'order', component: NewOrderComponent, canActivate: [PatientGuard]
          },
          {
            path: 'counter', component: CounterComponent, canActivate: [PatientGuard]
          },
          {
            path: 'history', component: OrdersComponent, canActivate: [PatientGuard]
          },
        ]
      },
      { path: 'Deliverer', component: DelivererComponent, canActivate: [PatientGuard], 
        children: [
          {
            path: 'profile', component: ProfileComponent, canActivate: [PatientGuard]
          },
          {
            path: 'order', component: SelectOrderComponent, canActivate: [PatientGuard]
          },
          {
            path: 'counter', component: CounterComponent, canActivate: [PatientGuard]
          },
          {
            path: 'history', component: OrdersComponent, canActivate: [PatientGuard]
          },
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
    { provide:  HTTP_INTERCEPTORS,  useClass: TokenInterceptor,  multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
