import { Given, When, Then } from "@cucumber/cucumber";
import AssetManufacturePage from "../../pages/systemSettings_assetManufacture.page";
import { fixture } from "../../hooks/pageFixture";

let manufacture: AssetManufacturePage;

When('select Asset Manufacturer from the system settings menu', async () => {
  manufacture = new AssetManufacturePage(fixture.page);
  await manufacture.clickOnMenu();
});

When('Click on the create button in Asset Manufacturer form', async () => {
  await manufacture.clickOnCreateButton();
});

When('Enter all the fields in Asset Manufacturer form', async () => {
  await manufacture.fillForm();
});

When('Click on the save button in Asset Manufacturer form', async () => {
  await manufacture.submit();
});

Then('Verify the Asset Manufacturer is created in the inquire list', async () => {
  await manufacture.search();
});

Then('Verify edit functionality in Asset Manufacturer form', async () => {
  await manufacture.clickOnEditButton();
});

Then('Verify action Log in Asset Manufacturer form', async () => {
  await manufacture.verifyActionLog();
});

Then('Verify page is resting and opening the create Asset Manufacturer form on clicking the Add button', async () => {
  await manufacture.newButtonFunctionality();
});