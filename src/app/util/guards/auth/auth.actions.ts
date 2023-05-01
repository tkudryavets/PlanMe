export class AuthAction {
	static readonly type = '[Auth] Login';

	constructor(public payload: {request: any}) {
	}
}

export class LogoutAction {
	static readonly type = '[Auth] Logout';
}