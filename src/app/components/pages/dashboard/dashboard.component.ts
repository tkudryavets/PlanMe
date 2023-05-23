import { Component, ViewChild } from '@angular/core';
import { Category } from 'app/util/enums/categories.enum';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill,
  ChartComponent
} from "ng-apexcharts";

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
  public chartOptions2: Partial<ChartOptions> | any;
  public eventCategories = Object.keys(Category);
  constructor() {

    this.chartOptions = {
      colors: ["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e"],
      series: [100, 90, 60, 80, 90, 70, 50],
      chart: {
        type: "polarArea"
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8,
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

    this.chartOptions2 = {
      series: [
        {
          name: "Completed plans",
          group: "plans",
          data: [15, 8, 11, 12]
        },
        {
          name: "Failed plans",
          group: "plans",
          data: [2, 3, 2, 3]
        },
      ],
      chart: {
        type: "bar",
        height: 320,
        width: 400,
        stacked: true
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        categories: [
          "01.05 - 07.05",
          "08.05 - 14.05",
          "15.05 - 21.05",
          "22.05 - 28.05"
        ]
      },
      fill: {
        opacity: 1
      },
      colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
      legend: {
        position: "top",
        horizontalAlign: "left"
      },
      title: {
        text: 'Amount of completed and skipped tasks in a week in current month',
        margin: 20,
      }
    };
  }
}
