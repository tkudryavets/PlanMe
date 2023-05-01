import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "src/app/util/guards/auth/auth.state";
import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarComponent } from "./calendar.component";


@NgModule({
	declarations: [CalendarComponent],
	exports: [CalendarComponent],
	imports: [
		CommonModule,
		CalendarRoutingModule
	]
})
export class CalendarModule {}