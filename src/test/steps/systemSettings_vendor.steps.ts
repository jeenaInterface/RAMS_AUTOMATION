import { Given, When, Then } from "@cucumber/cucumber";
import VendorPage from "../../pages/systemSettings_vendor.page";
import { fixture } from "../../hooks/pageFixture";

let vendor: VendorPage;

When('select Vendor from the system settings menu', async () => {
  vendor = new VendorPage(fixture.page);
  await vendor.clickOnVendorMenu();
});

When('Click on the create button in vendor form', async () => {
  await vendor.clickOnCreateButton();
});

When('Enter all the fields in Vendor form', async () => {
  await vendor.fillVendorForm();
});

When('Click on the save button in Vendor form', async () => {
  await vendor.submit();
});

Then('Verify the Vendor is created in the inquire list', async () => {
  await vendor.searchVendor();
});

Then('Verify edit functionality in Vendor form', async () => {
  await vendor.clickOnEditButton();
});

Then('Verify action Log in Vendor form', async () => {
  await vendor.verifyActionLog();
});

Then('Verify page is resting and opening the create vendor form on clicking the Add button', async () => {
  await vendor.newButtonFunctionality();
});