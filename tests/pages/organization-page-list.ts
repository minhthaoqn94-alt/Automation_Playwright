import { Locator, Page } from "@playwright/test";

class OrganizationPageList {
    private readonly page: Page;
    private readonly addOrganizationBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addOrganizationBtn = this.page.locator('a:has(span:has-text("Add Organization"))');
             
    }

    async goToOrganizationAddPage() {
        this.addOrganizationBtn.click();
    }

    async goToOrganizationEditPage(orgName: string) {
        const row = this.page.locator('datatable-body-row', { hasText: orgName });
        await row.locator('a[title="Edit"]').click();
    }

    async DeleteOrg(orgName: string) {
        const row = this.page.locator('datatable-body-row', { hasText: orgName });
        await row.locator('a[title="Delete"]').click();
    }
}

export default OrganizationPageList