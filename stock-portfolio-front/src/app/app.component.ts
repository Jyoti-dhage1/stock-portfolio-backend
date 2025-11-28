import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlaceOrderComponent } from "./place-order/place-order.component";
import { TradeHistoryComponent } from "./trade-history/trade-history.component";
import { TradeStatusChartComponent } from "./trade-status-chart/trade-status-chart.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [PlaceOrderComponent, TradeHistoryComponent, TradeStatusChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolioApp';
}
