import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceMethodConst } from "../util/const/service-method.const";
import { Store } from "@ngxs/store";
import { PlansState } from "../states/plans.state";
import { IEvent } from "../components/interfaces/IDay.interface";
import { IPlans } from "../components/interfaces/plans.interface";


@Injectable({
	providedIn: 'root'
})
export class BackendApiService {

	constructor(private httpClient: HttpClient, private store: Store) {
	}

	loginAction(payload: any): Observable<any> {
		return this.httpClient.post<any>(ServiceMethodConst.SESSION_LOGIN.name, payload);
	}

    logout() {
		return this.httpClient.post<any>(ServiceMethodConst.SESSION_LOGOUT.name, {});
	}

	addPlan(plan: IEvent) {
		let plans = this.store.selectSnapshot(PlansState.plans) as IPlans;
		//plans[`${plan.repeat}`]?.push(plan);
		//this.store.dispatch(new UpdatePlansAction(plan))
		//return this.httpClient.post<any>(ServiceMethodConst.ADD_PLAN.name, JSON.stringify(plan));
	}
}