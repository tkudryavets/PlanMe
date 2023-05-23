import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CalendarComponent } from './calendar.component';


const routes: Routes = [
	{
		path: '',
		component: CalendarComponent,
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		// NgxsModule.forFeature([AuthState])
	],
	exports: [RouterModule],
})

export class CalendarRoutingModule { }
