import type { APIRequestContext } from "@playwright/test";
import { LoginResponseSchema, AuthMeSchema, RefreshResponseSchema, LoginResponse, AuthMe, RefreshResponse } from "../schemas/auth.schema";


export class AuthApi {
    constructor(private readonly request: APIRequestContext) { }

    async login(username: string, password: string) {
        return await this.request.post("/auth/login", { data: { username, password } });
    }

    async me(accessToken: string) {
        return await this.request.get("/auth/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }

    async loginJson(username: string, password: string): Promise<LoginResponse> {
        const res = await this.login(username, password);
        if (!res.ok()) throw new Error(`POST /auth/login failed: ${res.status()}`);
        return LoginResponseSchema.parse(await res.json());
    }

    async meJson(accessToken: string): Promise<AuthMe> {
        const res = await this.me(accessToken);
        if (!res.ok()) throw new Error(`GET /auth/me failed: ${res.status()}`);
        return AuthMeSchema.parse(await res.json());
    }

    async refresh(refreshToken: string) {
        return await this.request.post("/auth/refresh", { data: { refreshToken } });
    }

    async refreshJson(refreshToken: string): Promise<RefreshResponse> {
        const res = await this.refresh(refreshToken);
        if (!res.ok()) throw new Error(`POST /auth/refresh failed: ${res.status()}`);
        return RefreshResponseSchema.parse(await res.json());
    }


}