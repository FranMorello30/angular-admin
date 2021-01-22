import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

    @Input() labes : Label[]
    @Input() valores : MultiDataSet;
    @Input() colores : Color[];
    @Input() titulo : string = 'Sin titulo' ;

   
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
 
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public colors:Color[] = [
    {backgroundColor:['#9E120E','#FF5800','#FFB414']}
  ]

  constructor() { }

  ngOnInit(): void {
    this.doughnutChartLabels = this.labes
    this.doughnutChartData = this.valores
    this.colors = this.colores
    //this.titulo = this.Tit
  }

}
