import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../model/login';
import { AuthService } from '../service/AuthService/auth.service';

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

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }
  

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: res => {
        //this.response = res.body
        
        if(this.response){
        //  localStorage.setItem("jwt", this.response.token)
          // localStorage.setItem("currentUser", {
          //   username: this.response.username
          // })
        }
        this.router.navigate(['home']);
      }, error: e => alert("Invalid username or password") 
    });
  }

}
