import { TypeRequest } from "./type-request.const";

export interface ServiceMethodModel {
	type: string;
	name: string;
	nameWithParams?: (params: any) => string;
	withoutRootUrl?: boolean;
}

export class ServiceMethodConst {
	public static readonly SESSION_LOGIN: ServiceMethodModel = {
		name: 'session/login',
		type: TypeRequest.POST
	};

    public static readonly SESSION_LOGOUT: ServiceMethodModel = {
		name: 'session/logout',
		type: TypeRequest.POST
	};
}