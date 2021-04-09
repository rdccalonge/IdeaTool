import { Injectable } from '@angular/core';
import {Http,Response} from "@angular/http";

import { BehaviorSubject, Observable, from, of, forkJoin } from 'rxjs';
import {Questions} from "./questions";

import { tap, map, catchError,toArray } from 'rxjs/operators';
import { EventEmitter } from 'events';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private postsURL ="https://jsonplaceholder.typicode.com/posts";

  public dataArray = new BehaviorSubject<any[]>([]);
  public data$: Observable<any[]> = this.dataArray.asObservable();

  _finalArray: any[];
  _questionsArray: any[];
  _dataArray: any[] = [];


  constructor(private http: Http ) {}

  // question: Questions[];



 getQuestions(): Observable<any>{
   const $question = '../assets/samplequestion.json';
  //  const $question = 'https://localhost:44307/api/Studies/122';
   //For WebService Questions
  return this.http
  .get($question).pipe(
    map(response => {
      // this._questionsArray = response.json();
      return response.json();
    }),catchError(this.handleError));
    
  }

  getData(): Observable<any>{
    //For WebService Data
   return this.http
   .get('../assets/sampledata.json').pipe(
     map(response => {
      //  this._dataArray = response.json();
       return response.json();
     }),catchError(this.handleError));
 
   }
 
//  getFilters(object){
//   this._dataArray.length = 0;
//   this._dataArray.push(object);
// }

setFilters(object){
  this.dataArray.next(object);
}

 
 private handleError(error: Response) {
   return Observable.throw(error.statusText);
 }

}
