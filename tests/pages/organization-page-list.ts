import { expect, Locator, Page } from "@playwright/test";

class OrganizationPageList {
    private readonly page: Page;
    private readonly addOrganizationBtn: Locator;
    private readonly searchByOrgNameInput: Locator;
    private noDataText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addOrganizationBtn = this.page.locator('a:has(span:has-text("Add Organization"))');
        this.searchByOrgNameInput = this.page.locator('#mat-input-0');
    }

    async goToOrganizationAddPage() {
        this.addOrganizationBtn.click();
    }

    async goToOrganizationEditPage(orgName: string) {
        const row = this.page.locator(`datatable-body-row:has(span:has-text("${orgName}"))`);
        await row.locator('a[title="Edit"]').click();
    }

    async DeleteOrg(orgName: string) {
        const row = this.page.locator('datatable-body-row', { hasText: orgName });
        await row.locator('a[title="Delete"]').click();
    }

    async searchByOrgName(orgName: string) {
        await this.searchByOrgNameInput.fill(orgName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
    }

    async getOrgName(orgName: string) {
        const row = this.page.locator('datatable-body-row', { hasText: orgName });
    }

    async checkTableNoData() {
        this.noDataText = this.page.locator('.empty-row:has-text("No data to display")');
        await expect(this.noDataText).toBeVisible();
    }
}

export default OrganizationPageList