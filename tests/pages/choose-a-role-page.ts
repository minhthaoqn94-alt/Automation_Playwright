import { expect, Locator, Page } from "@playwright/test";
import addorganizationData from "../../tests/data/add_organization-data";

class ChooseRole {
    private readonly page: Page;
    readonly roleDropdown: Locator;


    constructor(page: Page) {
        this.page = page;
        this.roleDropdown = this.page.locator("#mat-select-0");
    }

    async chooseRole(roleName: string){
        // Wait for the dropdown to be visible and attached to DOM
        await this.roleDropdown.waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
        
        // Ensure the element is enabled before clicking
        await expect(this.roleDropdown).toBeEnabled();
        
        await this.roleDropdown.click();
        await this.page.click(`text='${roleName}'`);
    }

    async checkChooseRole_level2() {
        await expect(this.page).toHaveURL(/.*owner\/dashboard/);
        await expect(this.page).toHaveTitle(/Potentia Portal/);
    }

     async checkChooseRole_level3() {
        await expect(this.page).toHaveURL(/.*WM\/dashboard/);
        await expect(this.page).toHaveTitle(/Potentia Portal/);
    }

    async choosePotentiaOwnerLevel2BPartnersRole() {
        await this.chooseRole(addorganizationData.role.potentiaOwnerLevel2BPartners);
    }
}
export default ChooseRole;