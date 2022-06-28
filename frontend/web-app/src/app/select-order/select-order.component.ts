import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Order } from '../model/order';
import { OrderService } from '../service/OrderService/order.service';

@Component({
  selector: 'app-select-order',
  templateUrl: './select-order.component.html',
  styleUrls: ['./select-order.component.css']
})
export class SelectOrderComponent implements OnInit {
  orders: Order[] = []
  canSelect: boolean = true
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (res: { body: Order[]; }) => {
        this.orders = res.body
        this.orders.forEach(o => {
          if(o.delivererId === JSON.parse(localStorage.getItem('currentUser') || '{}')?.id){
            if(moment(o.endTime).isAfter(moment()))
              this.canSelect = false;
          }
        })
        this.orders = this.orders.filter(o => o.delivererId === 0)
      }
    })
  }

  getStatus(order: Order){
    if(order.delivererId === 0)
      return "Awaiting deliverer"
    return moment(order.endTime).isAfter(moment.now()) ? "In progress" : "Delivered"
  }

  update(order: Order){
    if(!this.canSelect) return
    order.delivererId = JSON.parse(localStorage.getItem('currentUser') || '{}')?.id,
    order.endTime = moment().add(Math.floor(Math.random() * 3), 'minutes').format()
    console.log(order)
    this.orderService.update(order).subscribe({
      next: res => {
        localStorage.removeItem('order')
        localStorage.setItem("order", JSON.stringify(res.body));
        this.router.navigate([`${JSON.parse(localStorage.getItem('currentUser') || '{}')?.role}/counter`])
      }
    })
  }

}
