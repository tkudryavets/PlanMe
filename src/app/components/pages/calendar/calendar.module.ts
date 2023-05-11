import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Routes, RouterModule } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { AuthState } from "src/app/util/guards/auth/auth.state";
import { CalendarComponentsModule } from "../../shared/calendar/calendar-components.module";
import { CalendarRoutingModule } from "./calendar-routing.module";
import { CalendarComponent } from "./calendar.component";


@NgModule({
	declarations: [CalendarComponent],
	exports: [CalendarComponent],
	imports: [
		CommonModule,
    	FormsModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatDialogModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatInputModule,
   		MatButtonModule,
		MatIconModule,
		CalendarRoutingModule,
		CalendarComponentsModule,
		
	//	NgxsModule.forRoot([AppState]), NgxsLoggerPluginModule.forRoot(), NgxsReduxDevtoolsPluginModule.forRoot()
  
	]
})
export class CalendarModule {}