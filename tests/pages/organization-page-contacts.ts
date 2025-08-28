import { Locator, Page } from "@playwright/test";

class ContactTabOrg {
    private readonly page: Page;
    private readonly clearBtn: Locator;
    private readonly addContactBtn: Locator;
    private readonly sendNotiBtn: Locator;
    private readonly editBtn: Locator;
    private readonly deleteBtn: Locator;

    private readonly fName: Locator;
    private readonly lName: Locator;
    private readonly prefName: Locator;
    private readonly email: Locator;
    private readonly phone: Locator;
    private readonly proRole: Locator;
    private readonly active: boolean;

    constructor(page: Page) {
        this.page = page;
        this.clearBtn = this.page.locator('span:has-text("Clear Search")');
        this.addContactBtn = this.page.locator('span:has-text("Add Contact")');
        this.sendNotiBtn = this.page.locator('span:has-text("Send Notification")');
        this.editBtn = this.page.locator('span:has-text("Edit")');
        this.deleteBtn = this.page.locator('span:has-text("Delete")');

        this.fName = this.page.locator('');
        this.lName = this.page.locator('');
        this.prefName = this.page.locator('');
        this.email = this.page.locator('');
        this.phone = this.page.locator('');
        this.proRole = this.page.locator('');
        this.active = false;
    }

    async goToAddContact() {
        this.addContactBtn.click();
    }

    async goToSendNotifications() {
        this.sendNotiBtn.click();
    }

    async EditContact(orgName: string) {
        const row = this.page.locator('datatable-body-row', { hasText: orgName });
        await row.locator('a[title="Edit"]').click();
    }

    async DeleteContact(orgName: string) {
        const row = this.page.locator('datatable-body-row', { hasText: orgName });
        await row.locator('a[title="Delete"]').click();
    }
}

export default ContactTabOrg;