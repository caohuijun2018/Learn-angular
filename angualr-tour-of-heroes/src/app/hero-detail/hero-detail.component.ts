import { Component, OnInit ,Input} from '@angular/core';
import { Hero } from '../Hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero ?: Hero;
  constructor(
    private route: ActivatedRoute, //保存HeroDetialComponent实例的路由信息
    private heroService:  HeroService,//获取想要显示的英雄
    private location : Location //Angular服务器
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

    getHero() : void {
      const id = Number(this.route.snapshot.paramMap.get('id')!);
      console.log(id)
      this.heroService.getHero(id).subscribe(hero => (this.hero = hero))
      // const id = Number(this.route.snapshot.paramMap.get('id'));
      // console.log(id)
      // this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    }
    goBack() :void {
      this.location.back()
    }
    save() :void {
      if(this.hero) {
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack())//this.hero会传入修改的值，通过updataHero方法来保存对名字的修改，然后导航到前一个视图
      }
    }
}
