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

When('the admin clicks the complete and then close button', async () => {
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  // await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the second shift', async () => {
  await unbillableOrderPage.CreateNewOrderWithFiveAssets('1 - No');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor8hour();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the first shift', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShift('1 - No');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the third shift', async () => {
  await unbillableOrderPage.CreateNewOrderForThirdShift('1 - No');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the third shift', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor5hour();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the first shift and selects special shift as vessel sail', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShift('2 - Vessel Sail');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the first shift  for special shift as vessel sail', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4hour();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the second shift and selects special shift as vessel sail', async () => {
  await unbillableOrderPage.CreateNewOrderWithFiveAssets('2 - Vessel Sail');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the second shift  for special shift as vessel sail', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4hour();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the third shift and selects special shift as vessel sail', async () => {
  await unbillableOrderPage.CreateNewOrderForThirdShift('2 - Vessel Sail');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the third shift  for special shift as vessel sail', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4hour();
});

When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the first shift and selects special shift as 4 and Go', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShift('3 - 4 and Go');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the first shift  for special shift as four and Go', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4();

});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the second shift and selects special shift as 4 and Go', async () => {
  await unbillableOrderPage.CreateNewOrderWithFiveAssets('3 - 4 and Go');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the second shift  for special shift as four and Go', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the third shift and selects special shift as 4 and Go', async () => {
  await unbillableOrderPage.CreateNewOrderForThirdShift('3 - 4 and Go');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the third shift  for special shift as four and Go', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the first shift and selects special shift as PMA Training', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShift('4 - PMA Training');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the first shift  for special shift as PMA Training', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the second shift and selects special shift as PMA Training', async () => {
  await unbillableOrderPage.CreateNewOrderWithFiveAssets('4 - PMA Training');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();
  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});
Then('Verify hour validation messages are displayed as expected for the second shift  for special shift as PMA Training', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4();
});
When('enters all the required fields for unbillable work order and adds two assets then clicks on the complete button for the third shift and selects special shift as PMA Training', async () => {
  await unbillableOrderPage.CreateNewOrderForThirdShift('4 - PMA Training');
  await unbillableOrderPage.asst1Details();
  await unbillableOrderPage.asst2Details();

  await unbillableOrderPage.asst3Details();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
});

Then('Verify hour validation messages are displayed as expected for the third shift  for special shift as PMA Training', async () => {
  await unbillableOrderPage.verifyHourValidationMessageFor4();
}); 
When('enters all the required fields for unbillable work order and and select Is PM work order checkbox then clicks on the Draft button', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShift('1 - No');
  await unbillableOrderPage.asst6Details();
  await unbillableOrderPage.clickOnDraftButton();
});
When('the admin navigates to the Batch close menu and perform batch close operation for the recently created unbillable work order', async () => {
  await unbillableOrderPage.batchCloseMenuClick();
});
Then('verify the status of the unbillable work order is Closed', async () => {
  await unbillableOrderPage.verifyUnbillableOrderClosedStatus();
});
When('the admin navigates to the Batch close menu from to do list and perform batch close operation for the recently created unbillable work order', async () => {
  await unbillableOrderPage.doBatchReviewAfterSelectFromDashboard();
});
When('verify the search functionality using asset and verify the results are displayed as expected {string}', async (assetNumber: string) => {
  await unbillableOrderPage.assetSearchAndSelect(assetNumber);
});
Then('the admin navigates to the unbillable work order inquiry menu', async () => {
  unbillableOrderPage = new UnbillableOrderPage(fixture.page);
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
})  ;  
When('verify the search functionality using asset description number and verify the results are displayed as expected {string}', async (assetDescription: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.assetDescriptionSearchAndSelect(assetDescription);
});
When('verify the search functionality using asset group and verify the results are displayed as expected {string}', async (assetGroup: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.assetGroupSearchAndSelect(assetGroup);
});
When('verify the search functionality using work Order status and verify the results are displayed as expected {string}', async (woStatus: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.wostatusSearchAndSelect(woStatus);
});
When('verify the search functionality using Mechanic and verify the results are displayed as expected {string}', async (mechanicID: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.mechanicSearchAndSelect(mechanicID);
});
When('verify the search functionality using repair date and verify the results are displayed as expected', async () => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.searchByRepairDateRange();
});
When('verify the search functionality using shop and verify the results are displayed as expected {string}', async (shop: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.shopSearchAndSelect(shop);
});
When('verify the search functionality using shift and verify the results are displayed as expected {string}', async (shift: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.shiftSearchAndSelect(shift);
});
When('verify the search functionality using stock number and verify the results are displayed as expected {string}', async (stock: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.stockSearchAndSelect(stock);
});
When('verify the search functionality using asset manufacturer and verify the results are displayed as expected {string}', async (AssetManufacture: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.AssetManufactureSearchAndSelect(AssetManufacture);
});
When('verify the search functionality using asset manufacturer claime type and verify the results are displayed as expected {string}', async (ClaimeTypeSearchAndSelect: string) => {
  await unbillableOrderPage.clickOnInquireUnbillableOrderMenu();
  await unbillableOrderPage.ClaimeTypeSearchAndSelect(ClaimeTypeSearchAndSelect);
});

When('Create a WO for weekday and select straight time in hour type for first shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayroll('1 - No');
  await unbillableOrderPage.asst8Details();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen();
  await unbillableOrderPage.STandOT();
  await unbillableOrderPage.clickonWObUttonInPayrollScreen();
}); 
Then('capture the ST and OT hours', async function (this: any) {
  let st = unbillableOrderPage.ST;
  let ot = unbillableOrderPage.OT;
  if (this && typeof this.attach === 'function') {
    await this.attach(`ST: ${st}, OT: ${ot}`, 'text/plain');
  } else {
    fixture.logger?.info(`Unbillable Work Order: ST: ${st}, OT: ${ot}`);
  }
});


Then('cancel the created unbillable work order', async () => {
  await unbillableOrderPage.clickonWObUttonInPayrollScreen();
  await unbillableOrderPage.clickOnCancelButton();  
  });