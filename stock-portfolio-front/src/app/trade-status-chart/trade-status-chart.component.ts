import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts'; 
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { TradeService } from '../services/trade.service';

@Component({
  selector: 'app-trade-status-chart',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './trade-status-chart.component.html',
  styleUrl: './trade-status-chart.component.css'
})
export class TradeStatusChartComponent {

  pendingCount = 0;
  filledCount = 0;
  completedCount = 0;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  constructor(private tradeService: TradeService) {}
  
  ngOnInit() {
    this.tradeService.statusCount$.subscribe(counts => {
      this.pendingCount = counts.pending;
      this.filledCount = counts.filled;
      this.completedCount = counts.completed;
      this.chartData.datasets[0].data = [
        this.filledCount,
        this.pendingCount,
        this.completedCount,
      ];
      this.chart?.update();
    });
  }


  chartType: ChartType = 'doughnut';

  chartData: ChartData<'doughnut'> = {
    labels: ['Filled', 'Pending', 'Completed'],
    datasets: [
      {
        data: [0, 0, 0], // Initialize with zeros
        backgroundColor: ['#D20103', '#FFDE59', '#4E8239'],
        hoverBackgroundColor: ['#FF3333', '#3333FF', '#FFFF66'],
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
}

