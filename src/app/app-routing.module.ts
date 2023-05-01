import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRefConst } from './util/const/page-ref.const';
import { CheckAuth } from './util/guards/auth/auth.guard';

const routes: Routes = [
  {
		path: PageRefConst.LOGIN.name,
		loadChildren: () => import('../app/components/pages/login/login.module').then(m => m.LoginModule)
    // canActivate: [CheckAuth]
	},
  {
    path: PageRefConst.DASHBOARD.name,
    loadChildren: () => import('../app/components/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    //canActivate: [CheckAuth]
  },
  {
    path: PageRefConst.CALENDAR.name,
    loadChildren: () => import('src/app/components/pages/calendar/calendar.module').then(m => m.CalendarModule),
    //canActivate: [CheckAuth]
  },
  {
    path: PageRefConst.STATISTICS.name,
    loadChildren: () => import('src/app/components/pages/statistics/statistics.module').then(m => m.StatisticsModule),
    //canActivate: [CheckAuth]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
