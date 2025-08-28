import test, { expect } from "@playwright/test";
import LoginPage from "../../pages/login-page";
import ChooseRole from "../../pages/choose-a-role-page";
import OrganizationPageEdit from  "../../pages/organization-page-edit";
import { userData } from "../../data/user-data";
import DashboardPage from "../../pages/dashboard-page";
import editorganizationData from "../../data/edit_organization-data";
import { OrganizationData_add } from "../../types/organization_add";
import OrganizationPageList from "../../pages/organization-page-list";

test.describe("Edit Org Page", () => {
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
    await organizationPageList.searchByOrgName("Amanda_08252025 (Auto)");
    await organizationPageList.goToOrganizationEditPage("Amanda_08252025 (Auto)");
  });

  test("#1 Edit an Org", async ({ page }) => {
    const orgPage = new OrganizationPageEdit(page);
    const orgData = editorganizationData.testData.case1 as OrganizationData_add;
    await orgPage.fillDataInInformationTab(orgData);
    await orgPage.UpdateOrg();
    await orgPage.Message("Save Success!");
    });

    
});
