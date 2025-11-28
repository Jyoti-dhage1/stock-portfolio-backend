import { Component, ViewChild, viewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { TradeService } from '../services/trade.service';
import { Trade } from '../models/trade.model';
import { DatePipe } from '@angular/common'; 
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-trade-history',
  imports: [MatTableModule, MatPaginatorModule,CommonModule, MatSortModule,DatePipe,MatIcon,MatButtonModule],
  standalone: true,
  templateUrl: './trade-history.component.html',
  styleUrl: './trade-history.component.css'
})
export class TradeHistoryComponent {

  displayedColumns: string[] = ['id', 'stockTicker', 'volume', 'buyOrSell', 'price', 'tradeDate', 'statusCode'];
  dataSource = new MatTableDataSource<Trade>();
  loading: boolean = true;
  error = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private tradeService: TradeService, private dialog:MatDialog) {}

  getAlltrades(){
    setTimeout(() => {
      this.tradeService.getAllTrades().subscribe({next:(data:Trade[]) => {
        //this.dataSource = new MatTableDataSource(data);
        console.log("DATA",data);
        this.dataSource.data = data;
        if(this.paginator){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.loading = false;
        this.calculateStatusCount(data);
      }, 
      error:()=>{
        this.error = true;
        this.loading = false;
      }});
    },500);
  }

  ngOnInit() {
    this.getAlltrades();
}

calculateStatusCount(trades: Trade[]) {
  const pending = trades.filter(t => t.statusCode === 0).length;
  const filled = trades.filter(t => t.statusCode === 1).length;
  const completed = trades.filter(t => t.statusCode === 2).length;

  // Send data to the service
  this.tradeService.updateCounts(pending, filled, completed);
}
refreshHistory(){
  this.dataSource = new MatTableDataSource<Trade>();
  this.loading = true;
  this.getAlltrades();
}

deleteTrade(id: number) {
  if (confirm("Are you sure you want to delete this trade?")) {
    this.tradeService.deleteTrade(id).subscribe(() => {
      alert("Trade deleted successfully");
      // refresh list
  this.tradeService.notifyRefresh();
    });
  }
}



}
