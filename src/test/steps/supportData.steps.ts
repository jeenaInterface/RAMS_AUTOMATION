import { Given, When, Then } from "@cucumber/cucumber";
import SupportDataPage from "../../pages/supportData.page";
import { fixture } from "../../hooks/pageFixture";

let supportDataPage: SupportDataPage;

When('select Support Data from the system settings menu', async () => {
  supportDataPage = new SupportDataPage(fixture.page);
  await supportDataPage.clickOnSupportDataMenu();
});

When('Click on the create button and fill the asset group form', async () => {
  await supportDataPage.CreateNewAssetGroup();
});

Then('Search for the created asset group code', async () => {
  await supportDataPage.searchCode();
});

Then('Verify the search result displays the created asset group', async () => {
  await supportDataPage.verifySearchResult();
});

Then('open the Asset form and confirm that the newly added Asset Group is available in the dropdown when creating a new asset', async () => {
  await supportDataPage.verifyAssetGroupInAssetForm();
});


Then('verify the edit functionality by selecting the created Asset Group in the Support Data form', async () => {
  await supportDataPage.verifyEditFunctionality();
});

Then('Click on the create button and fill the wareHouse form', async () => {
  await supportDataPage.CreateNewWareHouse();
});
Then('Click on the create button and fill the vendorType form', async () => {
  await supportDataPage.CreateVendorType();
});


Then('Search for the created warehouse code', async () => {
  await supportDataPage.searchWareHouseCode();
});

Then('Verify the search result displays the created warehouse', async () => {
  await supportDataPage.verifySearchResultWareHouseCode();
});
Then('Search for the created vendorType code', async () => {
  await supportDataPage.searchVendorTypeCode();
});

Then('Verify the search result displays the created vendorType', async () => {
  await supportDataPage.verifySearchResultVendorType();
});

Then('open the stock location and confirm that the newly added wareHouse is available in the warehouse dropdown', async () => {
  // await supportDataPage.();
});