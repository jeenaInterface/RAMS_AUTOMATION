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
});
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
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOT();
});
Then('capture the ST and OT hours in payroll screen', async function (this: any) {
  let st = unbillableOrderPage.ST;
  let ot = unbillableOrderPage.OT;
  if (this && typeof this.attach === 'function') {
    await this.attach(`ST: ${st}, OT: ${ot}`, 'text/plain');
  } else {
    fixture.logger?.info(`Unbillable Work Order: ST: ${st}, OT: ${ot}`);
  }
});
Then('capture the ST and OT hours approve payroll screen', async function (this: any) {
  let st = unbillableOrderPage.ST;
  let ot = unbillableOrderPage.OT;
  if (this && typeof this.attach === 'function') {
    await this.attach(`ST: ${st}, OT: ${ot}`, 'text/plain');
  } else {
    fixture.logger?.info(`Unbillable Work Order: ST: ${st}, OT: ${ot}`);
  }
});
Then('Open the Show Detail of WOs for the created WO and click on the WO link in the approve payroll screen', async () => {
  await unbillableOrderPage.clickonWObUttonInPayrollScreenApprovePayroll();
});
Then('Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link', async () => {
  await unbillableOrderPage.clickonWObUttonInPayrollScreen();
});

Then('cancel the created unbillable work order', async () => {
  await unbillableOrderPage.clickOnCancelButtonAfterVerifyPayroll();
});

Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift after cancelling the WO', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTAfterCancel();
});
When('Create a WO for weekday and select overtime in hour type for first shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollOT('1 - No');
  await unbillableOrderPage.asst8Details();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select straight time in hour type for second shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollSecondShift('1 - No');
  await unbillableOrderPage.asst8Details();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTSecondShiftNormal();
});

Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift after cancelling the WO', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTAfterCancelSecondShiftNormal();
});

Then('Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for second shift', async () => {
  await unbillableOrderPage.clickonWObUttonInPayrollScreenSecondShiftNormal();
});
Then('Open the Show Detail of WOs for the created WO and click on the WO link for second shift in the approve payroll screen', async () => {
  await unbillableOrderPage.clickonWObUttonInPayroll_second_ScreenApprovePayroll();
});
When('Create a WO for weekday and select straight time in hour type for third shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollThirdShift('1 - No');
  await unbillableOrderPage.asst8DetailsForThirdShift();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTThirdShiftNormal();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift after cancelling the WO', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTAfterCancelThirdShiftNormal();
});
Then('Open the Show Detail of WOs in payroll screen for the created WO and click on the WO link for third shift', async () => {
  await unbillableOrderPage.clickonWObUttonInPayrollScreenThirdShiftNormal();
});
Then('Open the Show Detail of WOs for the created WO and click on the WO link for third shift in the approve payroll screen', async () => {
  await unbillableOrderPage.clickonWObUttonInPayrollScreenThirdShiftNormalApproveScreen();
});
When('Create a WO for weekday and select overtime in hour type for second shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollSecondShiftOT('1 - No');
  await unbillableOrderPage.asst8Details();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select overtime in hour type for third shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForVerifyPayrollThirdShiftOT('1 - No');
  await unbillableOrderPage.asst8DetailsForThirdShift();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select straight time in hour type for first shift with special shift as Vessel Sail and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollVesselSail('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for Vessel Sail', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTForVessel();
});
When('Create a WO for weekday and select straight time in hour type for second shift with special shift as Vessel Sail and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollSecondShift('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for Vessel Sail', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTSecondShiftForVessel();
});
When('Create a WO for weekday and select straight time in hour type for third shift with special shift as Vessel Sail and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollThirdShift('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for Vessel Sail', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTThirdShiftForVessel();
});
When('Create a WO for weekday and select overtime in hour type for first shift with special shift as Vessel Sail and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollOT('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select overtime in hour type for second shift with special shift as Vessel Sail and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollSecondShiftOT('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select overtime in hour type for third shift with special shift as Vessel Sail and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForVerifyPayrollThirdShiftOT('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select straight time in hour type for first shift with special shift as four and Go and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayroll('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for four and Go', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTForVessel();
});
When('Create a WO for weekday and select straight time in hour type for second shift with special shift as four and Go and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollSecondShift('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for four and Go', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTSecondShiftForVessel();
});
When('Create a WO for weekday and select straight time in hour type for third shift with special shift as four and Go and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollThirdShift('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for four and Go', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTThirdShiftForVessel();
});
When('Create a WO for weekday and select overtime in hour type for first shift with special shift as four and Go and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollOT('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select overtime in hour type for second shift with special shift as four and Go and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollSecondShiftOT('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});

When('Create a WO for weekday and select overtime in hour type for third shift with special shift as four and Go and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForVerifyPayrollThirdShiftOT('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select straight time in hour type for first shift with special shift as PMA Training and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayroll('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for PMA Training', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTForVessel();
});
When('Create a WO for weekday and select straight time in hour type for second shift with special shift as PMA Training and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollSecondShift('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for PMA Training', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTSecondShiftForVessel();
});
When('Create a WO for weekday and select straight time in hour type for third shift with special shift as PMA Training and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollThirdShift('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for PMA Training', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTThirdShiftForVessel();
});
When('Create a WO for weekday and select overtime in hour type for first shift with special shift as PMA Training and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftToVerifyPayrollOT('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select overtime in hour type for second shift with special shift as PMA Training and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollSecondShiftOT('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});
When('Create a WO for weekday and select overtime in hour type for third shift with special shift as PMA Training and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForVerifyPayrollThirdShiftOT('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatusOT();
});

When('Create a WO for weekend and select overtime in hour type for first shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftWeekEnd('1 - No');
  await unbillableOrderPage.asst8Details();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTForWeekend();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend after cancelling the WO', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTAfterCancel();
});

