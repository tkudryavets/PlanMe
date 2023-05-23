import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ServiceMethodConst } from "../util/const/service-method.const";
import { Store } from "@ngxs/store";
import { PlansState } from "../states/plans.state";
import { IEvent } from "../components/interfaces/IDay.interface";
import { IPlans } from "../components/interfaces/plans.interface";
import { CookieService } from "ngx-cookie-service"


@Injectable({
	providedIn: 'root'
})
export class BackendApiService {

	constructor(private httpClient: HttpClient, private store: Store, private cookieService: CookieService) {
	}

	loginAction(payload: any): Observable<any> {
		payload = JSON.stringify(payload)
		const headerDict = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Accept': '*/*'
		};
		  
		const requestOptions = {                                                                                                                                                                                 
			headers: new HttpHeaders(headerDict), 
			responseType: 'text' as 'json',
			withCredentials: true, 
			observe: 'response' as 'response'
		};
		console.log('headers', requestOptions)

		return this.httpClient.post<string>(ServiceMethodConst.SESSION_LOGIN.name, payload, requestOptions);
	}

    logout() {
		const headerDict = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Accept': '*/*',
			// 'Cookie': document.cookie
		};
		const requestOptions = {                                                                                                                                                                                 
			headers: new HttpHeaders(headerDict), 
			withCredentials: true, 
  			observe: 'response' as 'response',
		};

		return this.httpClient.post<any>(ServiceMethodConst.SESSION_LOGOUT.name, {}, requestOptions);
	}

	addPlan(payload: IEvent) {
		// let plans = this.store.selectSnapshot(PlansState.plans) as IPlans;
		let request = {};
		payload.startDate = new Date(payload.startDate)
		payload.startDate.setHours(0,0,0,0);
		payload.startDate.toISOString();
		 Object.assign(request, [payload, {user_id: 1}])
		request = JSON.stringify(request)
		const headerDict = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Accept': '*/*'
		};
		  
		const requestOptions = {                                                                                                                                                                                 
			headers: new HttpHeaders(headerDict), 
			responseType: 'text' as 'json',
			observe: 'response' as 'response'
		};
		console.log('headers', requestOptions)

		return this.httpClient.post<any>(ServiceMethodConst.ADD_PLAN.name, request, requestOptions);
		//plans[`${plan.repeat}`]?.push(plan);
		//this.store.dispatch(new UpdatePlansAction(plan))
		//return this.httpClient.post<any>(ServiceMethodConst.ADD_PLAN.name, JSON.stringify(plan));
	}
	
}