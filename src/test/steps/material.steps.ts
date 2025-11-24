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

Then('the Purchase Order number is captured for further use', async function (this: any) {
  // Ensure materialPage is initialized
  materialPage = materialPage || new MaterialPage(fixture.page);
  // Prefer the stored property set during create-order flow
  let po = materialPage.purchaseOrderNo || '';
  // Fallback: try reading the header directly from the current page
  if (!po) {
    const headerText = (await fixture.page.locator("(//span[@class='header-title font-size-title'])[1]").textContent()) || '';
    po = headerText.match(/\|\s*(\d+)\s*\(/)?.[1] || headerText.match(/(\d+)/)?.[1] || '';
  }
  // Attach PO number to Cucumber report so it appears in HTML report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Purchase Order: ${po}`);
  } else {
    // Fallback logging
    fixture.logger?.info(`Purchase Order: ${po}`);
  }
});

Then('the created Stock No is captured for further use', async function (this: any) {
  // materialPage = materialPage || new MaterialPage(fixture.page);
// 
  // Prefer the stock number returned by createNewMaterial and stored on the page object
  const stock = materialPage.stockNo || '';
  if (!stock) {
    fixture.logger?.warn('Stock No is empty; ensure createNewMaterial() returned and set it');
  }
  if (this && typeof this.attach === 'function') {
    await this.attach(`Stock No: ${stock}`);
  } else {
    fixture.logger?.info(`Stock No: ${stock}`);
  }
});

Then('Do receive material and review for the created order', async () => {
  await materialPage.createReceiveMaterial();

});

Then('verifies that the order track is recorded under the material details', async () => {

  await materialPage.verifyOrderTrack();
});

Then('track the receiving document number for further use', async function (this: any) {
  // Ensure materialPage is initialized
  materialPage = materialPage || new MaterialPage(fixture.page);

  // Prefer stored property if set during previous flow
  let receivingDocNo = materialPage.ReceivingDocumentNo || '';

  // Fallback: read from header if not already stored
  if (!receivingDocNo) {
    const headerText = (await fixture.page.locator("(//span[@class='header-title font-size-title'])[1]").textContent()) || '';
    // Extract number after "Receiving Doc. No.:"
    receivingDocNo = headerText.match(/Receiving Doc\. No\.\s*:\s*(\d+)/)?.[1] || '';
  }

  // Attach Receiving Doc number to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Receiving Document No: ${receivingDocNo}`);
  } else {
    fixture.logger?.info(`Receiving Document No: ${receivingDocNo}`);
  }

  // Optionally store it for later use
  materialPage.ReceivingDocumentNo = receivingDocNo;
});
Then('Verify OH quantity is updated in material after receiving the material', async () => {

  await materialPage.verifyStockLocation();
  await materialPage.verifyStockCount();
});



Then('Go to material recive module and Cancel the the created recive done earlier', async () => {

  await materialPage.canceltheMaterialReceive();

});


Then('Verify the OH quantity is reverted back', async () => {

  await materialPage.verifyStockCountAfterCancel();

});


Then('Do transfer material to another location', async () => {

  await materialPage.transferLocation();

});
Then('Verify OH quantity and location are updated in material after transfer the material', async () => {

  await materialPage.verifyStockLocationAfterTransfer();
  await materialPage.verifyStockCountAfterTransfer();
});

Then('the admin verifies that the transfer is recorded in the materials action log', async () => {

  await materialPage.verifyActionLogAfterTransfer();

});
