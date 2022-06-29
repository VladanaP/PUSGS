import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../model/login';
import { User } from '../model/user';
import { AuthService } from '../service/AuthService/auth.service';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  email: string = '';
  password: string = '';
  token: string | undefined = '';
  response: Login | null = {
    id: 0,
    username: '',
    role: '',
    token: '',
    name: null,
    surnameName: null
  }
  user: User = JSON.parse(localStorage.getItem('currentUser') || '{}')
  socialUser: SocialUser = {
    provider: '',
    id: '',
    email: '',
    name: '',
    photoUrl: '',
    firstName: '',
    lastName: '',
    authToken: '',
    idToken: '',
    authorizationCode: '',
    response: undefined
  };
  loggedIn: boolean = false;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private authSocialService: SocialAuthService) { }
  

  ngOnInit(): void {
    this.authSocialService.authState.subscribe((socialUser) => {
      this.socialUser = socialUser;
      this.loggedIn = (socialUser != null);
    });
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        
      }, error: e => alert("Invalid username or password") 
    });
  }

  register(){
    this.router.navigate(['register']);
  }

}
