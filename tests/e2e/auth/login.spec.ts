import test from "@playwright/test";
import LoginPage from "../../pages/login-page";

test.describe("Login Page", () => {
    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({ page }) => {
        await page.goto("https://acme.enclave.vn/", { waitUntil: "networkidle"});
    });

    test("#1should login successfully with valid credentials", async ({ page }) => {
        const loginPage = new LoginPage(page);
        // await loginPage.navigate();
        const validEmail = "amanda@enclave.vn";
        const validPassword = "Abcd@123";
        await loginPage.login(validEmail, validPassword);
        await loginPage.checkLoggedIn();
    });

    test("#2should not login with data empty", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = "";
        const invalidPassword = "";
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.checkInvalidCredentials("Please enter your username and password to sign in to Portal.");
    });

    test("#3should not login with Space", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = " ";
        const invalidPassword = " ";
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.checkInvalidCredentials1("The Password field is required.", "The Username field is required.");
        //await loginPage.checkInvalidCredentials("The Username field is required.");
        
    });

    test("#4should not login with data empty Email", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = "";
        const invalidPassword = "Password";
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.checkInvalidCredentials("Please enter your username and password to sign in to Portal.");
    });

    test("#5should not login with data Space Email", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = " ";
        const invalidPassword = "Password";
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.checkInvalidCredentials("The Username field is required.");
    });

      test("#6should not login with data empty Password", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = "amanda@enclave.vn";
        const invalidPassword = "";
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.checkInvalidCredentials("Please enter your username and password to sign in to Portal.");
    });

     test("#7should not login with data Space Password", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = "amanda@enclave.vn";
        const invalidPassword = " ";
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.checkInvalidCredentials("The Password field is required.");
    });

    test("#8should not login with invalid Password", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = "amanda@enclave.vn";
        const invalidPassword = "Abcd@123456";
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.checkInvalidCredentials("Password is incorrect.");
    });

    test("#9should not login with invalid Email", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const invalidEmail = "amanda12345@enclave.vn";
        const invalidPassword = "Abcd@123456";
        await loginPage.login(invalidEmail, invalidPassword);
        await loginPage.checkInvalidCredentials("Email is not found or has been locked.");
    });
});