import test, { expect } from "@playwright/test";
import LoginPage from "../../pages/login-page";
import ChooseRole from "../../pages/choose-a-role-page";
import OrganizationPageAdd from "../../pages/organization-page-add";
import { userData } from "../../data/user-data";
import DashboardPage from "../../pages/dashboard-page";
import addorganizationData from "../../data/add_organization-data";
import { OrganizationData_add } from "../../types/organization_add";
import OrganizationPageList from "../../pages/organization-page-list";

test.describe("Add Org Page", () => {
  test.describe.configure({ mode: "serial" });
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const rolePage = new ChooseRole(page);
    const dashboardPage = new DashboardPage(page);
    const organizationPageList = new OrganizationPageList(page);

    await login.navigate();
    await login.login(userData.validEmail, userData.validPassword);
    await rolePage.choosePotentiaOwnerLevel2BPartnersRole();
    await dashboardPage.goToOrganizationPage();
    await organizationPageList.goToOrganizationAddPage();
  });

  test("#1 Add a new Org", async ({ page }) => {
    const orgPage = new OrganizationPageAdd(page);
    const orgData = addorganizationData.testData.case1 as OrganizationData_add;
    await orgPage.fillDataInInformationTab(orgData);
    await orgPage.clickAccountingTab();
    
    await orgPage.fillDataInAccountingTab({
      name: "Amanda",
      emailAccount: "thao.tran@enclave.vn",
    });
    await orgPage.SaveOrg();
    await orgPage.Message("Your new organization, Amanda_123 is set up.");
  });

  test("#2 Add a new Org with missing fields", async ({ page }) => {
    const orgPage = new OrganizationPageAdd(page);
    const orgData = addorganizationData.testData.case2 as OrganizationData_add;
    await orgPage.fillDataInInformationTab(orgData);
    expect(orgPage.accountingTab).toHaveCount(0)
    await expect(orgPage.saveButton).toHaveAttribute("disabled", "true");
  });

  test("#3 Add a new Org with Back button", async ({ page }) => {
    const orgPage = new OrganizationPageAdd(page);
    const orgData = addorganizationData.testData.case1 as OrganizationData_add;
    await orgPage.fillDataInInformationTab(orgData);
    await orgPage.backToList();
    await expect(page).toHaveURL(/.*admin\/org/);
  });
});
