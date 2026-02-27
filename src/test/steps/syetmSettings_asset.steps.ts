import { When, Then } from "@cucumber/cucumber";
import AssetPage from "../../pages/systemSettings_asset.page";
import { fixture } from "../../hooks/pageFixture";

let asset: AssetPage;

When('select asset from the system settings menu', async () => {
  asset = new AssetPage(fixture.page);
  await asset.clickOnAssetMenu();
});

When('Click on the create button in asset form', async () => {
  await asset.clickOnCreateButton();
});

When('Enter all the fields in asset form', async () => {
  await asset.fillAssetForm();
});

When('Click on the save button in asset form', async () => {
  await asset.submit();
});

Then('Verify the asset is created in the inquire list', async () => {
  await asset.searchAsset();
});

Then('Verify edit functionality in asset form', async () => {
  await asset.clickOnEditButton();
});

Then('Verify action Log in asset form', async () => {
  await asset.verifyActionLog();
});
