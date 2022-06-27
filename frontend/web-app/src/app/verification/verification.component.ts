import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../service/UserService/user.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  deliverers: User[] = []
  constructor(private router: Router, private userService: UserService, private _http: HttpClient) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: res => {
        this.deliverers = res.body
        this.deliverers = this.deliverers.filter(d => d.role === "Deliverer")
        console.log(this.deliverers)
      }, error: e => alert("Error")
    })
  }

  approve(user: User) {
    user.approved = true
    user.status = "Approved"
    user.password = ""
    this.userService.update(user).subscribe({
      next: res => {
        console.log("success")
        this.sendEmail(user, 'You have successfully registered. We are happy to have you with us!')
      }, error: e => alert("Error")
    })
  }

  decline(user: User) {
    user.approved = false
    user.status = "Declined"
    user.password = ""
    this.userService.update(user).subscribe({
      next: res => {
        console.log("success")
        this.sendEmail(user, 'Unfortunately your registration is declined.')
      }, error: e => alert("Error")
    })
  }

  sendEmail(user: User, msg: string){
    const email = {
      service_id: 'service_0zr3xqf',
      template_id: 'template_v01tzzv',
      user_id: 'GoukyNyAqww5Qnhk_',
      template_params: {
        'to_name': user.username,
        'to_email': user.email,
        'subject': 'Registration',
        'message': msg
      }
    };
    this._http.post('https://api.emailjs.com/api/v1.0/email/send', email).subscribe({
      next: res => {
        console.log("Poslao")
      }
    });

  }

}
