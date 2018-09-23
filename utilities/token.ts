export class Token {
    private _hearder:string;
    private _payload:string;
    private _signature:string;

    constructor(payload: string) {
        this._hearder = "";
        this._payload = payload;
        this._signature = "";
    }

    public static GetNewInstance(): Token {
        return new Token(null);
    }

    public static ParseFromObject(object:any): Token {
        const model:Token = Token.GetNewInstance();

        if (object) {
            model._hearder = object.hearder;
            model._payload = object.payload;
            model._signature = object.signature;
        }

        return model;
    }

    get header(): string {
        return this._hearder;
    }

    set header(value: string) {
        this._hearder = value;
    }

    get payload(): string {
        return this._payload;
    }

    set payload(value: string) {
        this._payload = value;
    }

    get signature(): string {
        return this._signature;
    }

    set signature(value: string) {
        this._signature = value;
    }
}