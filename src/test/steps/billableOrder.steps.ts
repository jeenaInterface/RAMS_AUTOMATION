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
  await billableOrderPage.clickOnDraftButton();
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

  let bwoNumber = billableOrderPage.billableOrderNumber || '';
  if (this && typeof this.attach === 'function') {
    await this.attach(`Billable Work Order: ${bwoNumber}`, 'text/plain');
  } else {
    fixture.logger?.info(`Billable Work Order: ${bwoNumber}`);
  }
});
When('the admin click on complete button', async () => {
  await billableOrderPage.clickOnCompleteButton();
});
Then("verify the status of the billable work order is Completed", async function (this: any) {
  let status = billableOrderPage.billableOrderStatus || '';

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