When('Create a WO for weekend and select overtime in hour type for second shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollSecondShiftOTWeekEnd('1 - No');
  await unbillableOrderPage.asst8Details();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTSecondShiftForWeekEndNormal();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend after cancelling the WO', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();

  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTAfterCancelSecondShiftNormal();
});

When('Create a WO for weekend and select overtime in hour type for third shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollThridShiftOTWeekEnd('1 - No');
  await unbillableOrderPage.asst8DetailsForThirdShift();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});

Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTThirdShiftForWeekEndNormal();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend after cancelling the WO', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTAfterCancelThirdShiftNormal();
});

When('Create a WO for weekend for the special shift vessel sail and select overtime in hour type for first shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftWeekEnd('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend for the special shift vessel sail', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTForWeekendForVesselSailFirstShift();
});

When('Create a WO for weekend for the special shift vessel sail and select overtime in hour type for second shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollSecondShiftOTWeekEnd('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend for the special shift vessel sail', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTSecondShiftForWeekEndVesselSAIL();
});

When('Create a WO for weekend for the special shift vessel sail and select overtime in hour type for third shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollThridShiftOTWeekEnd('2 - Vessel Sail');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend for the special shift vessel sail', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTThirdShiftForWeekEndVesselSAIL();
});
When('Create a WO for weekend for the special shift four and Go and select overtime in hour type for first shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftWeekEnd('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend for the special shift four and Go', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTForWeekendForVesselSailFirstShift();
});

When('Create a WO for weekend for the special shift four and Go and select overtime in hour type for second shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollSecondShiftOTWeekEnd('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend for the special shift four and Go', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTSecondShiftForWeekEndVesselSAIL();
});

When('Create a WO for weekend for the special shift four and Go and select overtime in hour type for third shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollThridShiftOTWeekEnd('3 - 4 and Go');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend for the special shift four and Go', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTThirdShiftForWeekEndVesselSAIL();
});

When('Create a WO for weekend for the special shift PMA Training and select overtime in hour type for first shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShiftWeekEnd('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for first shift for weekend for the special shift PMA Training', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('1 - First Shift');
  await unbillableOrderPage.STandOTForWeekendForVesselSailFirstShift();
});

When('Create a WO for weekend for the special shift PMA Training and select overtime in hour type for second shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollSecondShiftOTWeekEnd('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for second shift for weekend for the special shift PMA Training', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('2 - Second Shift');
  await unbillableOrderPage.STandOTSecondShiftForWeekEndVesselSAIL();
});

When('Create a WO for weekend for the special shift PMA Training and select overtime in hour type for third shift and close the WO', async () => {
  await unbillableOrderPage.CreateNewOrderToVerifyPayrollThridShiftOTWeekEnd('4 - PMA Training');
  await unbillableOrderPage.asst8DetailsForVesselSail();
  await unbillableOrderPage.clickOnDraftButton1();
  await unbillableOrderPage.clickOnCompleteButtonNoStatus();
  await unbillableOrderPage.clickOnCloseButtonNoStatus();
});
Then('the admin navigates to the payroll screen and verify ST and OT for the created WO for third shift for weekend for the special shift PMA Training', async () => {
  await unbillableOrderPage.navigateToPayrollReviewScreen();
  await unbillableOrderPage.datePayrollScreen();
  await unbillableOrderPage.verifyShopInPayrollScreen();
  await unbillableOrderPage.verifyShiftInPayrollScreen('3 - Third Shift');
  await unbillableOrderPage.STandOTThirdShiftForWeekEndVesselSAIL();
});

Then('confirm that the IsLead checkbox is checked by default', async () => {
  await unbillableOrderPage.verifyLeadManCheckBox();
});
Then('confirm that the IsLead checkbox is not checked by default', async () => {
  await unbillableOrderPage.verifyLeadManCheckBoxNotChecked();
});
When('enters all the required fields for unbillable work order and and select Is PM work order checkbox then clicks on the Draft button for bombcart asset', async () => {
  await unbillableOrderPage.CreateNewOrderForFirstShift('1 - No');
  await unbillableOrderPage.bombCartasstDetails();
  await unbillableOrderPage.clickOnDraftButton();
});
Then('Select safty talk subject', async () => {
  await unbillableOrderPage.saftyTalkSubject();
});
Then('Click on review button and confirm the success message', async () => {
  await unbillableOrderPage.ClickReviewButton();
});
Then('go to approve payroll screen and verify ST and OT for the created WO for first shift', async () => {
  await unbillableOrderPage.approvePayrollMenuWeekDay();
  await unbillableOrderPage.firstShiftCheckBox();
  await unbillableOrderPage.STandOTApprovePayroll();

});
Then('go to approve payroll screen and verify ST and OT for the created WO for second shift', async () => {
  await unbillableOrderPage.approvePayrollMenuWeekDay();
  await unbillableOrderPage.secondShiftCheckBox();
  await unbillableOrderPage.STandOTSecondShiftNormalApprovePayroll();

});
Then('go to approve payroll screen and verify ST and OT for the created WO for third shift', async () => {
  await unbillableOrderPage.approvePayrollMenuWeekDay();
  await unbillableOrderPage.thirdShiftCheckBox();
  await unbillableOrderPage.STandOTThirdShiftNormalApproveScreen();

});
Then('go to approve payroll screen and verify ST and OT for the created WO for first shift for vessel sail', async () => {
  await unbillableOrderPage.approvePayrollMenuWeekDay();
  await unbillableOrderPage.firstShiftCheckBox();
  await unbillableOrderPage.STandOTForVesselApprovePayroll();

});


