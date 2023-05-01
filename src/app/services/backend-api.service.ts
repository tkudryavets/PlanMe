import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceMethodConst } from "../util/const/service-method.const";


@Injectable({
	providedIn: 'root'
})
export class BackendApiService {

	constructor(private httpClient: HttpClient) {
	}

	loginAction(payload: any): Observable<any> {
		return this.httpClient.post<any>(ServiceMethodConst.SESSION_LOGIN.name, payload);
	}

    logout() {
		return this.httpClient.post<any>(ServiceMethodConst.SESSION_LOGOUT.name, {});
	}
}