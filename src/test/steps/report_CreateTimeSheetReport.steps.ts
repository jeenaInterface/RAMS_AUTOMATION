import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import TimesheetReportPageInstance from '../../pages/report_CreateTimeSheetReport.page';

let TimesheetReportPage:TimesheetReportPageInstance;

When('selects create timesheet report', async function () {
  TimesheetReportPage = new TimesheetReportPageInstance(fixture.page);
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
