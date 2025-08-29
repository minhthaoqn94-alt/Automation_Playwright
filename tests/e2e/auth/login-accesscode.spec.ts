import test from "@playwright/test";
import LoginPage_Code from "../../pages/login-accesscode-page";

test.describe(" Sign in by code", () => {
    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({ page }) => {
        await page.goto("https://acme.enclave.vn/", { waitUntil: "networkidle"});
        await page.getByRole('link', {name: 'Sign in by code'}).click();
    });

    test("#1 should login successfully with valid credentials", async ({ page }) => {
        const loginPage_code = new LoginPage_Code(page);
        const validCode = "PCAOONVK5B3C";
        await loginPage_code.loginAccessCode(validCode);
        await loginPage_code.CheckLoggedInAccessCode();
    });

    test("#2 should not login with invalid Code", async ({ page }) => {
        const loginPage_code = new LoginPage_Code(page);
        const invalidCode = "PSAKOLPL5PQ125";
        await loginPage_code.loginAccessCode(invalidCode);
        await loginPage_code.checkInvalidCredentials("Access code is not found.");
    });

     test("#3 should not login with empty Code", async ({ page }) => {
        const loginPage_code = new LoginPage_Code(page);
        const invalidCode = "";
        await loginPage_code.loginAccessCode(invalidCode);
        await loginPage_code.checkInvalidCredentials1();
    });

       test("#4 should not login with space Code", async ({ page }) => {
        const loginPage_code = new LoginPage_Code(page);
        const invalidCode = " ";
        await loginPage_code.loginAccessCode(invalidCode);
        await loginPage_code.checkInvalidCredentials("The AccessCode field is required.");
    });

    test("#5 should not login with the code is expired.", async ({ page }) => {
        const loginPage_code = new LoginPage_Code(page);
        const validCode = "PSAKOLPL5PQ8";
        await loginPage_code.loginAccessCode(validCode);
        await loginPage_code.checkInvalidCredentials("Access code is expired.");
    });
});