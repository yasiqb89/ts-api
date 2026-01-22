import type { APIRequestContext } from "@playwright/test";
import { LoginResponseSchema, AuthMeSchema, RefreshResponseSchema, LoginResponse, AuthMe, RefreshResponse } from "../schemas/auth.schema";


export class AuthApi {
    constructor(private readonly request: APIRequestContext) { }

    async login(username: string, password: string, expiresInMins?: number) {
        return await this.request.post("/auth/login", {
            data: { username, password, ...(expiresInMins ? { expiresInMins } : {}) },
        });
    }

    async me(accessToken: string) {
        return await this.request.get("/auth/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }

    async refresh(refreshToken: string, expiresInMins?: number) {
        return await this.request.post("/auth/refresh", {
            data: { refreshToken, ...(expiresInMins ? { expiresInMins } : {}) },
        });
    }

    async loginJson(username: string, password: string, expiresInMins?: number): Promise<LoginResponse> {
        const res = await this.login(username, password, expiresInMins);
        if (!res.ok()) throw new Error(`POST /auth/login failed: ${res.status()}`);
        return LoginResponseSchema.parse(await res.json());
    }

    async meJson(accessToken: string): Promise<AuthMe> {
        const res = await this.me(accessToken);
        if (!res.ok()) throw new Error(`GET /auth/me failed: ${res.status()}`);
        return AuthMeSchema.parse(await res.json());
    }

    async refreshJson(refreshToken: string, expiresInMins?: number): Promise<RefreshResponse> {
        const res = await this.refresh(refreshToken, expiresInMins);
        if (!res.ok()) throw new Error(`POST /auth/refresh failed: ${res.status()}`);
        return RefreshResponseSchema.parse(await res.json());
    }


}