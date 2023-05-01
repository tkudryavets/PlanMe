export enum NavigationIcons {
	PROFILE = 'person',
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
		name: 'auth/login',
		link: '/auth/login',
        title: 'Авторизация'
	};

	static readonly EMPTY: PageRefModel = {
		name: 'empty',
		link: '/empty',
        title: ''
	};

    static readonly DASHBOARD: PageRefModel = {
		name: 'dashboard',
		link: '/dashboard',
        title: 'Рабочий стол',
		icon: NavigationIcons.PROFILE
	};

    static readonly CALENDAR: PageRefModel = {
		name: 'calendar',
		link: '/calendar',
        title: 'Календарь',
		icon: NavigationIcons.CALENDAR
	};

    static readonly STATISTICS: PageRefModel = {
		name: 'statistics',
		link: '/statistics',
        title: 'Статистика',
		icon: NavigationIcons.STATISTICS
	};

	static readonly NAV_PANEL_LINKS = [
		this.DASHBOARD,
		this.CALENDAR,
		this.STATISTICS
	]
}
