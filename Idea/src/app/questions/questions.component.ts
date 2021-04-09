import { Component, OnInit, } from '@angular/core';
import { Questions } from '../questions';
import { ApiService } from '../api.service';
import { map, filter, tap, flatMap, mergeMap, reduce, groupBy, toArray } from 'rxjs/operators';
import { Observable, from, of, forkJoin, Subscription } from 'rxjs';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  private sub: Subscription;

  _questions: any[] = [];
  _data: any[];
  _hits: any[];
  _finalArray: any[];
  constructor(private apiService: ApiService) {
    // this._questions = this.apiService._dataArray

  }


  getData(): Observable<any> {
    return this.apiService.getData().
      pipe(tap(
        resultArray => {
          this._data = resultArray;
          // console.log(this._dataArray);
        },
        error => console.log("Error :: " + error)
      ));
  }


  GetHits(questionArr, dataArr): void {


    // const data = [
    //              {Name: "foo", X1: "1", X2: "1", Other: "Test1"},
    //              {Name: "bar", X1: "2",X2: "2",Other: "Test2"},
    //              {Name: "test",X1: "2",X2: "3",Other: "Test3"}
    // ];
    // const questions = [{rows: {text: "Text 1", checked: true,fields: "1",column: "SelOneRad"}
    // }, {rows: {text: "Text 2", checked: true,fields: "2",column: "X1"}
    // }, {rows: {text: "Text 3", checked: false,fields: "1",column: "X2"}
    // }, {rows: {text: "Text 4", checked: false,fields: "2",column: "X2"}
    // }, {rows: {text: "Text 5", checked: false,fields: "3",column: "X2"}
    // }];

    //console.log(dataArr.datafile)
    //const res = dataArr.datafile.filter((item) => questions.some((question) => question.rows.some((row) => (row.checked === true && item[row.column] === row.fields))));
    const filteredData = dataArr.datafile.filter((item) => questionArr.every((question) => question.rows.some((row) => (row.checked === true && item[row.column] === row.fields))));
    // console.log(filteredData)

    from(filteredData).pipe(
      map(obj => Object.keys(obj).map(k => { return { key: k, val: obj[k] } })),
      flatMap(kvPairArray => from(kvPairArray)),
      groupBy(kvPair => kvPair.key),
      mergeMap(group => group.pipe(
        filter(groupEntry => groupEntry.val !== null && groupEntry.val !== 0 && groupEntry.val !== ""),
        toArray(),
        flatMap(groupArray => {
          return from(groupArray).pipe(
            groupBy(groupArrayEntry => groupArrayEntry.val),
            mergeMap((groupArrayGroup, index) => groupArrayGroup.pipe(
              toArray(),
              map(count => {
                return {
                  question: group.key,
                  value: count[0].val,
                  count: count.length,
                  total: groupArray.length,
                };
              })
            )),
          )
        })
      )),
      toArray()
    ).subscribe(result => this._hits = result);


    let _newArray: any[] = [];
    questionArr.forEach(item => {

      //Select One
      if (item.type == "Select (Radio Button)") {
        //Sort Array 
        var temp = 0;
        var rank = 1;

        const sortedArray = this._hits.filter(x => x.question === item.question).sort((a, b) => a.value - b.value).sort((a, b) => b.count - a.count).map((sort) => {

          //  let check:boolean = false;
          if (sort.count < temp) { rank++ }

          temp = sort.count; //1
          // rank++;
          return {
            question: sort.question,
            rank: rank,
            count: sort.count,
            value: sort.value,
          }
        });;

        _newArray.push({
          question: item.question,
          text: item.text,
          type: item.type,
          rows: item.rows,
          headers: ["responses", "%", "Rank"],
          responses: item.rows.map((option: any) => { // response
            const target = this._hits.find(x => x.question === item.question && option.fields == x.value);
            return {
              [option.fields]: target ? target.count : 0
            }
          }),
          percentage: item.rows.map((option: any) => { // percent
            const target = this._hits.find(x => x.question === item.question && option.fields == x.value);
            return {
              [option.fields]: (target ? Math.round(target.count / target.total * 100) : 0) + '%'
            }
          }),
          rank: item.rows.map((option: any) => { // rank
            const target = sortedArray.find(x => x.question === item.question && option.fields == x.value);
            return {
              [option.fields]: target ? target.rank : 0
            }
          }),
          total: item.rows.map((option: any) => { // total
            const target = this._hits.find(x => x.question === item.question && option.fields == x.value);
            return {
              sum: target ? target.count : 0
            }
          }).reduce(function (prev, curr) {
            return prev + curr.sum;
          }, 0),
          totalpercentage: item.rows.map((option: any) => { // percent
            const target = this._hits.find(x => x.question === item.question && option.fields == x.value);
            return {
              sumpercent: (target ? Math.round(target.count / target.total * 100) : 0)
            }
          }).reduce(function (prev, curr) {
            return prev + curr.sumpercent;
          }, 0)
        });
      }
    });
    this._finalArray = _newArray;
  
  }


  ngOnInit(): void {
    //  this._questions  = this.apiService._dataArray

    this.sub = this.apiService.data$.subscribe((object) => {
      this._questions = object;
      this.getData().subscribe(() => {
        //  console.log(this._data)
        //console.log(this._questions)
        this.GetHits(this._questions, this._data);

      })
    });

    //  this.getData().subscribe(() => {
    //   this.GetHits(this._questions, this._data);
    //  })



  }


}


