import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { RegisterService } from '../service/RegisterService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  name: string = '';
  surname: string = '';
  address: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  type: number = 0
  dateOfBirth: Date = new Date
  image: string = ''


  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  register(){
    if(this.password !== this.confirmPassword) return
    let user = {
      username: this.username,
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      dateOfBirth: this.dateOfBirth,
      address: this.address,
      role: this.type,
      image: this.image,
      approved: this.type === 0 ? true : false,
      status: this.type === 0 ? 1 : 0
    }
    this.registerService.register(user).subscribe({
      next: res => {
        if(res.body === null)
          alert("Email taken")
        else
          this.router.navigate(['landing']);
      }, error: e => alert("Error")
    })
  }

  handleFileSelect(e: any){
    const file = e.target.files[0];
    if (!file) {
        return
    }
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this)
    reader.readAsBinaryString(file)
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
      this.image='data:image/png;base64,' + btoa(binaryString);
      console.log(this.image);
   }

  back(){
    this.router.navigate(['landing']);
  }

}
