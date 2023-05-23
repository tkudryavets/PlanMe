import { TypeRequest } from "./type-request.const";

export interface ServiceMethodModel {
	type: string;
	name: string;
	nameWithParams?: (params: any) => string;
	withoutRootUrl?: boolean;
}

export class ServiceMethodConst {
	public static readonly SESSION_LOGIN: ServiceMethodModel = {
		name: 'http://34.118.23.170/login',
		type: TypeRequest.POST
	};

    public static readonly SESSION_LOGOUT: ServiceMethodModel = {
		name: 'http://34.118.23.170/logout',
		type: TypeRequest.POST
	};
	public static readonly ADD_PLAN: ServiceMethodModel = {
		name: 'http://34.118.23.170/events',
		type: TypeRequest.POST
	}
}