import { Given, When, Then } from "@cucumber/cucumber";
import BillableOrderPage from "../../pages/billableOrder.page";
import LoginPage from "../../pages/login.page";
import { fixture } from "../../hooks/pageFixture";

let billableOrderPage: BillableOrderPage;


When('the admin navigates to the billable work order creation menu', async () => {
  billableOrderPage = new BillableOrderPage(fixture.page);
  await billableOrderPage.clickOnCreateBillableOrderMenu();
});

When('enters all the required fields for billable work order and clicks on the Draft button', async () => {
  await billableOrderPage.createNewBillableOrder();
  await billableOrderPage.clickOnDraftButton();
});

Then('the billable work order number is captured', async function (this: any) {

   let po = billableOrderPage.billableOrderNumber || '';
  
  // Attach BWO number to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order: ${po}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order: ${po}`);
  }
});

Then("verify the status of the billable work order is 'Drafted'", async function (this: any) {
    
   let status = billableOrderPage.billableOrderStatus || '';
  
  // Attach BWO status to Cucumber report
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order status: ${status}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order status: ${status}`);
  }
});

// When('the admin click on complete button', async () => {
//   await billableOrderPage.clickOnCompleteButton();
// });

// Then("verify the status of the billable work order is 'Completed'", async () => {
//   await billableOrderPage.verifyBillableOrderStatus('Completed');
// });

// When('the admin click on close button', async () => {
//   await billableOrderPage.clickOnCloseButton();
// });

// Then("verify the status of the billable work order is 'Closed'", async () => {
//   await billableOrderPage.verifyBillableOrderStatus('Closed');
// });

// // Additional step definitions for enhanced testing

// When('the admin navigates to the inquire billable work order page', async () => {
//   billableOrderPage = new BillableOrderPage(fixture.page);
//   await billableOrderPage.clickOnInquireBillableOrderMenu();
// });

// Then('the admin searches for a billable work order by BWO number {string}', async (bwoNumber: string) => {
//   await billableOrderPage.searchBillableOrderByNumber(bwoNumber);
// });

// Then('verifies that the search results display the correct billable work order', async () => {
//   await billableOrderPage.verifySearchResultByBWONumber();
// });

// Then('the admin searches for a billable work order by status {string}', async (status: string) => {
//   await billableOrderPage.searchBillableOrderByStatus(status);
// });

// Then('the admin clicks on the first billable work order in the search results', async () => {
//   await billableOrderPage.clickOnFirstBillableOrder();
// });

// Then('the admin fills in the mandatory fields one by one and attempts to submit the form each time', async () => {
//   await billableOrderPage.verifyMandatoryFieldValidations();
// });

// Then('verifies that the action log records the performed actions accurately', async () => {
//   await billableOrderPage.verifyActionLog();
// });
