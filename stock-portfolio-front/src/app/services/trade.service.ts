import { Injectable } from '@angular/core';
import { Trade } from '../models/trade.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Order } from '../models/order.mode';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(private http: HttpClient) {
  }

  private statusCountSource = new BehaviorSubject({ pending: 0, filled: 0, completed: 0 });
  statusCount$ = this.statusCountSource.asObservable();
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  //baseUrl = 'assets/data/trades.json';
  baseUrl = 'http://172.30.0.49:8080/api/stocks';

  getAllTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(this.baseUrl);
  }

   // POST API
   createTrade(order: Order): Observable<Trade> {
    return this.http.post<Trade>(`${this.baseUrl}/placeOrder`, order);
  }


  updateCounts(pending: number, filled: number, completed: number) {
    this.statusCountSource.next({ pending, filled, completed });
  }

  notifyRefresh() {
    this.refreshSubject.next();
  }

  deleteTrade(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
