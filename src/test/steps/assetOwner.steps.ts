import { Given, When, Then } from "@cucumber/cucumber";
import AssetOwnerPage from "../../pages/assetOwner.page";
import { fixture } from "../../hooks/pageFixture";

let assetOwner: AssetOwnerPage;

When('select Asset Owner from the system settings menu', async () => {
  assetOwner = new AssetOwnerPage(fixture.page);
  await assetOwner.clickOnAssetOwnerMenu();
});

When('Click on the create button', async () => {
  await assetOwner.clickOnCreateButton();
});

When('Enter all the fields in asset owner form', async () => {
  await assetOwner.fillAssetOwnerForm();
});

When('Click on the save button in asset owner form', async () => {
  await assetOwner.submit();
});

Then('Verify the asset owner is created in the inquire list', async () => {
  await assetOwner.searchOwner();
});

Then('Verify edit functionality in asset owner form', async () => {
  await assetOwner.clickOnEditButton();
});

Then('Verify action Log in asset owner form', async () => {
  await assetOwner.verifyActionLog();
});
Then('Verify page is resting and opening the create asset owner form on clicking the Add button', async () => {
  await assetOwner.newButtonFunctionality();
});