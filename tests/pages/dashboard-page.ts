import { Locator, Page } from "@playwright/test";

class DashboardPage {
    private readonly page: Page;
    private readonly myAdminMenu: Locator;
    private readonly organisationMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAdminMenu = this.page.locator("text=My Admin");
        this.organisationMenu = this.page.locator("text=Organizations");
    }

    async goToOrganizationPage() {
        await this.myAdminMenu.click();
        await this.organisationMenu.click();
    }
}
export default DashboardPage;