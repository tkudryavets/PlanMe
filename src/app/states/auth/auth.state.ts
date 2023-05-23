import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Selector, Action, StateContext } from "@ngxs/store";
import { Observable, of, tap } from "rxjs";
import { AuthAction, LogoutAction } from "./auth.actions";
import { BackendApiService } from "app/services/backend-api.service";

export class AuthStateModel {
	isLoggedIn?: boolean;
	login?: string;

	constructor(obj?: any) {
		Object.assign(this, obj);
	}
}

@Injectable()
export class AuthState {

	constructor(
		private router: Router,
		private backendApiService: BackendApiService,
		public store: Store,
		private ngZone: NgZone
	) {
	}

	@Selector()
	static isLoggedIn(state: AuthStateModel): boolean {
		return !!state.isLoggedIn;
	}

	@Selector()
	static login(state: AuthStateModel): string | undefined {
		return state.login;
	}

    
	@Action(AuthAction)
	login(ctx: StateContext<AuthStateModel>, { payload }: AuthAction): Observable<any> {
		return this.backendApiService.loginAction(payload)
			.pipe(
				tap((result: any) => {
					console.log(result.headers['Set-Cookie'])
					ctx.patchState({
						isLoggedIn: true
					});
					this.router.navigateByUrl('/dashboard')
				})
			);
	}

    @Action(LogoutAction)
	logoutAction(ctx: StateContext<AuthStateModel>): Observable<any> {
		return this.backendApiService.logout()
			.pipe(
				tap(() => {
					ctx.patchState({
						isLoggedIn: false
					});
					this.router.navigateByUrl('/login')
				}),

			);
	}
}