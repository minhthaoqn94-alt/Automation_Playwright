import test, { expect } from "@playwright/test";
import LoginPage from "../../pages/login-page";
import ChooseRole from "../../pages/choose-a-role-page";
import OrganizationPageEdit from  "../../pages/organization-page-edit";
import { userData } from "../../data/user-data";
import DashboardPage from "../../pages/dashboard-page";
import editorganizationData from "../../data/edit_organization-data";
import { OrganizationData_add } from "../../types/organization_add";
import OrganizationPageList from "../../pages/organization-page-list";
import AddContact from "../../pages/contacts-page-add";

test.describe("Edit Org Page", () => {
  test.describe.configure({ mode: "serial" });
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const rolePage = new ChooseRole(page);
    const dashboardPage = new DashboardPage(page);
    const organizationPageList = new OrganizationPageList(page);
    const organizationPageEdit = new OrganizationPageEdit(page);

    await login.navigate();
    await login.login(userData.validEmail, userData.validPassword);
    await rolePage.choosePotentiaOwnerLevel2BPartnersRole();
    await dashboardPage.goToOrganizationPage();
    await organizationPageList.searchByOrgName("Amanda_08282025");
    await organizationPageList.goToOrganizationEditPage("Amanda_08282025");
    await organizationPageEdit.clickContactTab();
    
  });

  test("#1 Add a new contact", async ({ page }) => {
    const orgPage = new OrganizationPageEdit(page);
    await orgPage.clickContactTab();
    const orgData = editorganizationData.testData.case1 as OrganizationData_add;
    const addContact = new AddContact(page);
    const fName = "Demo";
    const lName = "123";
    const prefName= "";
    const email = "demo_123@gmail.com";
    const phone = "";
    const role = "";
    const portalRole = "Independent Consultant - Level 3B";
    const Active = true;
    await addContact.addNewContact(fName, lName, prefName, email, phone, role, portalRole, Active);
    await addContact.addContact();
    await addContact.Message("Success");
    });

    
});
