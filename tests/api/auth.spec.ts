import { test, expect } from "@playwright/test";
import { AuthApi } from "../../src/api/authApi";
import { ErrorSchema } from "../../src/schemas/error.schema";


test("POST /auth/login returns tokens (happy path)", async ({ request }) => {
    const auth = new AuthApi(request);

    const result = await auth.loginJson("emilys", "emilyspass");

    expect(result.id).toBe(1);
    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));
});


test("POST /auth/login with wrong password returns error", async ({ request }) => {
    const auth = new AuthApi(request);

    const res = await auth.login("emilys", "wrongpass");

    expect(res.ok()).toBeFalsy();
    // Server returns 400 for invalid credentials, but allow 401 too.
    expect([400, 401]).toContain(res.status());

    const err = ErrorSchema.parse(await res.json());
    expect(err.message.length).toBeGreaterThan(0);
});


test("GET /auth/me returns current user when token is valid", async ({ request }) => {
    const auth = new AuthApi(request);

    const login = await auth.loginJson("emilys", "emilyspass");
    const me = await auth.meJson(login.accessToken);

    expect(me.id).toBe(login.id);
    expect(me.username).toBe(login.username);
});


test("Auth flow: login - refresh returns new tokens", async ({ request }) => {
    const auth = new AuthApi(request);

    const login = await auth.loginJson("emilys", "emilyspass");
    const refreshed = await auth.refreshJson(login.refreshToken);

    // Zod already guarantees these are strings; this checks they’re actually usable
    expect(refreshed.accessToken.length).toBeGreaterThan(0);
    expect(refreshed.refreshToken.length).toBeGreaterThan(0);
});