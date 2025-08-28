import test, { expect } from "@playwright/test";
import LoginPage from "..//../pages/login-page";
import ChooseRole from "..//../pages/choose-a-role-page";

test.describe("Login Page", () => {
    test.describe.configure({ mode: 'serial' });
    test.beforeEach(async ({ page }) => {
        await page.goto("https://acme.enclave.vn/", { waitUntil: "networkidle"});
        const login = new LoginPage(page);
        const validEmail = "amanda@enclave.vn";
        const validPassword = "Abcd@123";
        await login.login(validEmail,validPassword);
        //await login.checkLoggedIn();
    });

    test("#1 Select the Role = 2B", async ({page }) => {
        await page.waitForTimeout(4000);
        const rolesDropdown = page.locator("#mat-select-0");
        await rolesDropdown.click();
       var selectedOption = page.locator('mat-option', {
        hasText: 'Org: Potentia - Role: Potentia Owner - Level 2B - Partners'
      })
         await selectedOption.click();
         await page.waitForTimeout(2000);

         const choose = new ChooseRole(page);
         await choose.checkChooseRole_level2();

    });

    test("#2 Select the Role = 3A", async ({page }) => {
        await page.waitForTimeout(4000);
        const rolesDropdown = page.locator("#mat-select-0");
        await rolesDropdown.click();
       var selectedOption = page.locator('mat-option', {
        hasText: 'Org: Demo~!@#$%^& - Demo~!@#$%^& - Role: Independent Consultant - Level 3A'
      })
         await selectedOption.click();
         await page.waitForTimeout(2000);

         const choose = new ChooseRole(page);
         await choose.checkChooseRole_level3();

    });
        
});