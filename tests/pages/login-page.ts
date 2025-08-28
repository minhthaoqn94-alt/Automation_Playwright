import { expect, Locator, Page } from "@playwright/test";

class LoginPage {
    private readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly messagePanel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.locator("#loginbutton");
        this.messagePanel = page.locator("#validationSummary");
    }

    async navigate() {
        await this.page.goto("https://acme.enclave.vn/", { waitUntil: "networkidle"});
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.page.waitForTimeout(2000);
        await this.loginButton.click();
    }

    async checkLoggedIn() {
        await expect(this.page).toHaveURL(/.*select-role/);
        await expect(this.page).toHaveTitle(/Potentia Portal/);
    }

    async checkInvalidCredentials(errorMessage: string) {
        await expect(this.messagePanel).toHaveText(errorMessage);
    }

    async checkInvalidCredentials1(errorMessage1: string, errorMessage2: string) {
        const childrenDivs = this.messagePanel.locator('> div');
        await expect(childrenDivs.nth(0)).toHaveText(errorMessage1);
        await expect(childrenDivs.nth(1)).toHaveText(errorMessage2);
    }

}
export default LoginPage;

