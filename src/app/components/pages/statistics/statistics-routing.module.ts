import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { StatisticsComponent } from './statistics.component';


const routes: Routes = [
	{
		path: '',
		component: StatisticsComponent,
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		// NgxsModule.forFeature([AuthState])
	],
	exports: [RouterModule],
})

export class StatisticsRoutingModule { }
