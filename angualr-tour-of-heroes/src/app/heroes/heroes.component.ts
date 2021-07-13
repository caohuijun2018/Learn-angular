import { Component, OnInit } from '@angular/core';
import {Hero} from '../Hero'
// import  {HEROES} from '../mock-heroes'
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
 // hero = 'Windstorm'


 heroes : Hero[] = [];
 hero  : Hero  = {
   id : 1,
   name : 'Windstrom'
 }


selectedHero ?: Hero;
onSelect(hero : Hero) : void {
  this.selectedHero = hero
}

  // constructor() { } 
  constructor(private heroService : HeroService, private messageService : MessageService) {} //注入点

  getHeroes() :void {
    // this.heroes = this.heroService.getHeroes(); //从服务器中获取数据
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)//改用异步的方法
  }
  ngOnInit(): void {
    this.getHeroes()
  }

  
}
