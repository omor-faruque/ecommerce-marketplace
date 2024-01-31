import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  submitOrder(order:Order):Observable<Order> {
    return this.http.post<Order>("http://localhost:8080/api/orders",order)
  }
}
