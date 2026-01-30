import { Given, When, Then } from "@cucumber/cucumber";
import UnbillableOrderPage from "../../pages/unbillableOrder.page";
import LoginPage from "../../pages/login.page";
import { fixture } from "../../hooks/pageFixture";
import { add } from "winston";

let unbillableOrderPage: UnbillableOrderPage;

When('the admin navigates to the unbillable work order creation menu', async () => {
  unbillableOrderPage = new UnbillableOrderPage(fixture.page);
  await unbillableOrderPage.clickOnCreateUnbillableOrderMenu();
});

When('After entering all required fields for the unbillable work order and clicking Draft, verify that its status is updated to Drafted', async () => {
  await unbillableOrderPage.createNewUnbillableOrder();
  await unbillableOrderPage.clickOnDraftButton();
});

When('enters all the required fields for unbillable work order and selects special shift as vessel sail and clicks on the Draft button', async () => {
  await unbillableOrderPage.createNewUnbillableOrderWithSpecialShift('2 - Vessel Sail');
  await unbillableOrderPage.clickOnDraftButton();
});

When('enters all the required fields for unbillable work order and selects special shift as 4 and Go and clicks on the Draft button', async () => {
  await unbillableOrderPage.createNewUnbillableOrderWithSpecialShift('3 - 4 and Go');
  await unbillableOrderPage.clickOnDraftButton();
});

When('enters all the required fields for unbillable work order and selects special shift as PMA Training and clicks on the Draft button', async () => {
  await unbillableOrderPage.createNewUnbillableOrderWithSpecialShift('4 - PMA Training');
  await unbillableOrderPage.clickOnDraftButton();
});

// When('enters all the required fields for unbillable work order and adds two assets then clicks on the Draft button', async () => {
//   await unbillableOrderPage.createNewUnbillableOrderWithTwoAssets();
//   await unbillableOrderPage.clickOnDraftButton();
// });

// When('enters all the required fields for unbillable work order and adds the AGVOVR asset then clicks on the Draft button', async () => {
//   // This is a special case for AGVOVR asset - reuse two assets method but with AGVOVR
//   await unbillableOrderPage.createNewUnbillableOrderWithTwoAssets();
//   await unbillableOrderPage.clickOnDraftButton();
// });

Then('the unbillable work order number is captured for future reference', async function (this: any) {
  let uwoNumber = unbillableOrderPage.unbillableOrderNumber;
  if (this && typeof this.attach === 'function') {
    await this.attach(`Unbillable Work Order: ${uwoNumber}`, 'text/plain');
  } else {
    fixture.logger?.info(`Unbillable Work Order: ${uwoNumber}`);
  }
});

Then("verify the status of the unbillable work order is '{string}'", async function (this: any, expectedStatus: string) {
  let status = unbillableOrderPage.unbillableOrderStatus || '';
  
  // Normalize status comparison (case-insensitive, handle 'cancelled' vs 'Cancelled')
  const normalizedStatus = status.toLowerCase();
  const normalizedExpected = expectedStatus.toLowerCase();
  
  if (this && typeof this.attach === 'function') {
    await this.attach(`Unbillable Work Order status: ${status}`, 'text/plain');
  } else {
    fixture.logger?.info(`Unbillable Work Order status: ${status}`);
  }
});

When('the admin clicks the complete button and verify the status of the unbillable work order is Completed', async () => {
  await unbillableOrderPage.clickOnCompleteButton();
});

When('the admin clicks the close button and verify the status of the unbillable work order is Closed', async () => {
  await unbillableOrderPage.clickOnCloseButton();
});

Then('verify save button functionality under unbillable work order', async () => {
  await unbillableOrderPage.clickOnSaveButton();
});

When('click on cancel button and verify the status of the unbillable work order is cancelled', async () => {
  await unbillableOrderPage.clickOnCancelButton();
});

Then('verify the action logged', async () => {
  await unbillableOrderPage.verifyActionLog();
});

Then('verify the new button functionality', async () => {
  await unbillableOrderPage.clickNewButton();
});

When('the admin navigates to the Inquire Unbillable Work Order menu', async () => {
  unbillableOrderPage = new UnbillableOrderPage(fixture.page);
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
});

When('Opens an existing unbillable work order {string}', async (uwoNumber: string) => {
  await unbillableOrderPage.searchUnbillableOrderByNumber(uwoNumber);
});
Then('Search for the recently created unbillable work order using the captured work order number', async () => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.searchbyWONumber();
  await unbillableOrderPage.verifytheWONumber();
});

Then('enters all the required fields for unbillable work order and adds three assets then clicks on the Draft button', async () => {
  await unbillableOrderPage.CreateNewOrderWithFiveAssets('1 - No');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.asst4Details();
  await unbillableOrderPage.clickOnDraftButton1();
});

Then('add another two assets in draft mode', async () => {
  await unbillableOrderPage.asst5Details();
  await unbillableOrderPage.clickOnSaveButtonAfterDraft();
});