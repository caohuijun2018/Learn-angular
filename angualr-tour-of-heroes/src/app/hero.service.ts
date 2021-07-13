import { Injectable } from '@angular/core';
import { Hero } from './Hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService : MessageService) { }  //服务中的服务

  getHeroes(): Observable<Hero[]> {
    const heroes  = of(HEROES) //of(HEROES)会返回一个Observable<Hero[]>
    this.messageService.add('HeroService : fetched heroes')
    return heroes;
  }
  
}
