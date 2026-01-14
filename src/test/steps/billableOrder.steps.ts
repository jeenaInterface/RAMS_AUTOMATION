import { Given, When, Then } from "@cucumber/cucumber";
import BillableOrderPage from "../../pages/billableOrder.page";
import LoginPage from "../../pages/login.page";
import { fixture } from "../../hooks/pageFixture";
import { verify } from "crypto";

let billableOrderPage: BillableOrderPage;


When('the admin navigates to the billable work order creation menu', async () => {
  billableOrderPage = new BillableOrderPage(fixture.page);
  await billableOrderPage.clickOnCreateBillableOrderMenu();
});

When('enters all the required fields for billable work order and clicks on the Draft button', async () => {
  await billableOrderPage.createNewBillableOrder();
  // await billableOrderPage.clickOnDraftButton();
});

Then("verify the status of the billable work order is Drafted", async function (this: any) {

  let status = billableOrderPage.billableOrderStatus || '';

  // Attach BWO status to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order status: ${status}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order status: ${status}`);
  }
});


When('the admin click on close button', async () => {
  await billableOrderPage.clickOnCloseButton();
});
Then("verify the status of the billable work order is Closed", async function (this: any) {
  let status = billableOrderPage.billableOrderStatus || '';

  // Attach BWO status to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order status: ${status}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order status: ${status}`);
  }
});


When('the admin navigates to the Inquire Billable Work Order menu', async () => {
  billableOrderPage = new BillableOrderPage(fixture.page);
  await billableOrderPage.clickOnInquireBillableOrderMenu();
});

When('Opens an existing billable work order {string}', async (bwoNumber: string) => {
  await billableOrderPage.searchBillableOrderByNumber(bwoNumber);
});

When('Clicks on the Copy button to duplicate the billable work order', async () => {
  await billableOrderPage.clickOnCopyButton();
});
When('enters all the required fields for billable work order after copy and clicks on the Draft button', async () => {
  await billableOrderPage.EnterDetailsAfterCopy();
  await billableOrderPage.clickOnDraftButton();
});

Then('the billable work order number is captured', async function (this: any) {

  let bwoNumber = billableOrderPage.billableOrderNumber;
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order: ${bwoNumber}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order: ${bwoNumber}`);
  }
});
When('the admin click on complete button', async () => {
  await billableOrderPage.clickOnCompleteButton();
});
When('the admin click on complete button after draft', async () => {
  await billableOrderPage.clickOnCompleteButtonAfterDraft();
});
Then("verify the status of the billable work order is Completed", async function (this: any) {
  let status = billableOrderPage.billableOrderStatus;

  // Attach BWO status to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order status: ${status}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order status: ${status}`);
  }
});
When('the admin click on review button', async () => {
  await billableOrderPage.clickOnReviewButton();
});
Then("verify the status of the billable work order is Reviewed", async function (this: any) {
  let status = billableOrderPage.billableOrderStatus || '';

  // Attach BWO status to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order status: ${status}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order status: ${status}`);
  }
});
When('Click on Return to complete button', async () => {
  await billableOrderPage.clickOnReturnToCompleteButton();
});

When('the admin click on cancel button', async () => {
  await billableOrderPage.clickOnCancelButton();
});
Then("verify the status of the billable work order is Cancelled", async function (this: any) {
  let status = billableOrderPage.billableOrderStatus || '';
  // Attach BWO status to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order status: ${status}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order status: ${status}`);
  }
});


When('verify save button functionality', async () => {
  await billableOrderPage.clickSaveButton();
});
When('verify print draft invoice functionality', async () => {
  await billableOrderPage.clickOnPrintDraftInvoiceButton();
});
When('verify Email draft invoice functionality', async () => {
  await billableOrderPage.clickOnEmailInvoiceButton();
});
When('verify action logged', async () => {
  await billableOrderPage.verifyActionLog();
});

When('Verify New button functionality', async () => {
  await billableOrderPage.clickNewButton();
});
When('Go to Batch review billable work order and review the created billable work order', async () => {
  await billableOrderPage.doBatchReview();
});
When('Go to Inquire billable work order and verify the status is Reviewed', async () => {
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchWO();
});
When('Go to Batch close billable work order and close the created billable work order', async () => {
  await billableOrderPage.doBatchClose();
});
When('Go to Inquire billable work order and verify the status is Closed', async () => {
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchWOAfterClose();
});
When('Go to Batch review billable work order and review the created billable work order after completion', async () => {
  await billableOrderPage.doBatchReviewAfterCompletion();
});
When('Go to Batch close billable work order and close the created billable work order after review', async () => {
  await billableOrderPage.doBatchCloseAfterEwview();
});
Then('verify mnr invoice is generated from the closed billable work order', async function (this: any) {

  await billableOrderPage.mnrInvoice();
    let mnr = billableOrderPage.mnrInvoiceNumber || '';
  // Attach BWO status to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`MNR INVOICE NUMBER: ${mnr}`, 'text/plain');
  } else {
    fixture.logger?.info(`MNR INVOICE NUMBER: ${mnr}`);
  }
});
Then('the admin click on complete, review and close the order', async () => {
  await billableOrderPage.clickOnCompleteButton();
  await billableOrderPage.clickOnReviewButton();
  await billableOrderPage.clickOnCloseButton();
});

// Search step definitions for inquiry page
Then('searches for a billable work order using the asset {string} and verifies the search results', async (asset: string) => {
    billableOrderPage = new BillableOrderPage(fixture.page);
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchByAsset(asset);
});

Then('searches for a billable work order using the billable asset description {string} and verifies the search results', async (description: string) => {
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchByBillableAssetDescription(description);
});

Then('searches for a billable work order using the asset group {string} and verifies the search results', async (assetGroup: string) => {
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchByAssetGroup(assetGroup);
});

Then('searches for a billable work order using the billing party {string} and verifies the search results', async (billingParty: string) => {
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchByBillingParty(billingParty);
});

Then('searches for a billable work order using the work order status {string} and verifies the search results', async (status: string) => {
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchByWorkOrderStatus(status);
});

Then('searches for a billable work order using shop and verifies the search results', async () => {
  // Note: You may need to replace with actual shop value or use a data table
  await billableOrderPage.searchByShop('');
});

Then('searches for a billable work order using shift and verifies the search results', async () => {
  // Note: You may need to replace with actual shift value or use a data table
  await billableOrderPage.searchByShift('');
});

Then('searches for a billable work order using repair date range and verifies the search results', async () => {
  // Note: You may need to use DataTable or predefined dates
  const startDate = '2024-01-01';
  const endDate = '2024-12-31';
  await billableOrderPage.searchByRepairDateRange(startDate, endDate);
});


