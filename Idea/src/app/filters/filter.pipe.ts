import { Pipe } from '@angular/core';

@Pipe({name: 'filter'})

export class FilterArrayPipe{
    transform(value, args){
        if(!args[0]){
            return value;
        }
        else if(value){
            return value.fitler(item => {
                for(let key in item){

                    return key;
                }
            })
        }
    }
}