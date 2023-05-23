export enum NavigationIcons {
	DASHBOARD = 'dashboard',
	CALENDAR = 'calendar_month',
	INFO = 'info',
	MAIN = 'home',
	EXCHANGE_RATES = 'currency_exchange',
	STATISTICS = 'analytics'
}

export interface PageRefModel {
	name: string;
	link: string;
    title: string;
	icon?: string
}

export class PageRefConst {
	static readonly LOGIN: PageRefModel = {
		name: 'login',
		link: '/login',
        title: 'Authorization'
	};

	static readonly EMPTY: PageRefModel = {
		name: 'empty',
		link: '/empty',
        title: ''
	};

    static readonly DASHBOARD: PageRefModel = {
		name: 'dashboard',
		link: '/dashboard',
        title: 'Dashboard',
		icon: NavigationIcons.DASHBOARD
	};

    static readonly CALENDAR: PageRefModel = {
		name: 'calendar',
		link: '/calendar',
        title: 'Calendar',
		icon: NavigationIcons.CALENDAR
	};

    static readonly STATISTICS: PageRefModel = {
		name: 'statistics',
		link: '/statistics',
        title: 'Statistics',
		icon: NavigationIcons.STATISTICS
	};

	static readonly NAV_PANEL_LINKS = [
		this.DASHBOARD,
		this.CALENDAR,
		this.STATISTICS
	]
}
