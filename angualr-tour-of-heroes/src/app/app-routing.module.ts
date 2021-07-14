import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; //导入RouterModule和Routes以便应用具有路由功能
import { HeroesComponent } from './heroes/heroes.component'; //告知路由需要取得地方
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
const routes: Routes = [
  {path : 'heroes',component:HeroesComponent}, //path用来匹配浏览器地址栏中的URL字符串，component：导航到该路由时，路由器应该创建的组件
  {path : 'dashboard',component:DashboardComponent},//指向DashboardComponent的路由
  {path: '',redirectTo:'/dashboard',pathMatch:'full'},
  {path: 'details/:id',component:HeroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
