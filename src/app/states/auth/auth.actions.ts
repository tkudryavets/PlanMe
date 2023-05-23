export class AuthAction {
	static readonly type = '[Auth] Login';

	constructor(public payload: {username: string, password: string}) {
	}
}

export class LogoutAction {
	static readonly type = '[Auth] Logout';
}