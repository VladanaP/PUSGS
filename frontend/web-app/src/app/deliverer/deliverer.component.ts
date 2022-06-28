import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/UserService/user.service';

@Component({
  selector: 'app-deliverer',
  templateUrl: './deliverer.component.html',
  styleUrls: ['./deliverer.component.css']
})
export class DelivererComponent implements OnInit {

  user: any = {}

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getById(JSON.parse(localStorage.getItem('currentUser') || '{}')?.id).subscribe({
      next: res => {
        this.user = res.body
      }
    })
  }
}
