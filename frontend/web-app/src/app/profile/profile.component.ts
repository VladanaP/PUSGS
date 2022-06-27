import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '../model/user';
import { UserService } from '../service/UserService/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('currentUser') || '{}')
  password: string = ""
  confirmPassword: string = ""
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getById(this.user.id).subscribe({
      next: res => {
        this.user = res.body
      }, error: e => alert("Error")
    })
  }
  update(){
    if(this.password !== this.confirmPassword) return
    this.user.password = this.password
    this.userService.update(this.user).subscribe({
      next: res => {
        console.log("success")
      }, error: e => alert("Error")
    })
  }
  setDate(event : any) {
    this.user.dateOfBirth = moment(new Date(event.target.value)).format()
  }

}
