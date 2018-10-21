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

    if(title !='' && title != null){searchQuery+=title;}
    if(author !='' && author != null){searchQuery+='+inauthor:'+author;}
    if(isbn !='' && isbn != null){searchQuery+='+isbn:'+isbn;}

    console.log('https://www.googleapis.com/books/v1/volumes?q='+searchQuery+'&key='+this.apikey);

    return new Promise(resolve => {
      this.http.get('https://www.googleapis.com/books/v1/volumes?q='+searchQuery+'&key='+this.apikey).map(res => res.json()).subscribe(data => {
        if(data.totalItems != 0){
          console.log(data);
          resolve({title: data.items[0].volumeInfo.title,
            author: data.items[0].volumeInfo.authors[0],
            description: data.items[0].volumeInfo.description
          });
        } else {
          console.log(data);
          // add prompt to state no data found
        }
      });
    });

  }

}
