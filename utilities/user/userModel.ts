export class UserModel {
    private _id: string;
    private _username: string;
    private _pass:string;
    private _token:string;
    private _registrationDate: Date;
    private _lastModified: Date;
    private _active:boolean;

    public static GetNewInstance(): UserModel {
        return new UserModel(null, null);
    }

    public static ParseFromObject(object:any): UserModel {
        const model:UserModel = UserModel.GetNewInstance();

        if (object) {
            model._id = object.id;
            model._username = object.username;
            model._pass = undefined;
            model._token = object.token;
            model._registrationDate = object.registrationDate;
            model._lastModified = object.lastModified;
            model._active = object.active;
        }

        return model;
    }

    constructor(username: string, pass: string) {
        this._id = "";
        this._username = username;
        this._pass = pass;
        this._token = "";
        this._registrationDate = new Date();
        this._lastModified = new Date();
        this._active = true;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    get registrationDate(): Date {
        return this._registrationDate;
    }

    set registrationDate(value: Date) {
        this._registrationDate = value;
    }

    get lastModified(): Date {
        return this._lastModified;
    }

    set lastModified(value: Date) {
        this._lastModified = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}