import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Article } from '../model/article';
import { Order } from '../model/order';
import { ArticleService } from '../service/ArticleService/article.service';
import { OrderService } from '../service/OrderService/order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  articles: any = []
  cartItems: Article[] = []
  comment: string = ''
  address: string = ''
  totalPrice: number = 0
  constructor(private articleService : ArticleService, private orderService : OrderService, private router: Router) { }

  ngOnInit(): void {
    this.articleService.getAll().subscribe({
      next: res => {
        this.articles = res.body
        this.articles = this.articles.map((obj: any) => ({...obj, amount: 1 }))
      }
    })
  }

  addToCart(item: any){
    const article = {
      id: item.id,
      name: item.name,
      price: item.price * item.amount,
      ingredients: item.ingredients
    }
    this.cartItems.push(article)
  }

  removeFromCart(item: Article){
    this.cartItems = this.cartItems.filter(a => a.id !== item.id)
  }

  createOrder(){
    this.cartItems.forEach(a => { this.totalPrice += a.price })
    const order: Order = {
      id: undefined,
      address: this.address,
      comment: this.comment,
      price: this.totalPrice + 150,
      customerId: JSON.parse(localStorage.getItem('currentUser') || '{}')?.id,
      delivererId: 0,
      startTime: moment().format(),
      endTime: moment().format(),
    }
    //order.endTime = moment(order.startTime).add(Math.floor(Math.random() * 10), 'minutes').format()

    this.orderService.save(order).subscribe({
      next: res => {
        console.log(res.body)
        localStorage.removeItem('order')
        localStorage.setItem("order", JSON.stringify(res.body));
        this.router.navigate([`${JSON.parse(localStorage.getItem('currentUser') || '{}')?.role}/counter`])
      }
    })
  }

}
