import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import TimesheetReportPageInstance from '../../pages/report_CreateTimeSheetReport.page';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';

let TimesheetReportPage: TimesheetReportPageInstance;
let inventoryReport: InventoryReportPage;

When('selects create timesheet report', async function () {
  TimesheetReportPage = new TimesheetReportPageInstance(fixture.page);
  inventoryReport = new InventoryReportPage(fixture.page);
  await TimesheetReportPage.clickOnOrderReportMenu();
});
When('selects all the filters for timesheet report', async function () {
  await TimesheetReportPage.selectFiltration();
});
When('verifies save functionality for timesheet report', async function () {
  await TimesheetReportPage.saveReport();
});
When('verifies save as functionality for timesheet report', async function () {
  await TimesheetReportPage.saveAsReport();
});
When('the admin clicks on the run button and the timesheet report should be generated successfully', async function () {

  const filePath = await TimesheetReportPage.downloadReport();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

});
Then('go to report template and verifies the timesheet report template is displayed in the list', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await TimesheetReportPage.SearchWithReportName();

});
Then('click on the search icon and verifies the page is redirect to timesheet report details page', async function () {
  await inventoryReport.VerifySearchFunctionality();
});
Then('click on download icon and verifies the timesheet report is downloaded successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await TimesheetReportPage.SearchWithReportName();
  const filePath = await inventoryReport.verifyDownloadFunctionality();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
});
When('click on schedule icon and verifies the timesheet report is scheduled successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await TimesheetReportPage.SearchWithReportName();
  await inventoryReport.verifyScheduleFunctionality();
});
When('click on delete icon and verifies the timesheet report is deleted successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await TimesheetReportPage.SearchWithReportName();
  await inventoryReport.verifyDeleteFuctionlity();
});

