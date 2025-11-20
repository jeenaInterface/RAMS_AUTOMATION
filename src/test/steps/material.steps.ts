import { Given, When, Then } from "@cucumber/cucumber";
import MaterialPage from "../../pages/material.page";
import { fixture } from "../../hooks/pageFixture";

let materialPage: MaterialPage;

When('the admin navigates to the material creation page', async () => {
  materialPage = new MaterialPage(fixture.page);
  await materialPage.clickOnCreateMaterialMenu();
});

When('enters all required details to create a new material', async () => {
  await materialPage.createNewMaterial();
});

Then('the admin searches for the newly created material using its Stock No.', async () => {
  await materialPage.searchMaterialByStockNo();
});

Then('confirms that the search results correctly display the matching Stock No.', async () => {
  await materialPage.verifySearchResultByStockNo();
});

When('the admin updates the created material by modifying its Description and confirms that the updated Description appears correctly in the material list', async () => {
  await materialPage.updateMaterial();
});


Then('verifies that the New button works as expected', async () => {
  await materialPage.verifyNewButtonFunctionality();
});

Then('verifies that the action log records the performed actions accurately', async () => {
  await materialPage.verifyActionLog();
});

When('the admin navigates to the inquire material page', async () => {
  materialPage = new MaterialPage(fixture.page);
  await materialPage.clickOnInquireMaterialMenu();
});

Then('the admin searches for an existing material by Stock No.', async () => {
  await materialPage.searchMaterialByStockNo();
});

Then('verifies that the search results display the correct Stock No.', async () => {
  await materialPage.verifySearchResultByStockNo();
});

Then('the admin searches for an existing material by part No {string}', async (partNo: string) => {
  await materialPage.searchMaterialByPartNo(partNo);
});

Then('verifies that the search results display the correct part No {string}', async (partNo: string) => {
  await materialPage.verifySearchResultByPartNo(partNo);
});

Then('the admin searches for an existing material by Description {string}', async (description: string) => {
  await materialPage.searchMaterialByDescription(description);
});

Then('verifies that the search results display the correct Description {string}', async (description: string) => {
  await materialPage.verifySearchResultByDescription(description);
});

Then('the admin searches for an existing material by asset group {string}', async (AssetGroup: string) => {
  await materialPage.searchByAssetGroup(AssetGroup);
});

Then('verifies that the search results display the correct asset group {string}', async (AssetGroup: string) => {
  await materialPage.searchByAssetGroup(AssetGroup);
});

Then('the admin searches for an existing material by stock location {string}', async (stockLocation: string) => {
  await materialPage.searchMaterialByStockLocation(stockLocation);
});

Then('verifies that the search results display the correct stock location {string}', async (stockLocation: string) => {
  await materialPage.verifySearchResultByStockLocation(stockLocation);
});

Then('the admin searches for an existing material by vendor {string}', async (vendor: string) => {
  await materialPage.searchMaterialByVendor(vendor);
});

Then('verifies that the search results display the correct vendor {string}', async (vendor: string) => {
  await materialPage.verifySearchResultByVendor(vendor);
});

Then('the admin searches for an existing material by status {string}', async (status: string) => {
  await materialPage.searchMaterialByStatus(status);
});

Then('verifies that the search results display the correct status {string}', async (status: string) => {
  await materialPage.verifySearchResultByStatus(status);
});

Then('the admin searches for an existing material by shop {string}', async (shop: string) => {
  await materialPage.searchMaterialByShop(shop);
});

Then('verifies that the search results display the correct shop {string}', async (shop: string) => {
  await materialPage.verifySearchResultByShop(shop);
});

When('the admin navigates to the create material page', async () => {
  materialPage = new MaterialPage(fixture.page);
  await materialPage.clickOnCreateMaterialMenu();
});


Then('the admin fills in the mandatory fields one by one and attempts to submit the form each time', async () => {
  await materialPage.verifyMandatoryFieldValidations();
});

Then('finally, the admin fills in all mandatory fields and successfully creates the material', async () => {
  await materialPage.createNewMaterial();
});


Then('submits the create order form after filling in the required order details', async () => {
  await materialPage.clickOnCreateOrderButton();
});


Then('click on the link', async () => {
  await materialPage.clickonLink();
});
