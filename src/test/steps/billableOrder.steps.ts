import { Given, When, Then } from "@cucumber/cucumber";
import BillableOrderPage from "../../pages/billableOrder.page";
import LoginPage from "../../pages/login.page";
import { fixture } from "../../hooks/pageFixture";
import { verify } from "crypto";
import { create } from "domain";
import { link } from "fs/promises";

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

Then('searches for a billable work order using shop and verifies the search results {string}', async (shop: string) => {
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchByShop(shop);
});

Then('searches for a billable work order using shift and verifies the search results {string}', async (shift: string) => {
  // Note: You may need to replace with actual shift value or use a data table
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchByShift(shift);
});

Then('searches for a billable work order using repair date range and verifies the search results', async () => {
  // Note: You may need to use DataTable or predefined dates
  await billableOrderPage.clickOnInquireBillableOrderMenu();
  await billableOrderPage.searchByRepairDateRange();
});

Then('go to inquire mnr invoice and verify the created mnr invoice from the closed billable work order', async () => {
  await billableOrderPage.verifyMNRInvoice();
});

Then('create MNR credit for the closed billable work order', async () => {
  await billableOrderPage.createMNRCredit();
});

Then('go to inquire billable work order and verify an entry is created for the created mnr credit', async () => {
  await billableOrderPage.verifyCreditNumberINWO();
});

Then('capture the MNR credit number', async function (this: any) {

  let mnrCreditNum = billableOrderPage.mnrCreditNumber;
  if (this && typeof this.attach === 'function') {
    await this.attach(`MNR CREDIT NUMBER: ${mnrCreditNum}`, 'text/plain');
  } else {
    fixture.logger?.info(`MNR CREDIT NUMBER: ${mnrCreditNum}`);
  }
});


Then('verify save functionality in MNR credit creation', async () => {
  await billableOrderPage.verifySaveCredit();
}
);
Then('verify cancel functionality in MNR credit creation', async () => {
  await billableOrderPage.verifyCancelCredit();
});

Then('verify action log is created for MNR credit creation', async () => {
  await billableOrderPage.verifyActionLogCredit();
});
Then('Go to Batch close MNR invoice credit and close the created MNR credit', async () => {
  await billableOrderPage.BatchCloseCredit();
});

Then('Go to Batch close from dashboard and close the created MNR credit', async () => {
  await billableOrderPage.BatchCloseCreditAfterSelectBatchCloseFromDashBoard();
});

Then('go to inquire MNR invoice credit and verify the status is Closed', async function (this: any) {
  await billableOrderPage.verifyBatchCloseStatus();
  //attach credit status to report
  let creditStatus = billableOrderPage.creditStatus || '';
  if (this && typeof this.attach === 'function') {
    await this.attach(`MNR CREDIT STATUS: ${creditStatus}`, 'text/plain');
  }
  else {
    fixture.logger?.info(`MNR CREDIT STATUS: ${creditStatus}`);
  }
});
Then('Go to Batch review billable work order from dashboard and review the created billable work order', async () => {
  await billableOrderPage.doBatchReviewAfterSelectFromDashboard();
});

Then('Go to Batch close billable work order from dashboard and close the created billable work order', async () => {
  await billableOrderPage.doBatchCloseFromDashboard();
});
Then('go to batch post invoice credit and post the closed MNR credit', async () => {
  await billableOrderPage.BatchPost();
});

Then('check post Result', async function (this: any) { 
  await billableOrderPage.postStatus();
  //attach credit status to report
  let postStatus = billableOrderPage.postStatusOriginal || '';
  if (this && typeof this.attach === 'function') {
    await this.attach(`MNR CREDIT POST STATUS: ${postStatus}`, 'text/plain');
  } else {
    fixture.logger?.info(`MNR CREDIT POST STATUS: ${postStatus}`);
  }     
});

Then('verify xml generation for the posted MNR credit', async function () {
  const filePath = await billableOrderPage.downloadReport();    
  // Attach a clickable text or path to the report for users to access manually
  if (this.attach) {
      // Attach as plain text or as HTML link if supported
      const sharedFilePathText = `Report available at shared location: ${filePath}`;
      await this.attach(sharedFilePathText, 'text/plain');
  } 
}); 
Then('search for an existing MNR invoice credit and verify the draft invoice number link under Inquire invoice Credit menu', async () => {
  billableOrderPage = new BillableOrderPage(fixture.page);
  await billableOrderPage.verifyDraftInvoiceNumberLink();
});

Then('search for an existing MNR invoice credit and verify the WO number link under Inquire invoice Credit menu', async () => {
  await billableOrderPage.verifyWONumberLink();
});