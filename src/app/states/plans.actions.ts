import { IEvent } from "../components/interfaces/IDay.interface";

export class UpdatePlanAction {
	static readonly type = '[Plans] update plan';

	constructor(public payload?: {date: Date, event: IEvent}) {
	}
}

export class AddPlanAction {
	static readonly type = '[Plans] add plan';

	constructor(public payload: any) {
	}
}


export class SelectMonthAction {
    static readonly type = '[Plans] select month'
    constructor (public payload: {date: Date}) {}
}

export class InitPlansAction {
    static readonly type = '[Plans] init plans'
    constructor () {}
}