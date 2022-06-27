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
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (res: { body: Order[]; }) => {
        this.orders = res.body
        console.log(this.orders)
      }
    })
  }

  getStatus(order: Order){
    if(order.delivererId === 0)
      return "Awaiting deliverer"
    return moment(order.endTime).isAfter(moment.now()) ? "In progress" : "Delivered"
  }

}
