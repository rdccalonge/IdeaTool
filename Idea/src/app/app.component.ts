import { Component , OnInit, Pipe } from '@angular/core';
import { Observable, from, of, forkJoin } from 'rxjs';

import { map, filter, tap, flatMap, mergeMap, reduce, groupBy, toArray } from 'rxjs/operators';
import { Questions } from './questions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    
})
export class AppComponent implements OnInit{
  _questionsArray: any[];
  _dataArray: any[];
  _filtersArray: any[];
  _finalArr: any[];
  public result: any;
  constructor() {
    
  }





  // getFinalData(): Observable<any> {
  //   return this.apiService.getJson().
  //     pipe(tap(
  //       resultArray => {
  //         this._dataArray = resultArray;
  //         // console.log(this._dataArray);
  //       },
  //       error => console.log("Error :: " + error)
  //     ));
  // }


  ngOnInit(): void{

    // forkJoin(this.getQuestions(), this.getData())
    //   .subscribe(() => {
    //     this.GetQuestion(this._questionsArray, this._dataArray);
    //     //this.countData(this._dataArray);
    //   });

     
  }
}




