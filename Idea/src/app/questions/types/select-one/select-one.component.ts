import { Component, OnInit , Input} from '@angular/core';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-select-one',
  templateUrl: './select-one.component.html',
  styleUrls: ['./select-one.component.scss']
})
export class SelectOneComponent implements OnInit {
  @Input() questionText:string;
  @Input() questionRows:any[];
  @Input() questionHeader:any[];
  @Input() response:any[];
  @Input() percentage:any[];
  @Input() rank:any[];
  @Input() total:any[];
  @Input() totalpercentage:any[];
  @Input() test: any[];
  public ChartLabels:string[];
  public ChartData:number[];
  public ChartType:string = '';

  constructor() { }
  
 // events
 public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

GetChartType(size): string{

  switch (true)
  {
      case (size > 6):
          return "horizontalBar";
         
      case (size == 4 || size == 5):
          return "bar";
        
      case (size < 4):
          return "pie";
        
      default:
          return "doughnut";
   
  }
}

  ngOnInit() {
   
      this.ChartLabels = this.questionRows.reduce(function(prev, curr){
        return (curr.text) ? prev.concat(curr.text): prev;
      },[]);
      
      this.ChartData = [].concat(...this.response.map(Object.values));
      
      this.ChartType = this.GetChartType(this.ChartData.length);

     
      // const test = Object.values(this.response).map(function(val) {
      //   return ;
      // },[])
      // const test = this.response.reduce(function(prev, curr){
      //  console.log(curr)
      //   return (curr) ? prev.concat(curr): prev;
      // },[]);

      // const test = this.response.map((obj, i) => {
      //   return obj[i];
      // },[]);
       //this.doughnutChartData = test;
     
  }

}
