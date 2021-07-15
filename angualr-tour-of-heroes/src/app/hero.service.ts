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
   
  updateHero(hero : Hero) : Observable<any> {
    return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }
  addHero(hero : Hero):Observable<any> {//添加新的hero
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap((newHero:Hero) => this.log(`added hero w/ id = ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }
  deleteHero(id : Number):Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url,this.httpOptions).pipe(
      tap(_ => this.log(`delete hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeroes(term : string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name = ${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`):
        this.log(`no heroes matching "${term}"`),
        catchError(this.handleError<Hero[]>('searchHeroes',[]))
        )
    )
  }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
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
