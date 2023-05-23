import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		// NgxsModule.forFeature([AuthState])
	],
	exports: [RouterModule],
})

export class DashboardRoutingModule { }
