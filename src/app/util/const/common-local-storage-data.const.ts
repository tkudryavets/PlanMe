export class LocalStorageDataAction {
	private _nameLabel: any;

	constructor(name: any) {
		this._nameLabel = name;
	}

	getItem(): any {
		const data = localStorage.getItem(this._nameLabel);
		return !!data
			? JSON.parse(data)
			: undefined;
	}

	getJSON(): string | null {
		return localStorage.getItem(this._nameLabel);
	}

	setItem(data: any): void {
		localStorage.setItem(this._nameLabel, JSON.stringify(data));
	}

	setJSON(data: string): void {
		localStorage.setItem(this._nameLabel, data);
	}

	delete(): void {
		localStorage.removeItem(this._nameLabel);
	}
}

export class CommonLocalStorageDataConst {
	static readonly SESSION_TOKEN: LocalStorageDataAction = new LocalStorageDataAction('sessionToken');

}
