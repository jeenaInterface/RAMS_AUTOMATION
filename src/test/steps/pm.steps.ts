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

// When('Create an unbillable order having pm and copy the pm hours', async () => {
//   pmPage = new PMPage(fixture.page);
//   // Navigate to unbillable order and create
//   await pmPage.createUnbillableOrderWithPm();
//   // Copy PM hours for later comparison
//   await pmPage.copyPmHours();
// });

// Then('go to batch update asset usage screen and verify the last update usage of the asset', async () => {
//   await pmPage.goToBatchUpdateAssetUsageScreen();
//   await pmPage.verifyLastUpdateUsage();
// });

// Then('verify the pm hours are matching in unbillable order and batch update asset usage screen', async () => {
//   await pmPage.verifyPmHoursMatching();
// });

// When('go to Batch Update Asset Usage', async () => {
//   pmPage = new PMPage(fixture.page);
//   await pmPage.goToBatchUpdateAssetUsageScreen();
// });

// Then('update current usage and click on save button', async () => {
//   await pmPage.updateCurrentUsage();
//   await pmPage.clickSaveButton();
// });

// Then('verify downloadusage functyionality - reharse the feature file', async () => {
//   await pmPage.verifyDownloadUsage();
// });
