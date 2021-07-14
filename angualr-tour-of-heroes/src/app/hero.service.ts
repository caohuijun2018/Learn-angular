import { Injectable } from '@angular/core';
import { Hero } from './Hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService : MessageService , private http : HttpClient) { }  //服务中的服务

  // getHeroes(): Observable<Hero[]> {
  //   const heroes  = of(HEROES) //of(HEROES)会返回一个Observable<Hero[]>
  //   this.messageService.add('HeroService : fetched heroes')
  //   return heroes;
  // }
  
  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes',[]))
    )
  }
 
  // getHero(id : number) : Observable<Hero> {
  //   const hero = HEROES.find(h => h.id === id)!;
  //   this.messageService.add(`Heroseverce:fetched hero id=${id}`)
  //   return of(hero)
  // }
  getHero(id : number) : Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched heroe id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    )
  }
   
  private heroesUrl = 'api/heroes';  // URL to web api
  private log(message :string) {
    this.messageService.add(`HeroService: ${message}`)
  }
  private handleError<T>(operators = 'operation',result ?: T) {
    return (error:any) : Observable<T> => {
      console.log(error);
      this.log(`${operators} failed : ${error.message}`);
      return of(result as T)
    }
  }
}
