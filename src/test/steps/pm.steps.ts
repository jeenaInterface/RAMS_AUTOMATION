import { Given, When, Then } from "@cucumber/cucumber";
import PMPage from "../../pages/pm.page";
import { fixture } from "../../hooks/pageFixture";

let pmPage: PMPage;


When('the admin navigates to the maintain PM', async () => {
  pmPage = new PMPage(fixture.page);
  await pmPage.navigateToMaintainPM();
});

Then('Select any asset group', async () => {
  await pmPage.selectAssetGroup();
});

Then('Create a pm for per usage', async () => {
  await pmPage.createPmPerUsage();
});

Then('Click on update button and edit pm name', async () => {
  await pmPage.updatePm();
});

Then('Create a pm for per calendar', async () => {
  await pmPage.selectAssetGroup()
  await pmPage.createPmPerCalendar();
});


Then('verify action log', async () => {
  await pmPage.verifyActionLog();
});

Then('delete the entry created for per usage', async () => {
  await pmPage.verifyDeleteFunctionality();
});
Then('delete the entry created for per calendar', async () => {
  await pmPage.verifyDeleteFunctionality();
});



Then('Create an unbillable order with latest pm details created', async () => {
  await pmPage.clickOnCreateUnbillableOrderMenu();
  await pmPage.CreateNewOrderForFirstShift('1 - No');
  await pmPage.bombCartasstDetails();
  await pmPage.clickOnCompleteButtonNoStatus();
  await pmPage.clickOnCloseButtonNoStatus();
});
Then('go to batch update asset usage screen', async () => {
  pmPage = new PMPage(fixture.page);
  await pmPage.goToBatchUpdateAssetUsageScreen();
  await pmPage.verifyLastUpdateUsage();
});
Then('delete the entry created for per usage after verify the us', async () => {
  await pmPage.navigateToMaintainPM();
  await pmPage.selectAssetGroupForDelete();
  await pmPage.verifyDeleteFunctionality();
});

Then('Edit last usage entry usage', async () => {
  await pmPage.currentusage();
});


Then('go to create unbillable order and verify the updated pm hour is showing', async () => {
  await pmPage.clickOnCreateUnbillableOrderMenu();
  await pmPage.CreateNewOrderForFirstShift('1 - No');
  await pmPage.bombCartasstDetailsVerifypmHours();
});

Then('go to inquire unbillable order page and cancel the unbillable order created for pm', async () => {
  await pmPage.clickOnInquireUnbillableOrderMenu();
  await pmPage.searchbyWONumber();
  await pmPage.clickOnCancelButton();
});
Then('go to maintain pm page and try to delete the entry created for per usage', async () => {
  await pmPage.navigateToMaintainPM();;
  await pmPage.selectAssetGroupForDelete();
  await pmPage.verifyDeleteFunctionalityToverifyMessage();
});
Then('go to maintain pm page and delete the entry created for per usage', async () => {
  await pmPage.navigateToMaintainPM();;
  await pmPage.selectAssetGroupForDelete();
  await pmPage.verifyDeleteFunctionality();
});
Then('verify there is a validation showing as There exist not cancelled work order that related to this PM Group', async () => {
  await pmPage.verifywoexistsMessage();
});


