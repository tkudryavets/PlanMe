import { Component, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill,
  ChartComponent
} from "ng-apexcharts";
import { Category } from 'src/app/util/enums/categories.enum';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
  max: number
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public eventCategories = Object.keys(Category);
  constructor() {
    this.chartOptions = {
      series: [100, 90, 60, 80, 90, 70],
      chart: {
        type: "polarArea"
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8
      },
      labels: this.eventCategories,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
              height: 400,
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      yaxis: {
        max: 100
      },
      title: {
        text: 'Percentage of completed tasks in each category',
        margin: 20,
      }
    };
  }
}
