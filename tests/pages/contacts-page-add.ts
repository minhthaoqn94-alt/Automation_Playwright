import { expect, Locator, Page } from "@playwright/test";

class AddContact {
    private readonly page: Page;
    private readonly fName: Locator;
    private readonly lName: Locator;
    private readonly preferName: Locator;
    private readonly email: Locator;
    private readonly phone: Locator;
    private readonly role: Locator;
    private readonly portalRole: Locator;
    private readonly active: Locator;

    private readonly cancelBtn: Locator;
    private readonly saveBtn: Locator;
    message: Locator;
   

    constructor(page: Page) {
        this.page = page;
       this.fName = this.page.locator('input[name="firstname"]');
       this.lName = this.page.locator('input[name="lastname"]');
       this.preferName = this.page.locator('input[name="commonname"]');
       this.email = this.page.locator('input[name="email"]');
       this.phone = this.page.locator("#phone");
       this.role = this.page.locator('input[name="jobortitle"]');
       this.portalRole = this.page.locator('ng-select[name="SelectedRoles"]');
       this.active = this.page.locator('mat-checkbox[name="active"]');

       this.cancelBtn = this.page.locator('span:has-text("Cancel")');
       this.saveBtn = this.page.locator('span:has-text("Save")');
    }

    async addNewContact(firstname: string, lastname: string, preferName: string, email: string, 
        phone: string, role: string, portalRole: string, active: boolean) {
        await this.fName.fill(firstname);
        await this.lName.fill(lastname);
        await this.preferName.fill(preferName);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.role.fill(role);
        await this.portalRole.selectOption({ label: portalRole });
        if (active) {
            const isChecked = await this.active.isChecked();
            if (!isChecked) {
                await this.active.click();
            }
        } else {
            const isChecked = await this.active.isChecked();
            if (isChecked) {
                await this.active.click();
            }
        }
    }
    async addContact() {
        await this.saveBtn.click();
        await this.page.waitForTimeout(2000);
      }
    
      async CancelContact() {
        await this.cancelBtn.click();
      }
    
      async Message(msg: string) {
        this.message = this.page.locator("span[data-notify='message']");
        await expect(this.message).toHaveText(msg);
        await this.page.waitForTimeout(2000);
      }
}

export default AddContact;