import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeStatusChartComponent } from './trade-status-chart.component';

describe('TradeStatusChartComponent', () => {
  let component: TradeStatusChartComponent;
  let fixture: ComponentFixture<TradeStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeStatusChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
