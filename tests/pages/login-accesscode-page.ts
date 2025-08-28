import { expect, Locator, Page } from "@playwright/test";

class LoginPage_Code {
    private readonly page: Page;
    readonly accessCodeInput: Locator;
    readonly loginButton: Locator;
    readonly messagePanel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accessCodeInput = page.locator("#AccessCode");
        this.loginButton = page.locator('button[value="accessCodeLogin"]');
        this.messagePanel = page.locator("div.validation-summary-errors");
    }

    async loginAccessCode(accesscode: string) {
        await this.accessCodeInput.fill(accesscode);
        await this.loginButton.click();
    }

    async CheckLoggedInAccessCode(){
        await expect(this.page).toHaveURL(/.*ready-assessments/);
        await expect(this.page).toHaveTitle(/Potentia Portal/);
    }

    async checkInvalidCredentials(errorMessage: string) {
        await expect(this.messagePanel).toHaveText(errorMessage);
    }

    async checkInvalidCredentials1() {
        await expect(this.messagePanel).toHaveCount(0);
        await expect(this.page).toHaveTitle(/Potentia Portal Sign in/);
    }

}
export default LoginPage_Code;