import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Questions } from '../questions';
import { ApiService } from '../api.service';
import { map, filter, tap, flatMap, mergeMap, reduce, groupBy, toArray } from 'rxjs/operators';
 import { FilterArrayPipe } from './filter.pipe';
import { Observable, from, of, forkJoin } from 'rxjs';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  
})


export class FiltersComponent implements OnInit {
  _questions: any[];
  _filters: any[];
  counter: number = 0;
  constructor(private apiService: ApiService) {
  }

  getQuestions(): Observable<any> {
    return this.apiService.getQuestions().
      pipe(tap(
        resultArray => {
          this._questions = resultArray;
        },
        error => console.log("Error :: " + error)
      ))
  }


  
  
  BindData(question): void{
    let _newArray : any[] = [];
    question.Survey.forEach(item => {
         //Select One
         if(item.TestSpecificType == "Select (Radio Button)"){
          _newArray.push({
                  question : item.DQuestionName,
                  text: item.DQuestionText,
                  type: item.TestSpecificType,
                  rows : item.DOptions.map((p,index)=>{
                    return {text:p,checked:true, fields: item.DValues[index], column: item.DFields[0]}
                  
                })
                });  
       }
    });

  this._filters = _newArray
  // this.apiService.getFilters(this._filters);
  this.apiService.dataArray.next(this._filters);
  this.counter = this.UpdateCounter(this._filters);
  }

  UpdateData(){
    console.log(this._filters)
    //send the binded data to the service
    this.apiService.dataArray.next(this._filters);
  this.counter = this.UpdateCounter(this._filters);
  }



  UpdateCounter(object): number{
    //count all question that has option checked
    const checkedCtr = object.map(function(q){
        return (q.rows.some(item => item.checked === true)) ? 1 : 0; 
      }, [])
      .reduce(function(prev,curr){
        return prev + curr;
      },0);
   
    
    return checkedCtr;
    //count all options that has checked
    // const checkedCtr = object.reduce(function(prev, curr){
    //   return (curr.rows) ? prev.concat(curr.rows) : prev; 
    // }, [])
    // .map(function(q){
  
    //    return (q.checked) ? 1 : 0;
    // })
    // .reduce(function(prev,curr){
    //    return prev + curr;
    // }, 0);
    // return checkedCtr;
  }
  ngOnInit(): void {
    this.getQuestions()
          .subscribe(() => {
            this.BindData(this._questions);
          });
      }
}

