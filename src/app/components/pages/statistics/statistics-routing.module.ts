import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/util/guards/auth/auth.state';
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
