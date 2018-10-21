import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BookServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BookServiceProvider {

  apikey: String = 'AIzaSyDAJp2P5ezPoWy3TID19KxsOiHcAj4UZqI';

  constructor(public http: Http) {
    console.log('Hello BookServiceProvider Provider');
  }

  search(title: string, author: string, isbn: string): Promise<{title: string, author: string, description: string}> {
    let searchQuery: String = '';

    if(title !=''){searchQuery+=title;}
    if(author !=''){searchQuery+='+inauthor:'+author;}
    if(isbn !=''){searchQuery+='+isbn:'+isbn;}

    return new Promise(resolve => {
      this.http.get('/api/booksearch'+searchQuery+'&key='+this.apikey).map(res => res.json()).subscribe(data => {
        if(data.status === 'OK'){
          resolve({title: data.item[0].volumeInfo.title,
            author: data.item[0].volumeInfo.authors,
            description: data.item[0].description
          });
        } else {
          console.log(data);
          // add prompt to state no data found
        }
      });
    });

  }

}
