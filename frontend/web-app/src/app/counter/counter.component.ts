import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Order } from '../model/order';
import { OrderService } from '../service/OrderService/order.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter: any
  now: string = moment().format('LTS')
  order: any = JSON.parse(localStorage.getItem('order') || '{}')
  constructor(private orderService : OrderService, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.orderService.getById(this.order.id).subscribe({
      next: res => {
        this.order = res.body
      }
    })
  }

  formatCounter(){
    if(this.order.delivererId === 0)
      return "Waiting for deliverer"
    if(moment(this.order.endTime).isBefore(moment.now()))
      return "Delivered!"
    setTimeout(this.resetValue, 1000)
    this.counter = Math.floor((moment(this.order.endTime).valueOf() - moment().valueOf()) / 1000)
    let minutes = this.counter /60
    if(minutes > 1){
      return minutes > 1 && minutes < 2 ? `> ${Math.floor(minutes)} minute` : `in ${Math.floor(minutes)} minutes`
    }
    return this.counter
  }

  resetValue() {
    this.counter -= 1
  }

  history(){
    this.router.navigate([`${JSON.parse(localStorage.getItem('currentUser') || '{}')?.role}/history`])
  }
}
