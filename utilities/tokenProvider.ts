import { Token } from "./token";

export class TokenProvider {
    public static getToken(): Token {
        return new Token("anything");
    }
}