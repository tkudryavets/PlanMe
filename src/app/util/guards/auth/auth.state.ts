import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { Observable, of, tap } from "rxjs";
import { BackendApiService } from "src/app/services/backend-api.service";
import { CommonLocalStorageDataConst } from "../../const/common-local-storage-data.const";
import { PageRefConst } from "../../const/page-ref.const";
import { AuthAction, LogoutAction } from "./auth.actions";

export class AuthStateModel {
	sessionToken?: string;
	login?: string;
	userName?: string;

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
	static token(state: AuthStateModel): string | undefined {
		return state.sessionToken;
	}

	@Selector()
	static userName(state: AuthStateModel): string | undefined {
		return state.userName;
	}

	@Selector()
	static login(state: AuthStateModel): string | undefined {
		return state.login;
	}

    
	@Action(AuthAction)
	login(ctx: StateContext<AuthStateModel>, { payload }: AuthAction): Observable<any> {
		if (CommonLocalStorageDataConst && CommonLocalStorageDataConst.SESSION_TOKEN) {
			CommonLocalStorageDataConst.SESSION_TOKEN.delete();
		}


		return this.backendApiService.loginAction(payload)
			.pipe(
				tap((result: any) => {
					ctx.patchState({
						sessionToken: result.sessionToken,
						login: result.login,
						userName: result.firstName
					});

					CommonLocalStorageDataConst.SESSION_TOKEN.setItem(result.sessionToken);

					this.loginRespSuccess(result);
				})
			);
	}
	loginRespSuccess(result: any) {
		console.log(result);
	}

    @Action(LogoutAction)
	logoutAction(ctx: StateContext<AuthStateModel>): Observable<any> {
	//	this.websocketUnsubscribe();

		return this.backendApiService.logout()
			.pipe(
				tap(() => {
					CommonLocalStorageDataConst.SESSION_TOKEN.delete();
					this.router.navigateByUrl(PageRefConst.LOGIN.link);
				}),

			);
	}
}