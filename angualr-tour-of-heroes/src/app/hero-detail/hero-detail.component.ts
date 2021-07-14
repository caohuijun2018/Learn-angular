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
      
      const id = Number(this.route.snapshot.paramMap.get('id'));
      console.log(id)
      this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    }
    goBack() :void {
      this.location.back()
    }
}
