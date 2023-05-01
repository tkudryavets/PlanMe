import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/util/guards/auth/auth.state';
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
