import { Injectable } from "@angular/core";
import { State, Store, Selector, createSelector, Action, StateContext } from "@ngxs/store";
import { BackendApiService } from "../services/backend-api.service";
import { IDay, IEvent } from "../components/interfaces/IDay.interface";
import { AddPlanAction, InitPlansAction, SelectMonthAction, UpdatePlanAction } from "./plans.actions";
import { Events } from "../util/const/events.const";
import { Category } from "../util/enums/categories.enum";
import { REPEAT_PERIOD } from "../util/enums/repeat-period.enum";

export class PlanStateModel {
    selectedDay?: IDay;
    selectedMonth?: Date;
    currentPlan?: IEvent;
    plans?: {none: IEvent[], everyday: IEvent[]};


	constructor(obj?: any) {
		Object.assign(this, obj);
	}
}

@State<PlanStateModel>({
	name: "PlanStateModel"
})
@Injectable()
export class PlansState {
	constructor(
		public backendApiService: BackendApiService,
		public store: Store
	) {
	}

	@Selector()
	static monthPlans(state: PlanStateModel): IDay[] {
		let month: IDay[] = [];
		state.plans!.none.forEach(element => {
			let date = new Date(element.startDate)
			if(state.selectedMonth?.getFullYear() == date.getFullYear() && state.selectedMonth?.getMonth() == date.getMonth()){
				let index = month.findIndex(e => e.date === date.toDateString()); 
				if(index > -1){
					month[index].events?.push(element);
				} else {
					month.push({date: date.toDateString(), events: [element]})
				}
			}
		});
		state.plans!.everyday.forEach(element => {
			let date = new Date(element.startDate)
			let endDate;
			if(element.endDate)
				endDate = new Date(element.endDate)
			else
				endDate = new Date('2222-12-2');
			
			if(state.selectedMonth!.getFullYear() >= date.getFullYear() && state.selectedMonth!.getMonth() >= date.getMonth()
			&& ((state.selectedMonth!.getFullYear() <= endDate.getFullYear() && state.selectedMonth!.getMonth() <= endDate.getMonth()) || (state.selectedMonth!.getFullYear() >= endDate.getFullYear()))
			){
				
			let maxDate = date.getTime() > state.selectedMonth!.getTime() ? date : state.selectedMonth;
			let endmaxDate = endDate.getTime() < new Date(state.selectedMonth!.getFullYear(), state.selectedMonth!.getMonth()+1, state.selectedMonth!.getDate()).getTime() ?
			 date : new Date(state.selectedMonth!.getFullYear(), state.selectedMonth!.getMonth()+1, state.selectedMonth!.getDate());
		
			for( let i = maxDate!; i.getTime() < endmaxDate.getTime();  i = new Date(i.getFullYear(), i.getMonth(), i.getDate() + 1)){
					let index = month.findIndex(e => new Date(e.date).toDateString() === i.toDateString()); 
					if(index > -1){
						month[index].events?.push(element);
					} else {
						month.push({date: i.toDateString(), events: [element]})
					}
				}
			}
		})
		return month ?? [];
	}
    
	@Selector()
	static selectedDay(state: PlanStateModel): IDay|null {
		return state.selectedDay ?? null;
	}

	@Selector()
	static plans(state: PlanStateModel): any {
		return state.plans;
	}

	@Selector()
	static currentPlan(state: PlanStateModel): IEvent|null {
		return state.currentPlan ?? null;
	}


    @Action(AddPlanAction)
    addPlan(plan: IEvent) {
        this.backendApiService.addPlan(plan);
    }

	@Action(UpdatePlanAction)
    updatePlan(ctx: StateContext<PlanStateModel>, {payload}: UpdatePlanAction) {
		let firstSymbol = payload?.event?.id?.toString().charAt(0) ?? '';
		let arrayEvents = ctx.getState()?.plans;
		let index = -1;
		switch (firstSymbol.toString()) {
			case '1':
				index = arrayEvents?.none.findIndex((item) => item.id == payload?.event.id) ?? -1;
				if(payload?.event.repeat != REPEAT_PERIOD.NONE){
					// TODO
				}
				else {
					arrayEvents!.none[index] = payload.event;
				}
				break;
			case '2':
				index = arrayEvents?.everyday.findIndex((item) => item.id == payload?.event.id) ?? -1;
				if(payload?.event.repeat != REPEAT_PERIOD.EVERYDAY){
					// TODO
				}
				else {
					arrayEvents!.everyday[index] = payload.event;
				}
				break;

		}
	
		ctx.patchState({
			...ctx.getState,
			plans: arrayEvents
		})
        // this.backendApiService.updatePlan(plan);
    }

	@Action(SelectMonthAction)
	selectMonth(ctx: StateContext<PlanStateModel>, { payload }: SelectMonthAction) {
		ctx.patchState({
			selectedMonth: payload.date
		})
	}

	@Action(InitPlansAction)
	initPlansAction(ctx: StateContext<PlanStateModel>){
		ctx.patchState({
			plans: Events.events
		})
	}
}
