import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Order } from '../model/order';
import { OrderService } from '../service/OrderService/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = []
  user: any = JSON.parse(localStorage.getItem('currentUser') || '{}')
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (res: { body: Order[]; }) => {
        this.orders = res.body
        if(this.user.role === "Customer")
          this.orders = this.orders.filter(o => moment(o.endTime).isBefore(moment.now()) && o.customerId === this.user.id)
        if(this.user.role === "Deliverer")
          this.orders = this.orders.filter(o => moment(o.endTime).isBefore(moment.now()) && o.delivererId === this.user.id)
      }
    })
  }

  getStatus(order: Order){
    if(order.delivererId === 0)
      return "Awaiting deliverer"
    return moment(order.endTime).isAfter(moment.now()) ? "In progress" : "Delivered"
  }

}
