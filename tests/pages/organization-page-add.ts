import { expect, Locator, Page } from "@playwright/test";
import { OrganizationData_add } from "../types/organization_add";

class OrganizationPageAdd {
  private readonly page: Page;
  public readonly accountingTab: Locator;
  private readonly backButton: Locator;
  public readonly saveButton: Locator;
  message: Locator;

  private readonly companyNameEle: Locator;
  private readonly locationCodeEle: Locator;
  private readonly shortNameEle: Locator;
  private readonly address1Ele: Locator;
  private readonly address2Ele: Locator;
  private readonly cityEle: Locator;
  private readonly stateProvinceEle: Locator;
  private readonly postalCodeEle: Locator;
  private readonly countryEle: Locator;
  private readonly industryEle: Locator;
  private readonly linkedInEle: Locator;
  private readonly websiteEle: Locator;
  private readonly parentOrgEle: Locator;
  private readonly orgTypeEle: Locator;
  private readonly statusEle: Locator;
  private readonly phoneEle: Locator;
  private readonly emailEle: Locator;
  private readonly consultantEle: Locator;
  private readonly orgLogoEle: Locator;
  private readonly invoiceFrequencyEle: Locator;
  private readonly belongToJobTrackEle: Locator;
  private readonly isRedirectToWMEle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountingTab = this.page.locator("#mat-tab-label-0-1");
    this.backButton = this.page.locator('a:has(span:has-text("Back"))');
    this.saveButton = this.page.locator('button:has(span:has-text("Save Organization"))');

    this.companyNameEle = this.page.locator('[data-placeholder="Company Name"]');
    this.locationCodeEle = this.page.locator('input[name="Location Code"]');
    this.shortNameEle = this.page.locator('input[name="Short Name"]');
    this.address1Ele = this.page.locator('input[name="Address 1"]');
    this.address2Ele = this.page.locator('input[name="Address 2"]');
    this.cityEle = this.page.locator('input[name="City"]');
    this.stateProvinceEle = this.page.locator('input[name="State Or Prov"]');
    this.postalCodeEle = this.page.locator('input[name="Postal Code"]');
    this.countryEle = this.page.locator('input[name="Country"]');
    this.industryEle = this.page.locator('input[name="Industry"]');
    this.linkedInEle = this.page.locator('input[name="LinkedIn"]');
    this.websiteEle = this.page.locator('input[name="Website"]');
    this.parentOrgEle = this.page.locator('ng-select[name="Parent Org"]');
    this.orgTypeEle = this.page.locator('ng-select[name="Organization Type"]');
    this.statusEle = this.page.locator('ng-select[name="Status"]');
    this.phoneEle = this.page.locator("#phone");
    this.emailEle = this.page.locator('input[name="email"]');
    this.consultantEle = this.page.locator('ng-select[name="list"]');
    this.orgLogoEle = this.page.locator('[data-placeholder="Org Logo"]');
    this.invoiceFrequencyEle = this.page.locator(
      'ng-select[name="InvoiceFrequency"]'
    );
    this.belongToJobTrackEle = this.page.locator(
      'mat-checkbox[name="BelongToJobTrack"]'
    );
    this.isRedirectToWMEle = this.page.locator(
      'mat-checkbox[name="IsRedirectToWM"]'
    );
  }

  async clickAccountingTab() {
    await this.accountingTab.click();
  }

  async fillDataInInformationTab(data: OrganizationData_add) {
    await this.companyNameEle.fill(data.companyName);
    await this.locationCodeEle.fill(data.locationName);
    await this.shortNameEle.fill(data.shortName);
    await this.address1Ele.fill(data.address1);
    await this.address2Ele.fill(data.address2);
    await this.cityEle.fill(data.city);
    await this.stateProvinceEle.fill(data.stateProvince);
    await this.postalCodeEle.fill(data.postalCode);
    await this.countryEle.fill(data.country);
    // await this.page.fill('[data-placeholder="Full Address"]', data.FullAddress);
    await this.industryEle.fill(data.industry);
    await this.linkedInEle.fill(data.linkedIn);
    await this.websiteEle.fill(data.website);

    await this.parentOrgEle.click();
    await this.page.waitForTimeout(1000);
    const parentOrgInputSearchEle = this.parentOrgEle.locator("input");
    await parentOrgInputSearchEle.fill(data.parentOrg);
    await this.page.waitForTimeout(1000);
    await this.page
      .locator('ng-dropdown-panel div[role="option"]', {
        hasText: data.parentOrg,
      })
      .click();

    await this.orgTypeEle.click();
    await this.page
      .locator('ng-dropdown-panel div[role="option"]', {
        hasText: data.orgType,
      })
      .click();

    const dialog = this.page.locator("mat-dialog-container");
    await dialog.locator("button").click();

    if (data.status !== "Active") {
      this.statusEle.click();
      await this.page
        .locator('ng-dropdown-panel div[role="option"]', {
          hasText: data.status,
        })
        .click();
    }

    await this.phoneEle.fill(data.phoneNumber);
    await this.emailEle.fill(data.email);

    // const consultantEle = this.page.locator('ng-select[name="list"]');
    // await consultantEle.click();
    // await this.page.waitForTimeout(1000);
    // const consultantInputSearch = consultantEle.locator('input');
    // await consultantInputSearch.fill(data.Consultant);
    // await this.page.waitForTimeout(1000);
    // await this.page.locator('ng-dropdown-panel div[role="option"]', { hasText: data.Consultant }).click();

    // await this.page.selectOption('[data-placeholder="Consultant *"]', data.Consultant);
    // await this.page.fill('[data-placeholder="Org Logo"]', data.OrgLogo);
    // const invoiceFrequencyEle = this.page.locator('ng-select[name="InvoiceFrequency"]');
    // await invoiceFrequencyEle.click();
    // await this.page.locator('ng-dropdown-panel div[role="option"]', { hasText: data.InvoiceFrequency }).click();

    if (data.belongWM) {
      await this.belongToJobTrackEle
        .locator('input[name="BelongToJobTrack"]')
        .check();
    }
    if (data.redWM) {
      await this.isRedirectToWMEle
        .locator('mat-checkbox[name="IsRedirectToWM"] input[type="checkbox"]')
        .check();
    }
  }

  async fillDataInAccountingTab(data: { name: string; emailAccount: string }) {
    await this.page.locator('input[name="accName"]').fill(data.name);
    await this.page.locator('input[name="accEmail"]').fill(data.emailAccount);
  }

  async SaveOrg() {
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);
  }

  async backToList() {
    await this.backButton.click();
  }

  async Message(msg: string) {
    this.message = this.page.locator("span[data-notify='message']");
    await expect(this.message).toHaveText(msg);
    await this.page.waitForTimeout(2000);
  }
}
export default OrganizationPageAdd;
