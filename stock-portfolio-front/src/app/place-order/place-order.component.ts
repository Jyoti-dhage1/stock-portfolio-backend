import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel, MatSelect, MatOption } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { TradeService } from '../services/trade.service';
import { Trade } from '../models/trade.model';
import { Order } from '../models/order.mode';
import { ReactiveFormsModule } from '@angular/forms';  // Make sure to import this
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar



interface Stock {
  stockTicker: string;
  companyName: string;
}

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [MatFormField, MatLabel, MatSelect, MatOption, CommonModule,
    FormsModule, MatInputModule, MatButtonModule, MatButtonToggleModule,
    MatIconModule, MatCard, ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit {
  orderForm!: FormGroup

  constructor(private fb: FormBuilder, private tradeService: TradeService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      stockTicker: ['', Validators.required],
      volume: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]],
      buyOrSell: ['', Validators.required],
      tradeDate: ['', Validators.required],
      statusCode: ['', Validators.required]
    });
  }

  stocks: Stock[] = [
    { stockTicker: 'AAPL', companyName: 'Apple Inc.' },
    { stockTicker: 'GOOGL', companyName: 'Alphabet Inc.' },
    { stockTicker: 'MSFT', companyName: 'Microsoft Corporation' },
    { stockTicker: 'AMZN', companyName: 'Amazon.com, Inc.' },
    { stockTicker: 'TSLA', companyName: 'Tesla, Inc.' },
    { stockTicker: 'FB', companyName: 'Meta Platforms, Inc.' }
  ]

  form = {
    stockTicker: '',
    volume: 0,
    buyOrSell: 'Buy',
    price: 0,
    tradeDate: new Date().toISOString().split('T')[0]
  }



  get selectedStock() {
    return this.stocks.find(stock => stock.stockTicker === this.form.stockTicker);
  }

  submitOrder() {


   
      const order: Order = {
        stockTicker: this.form.stockTicker,
        volume: this.form.volume,
        buyOrSell: this.form.buyOrSell,
        price: this.form.price,
        tradeDate: new Date().toISOString().split('T')[0], // Use ISO date string
        statusCode: 2
      };

      if(this.form)
      this.tradeService.createTrade(order).subscribe({
        next: (res) => {
          console.log('Trade created:', res)
          this.form = {
            stockTicker: '',
            volume: 0,
            buyOrSell: '',
            price: 0,
            tradeDate: new Date().toISOString().split('T')[0]
          }
          this.snackBar.open('Form Submitted Successfully!', 'Close', {
            duration: 5000,  // Duration of the alert (in milliseconds)
            panelClass: ['success-snackbar']  // Custom class for styling
          });
          this.refreshTradeHistory();
        },
        error: (err) => {console.error('Error:', err)
          this.snackBar.open('Form is invalid. Please fill all required fields.', 'Close', {
            duration: 3000,  // Duration of the alert (in milliseconds)
           panelClass: ['error-snackbar']  // Custom class for styling
          });
        }
      });
    

    

     
      // if (this.selectedStock) {
      //   alert(`Order placed for ${this.selectedStock.companyName} (${this.selectedStock.stockTicker})`);
      // }
    //}
  }

  refreshTradeHistory(){
        this.tradeService.notifyRefresh();
  }

  onChange(event: any) {
    console.log(event.value);
  }

  get formValid(): boolean {
    return this.orderForm.valid;
  }
}