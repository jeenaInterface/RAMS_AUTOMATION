import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import MaterialBalanceReportPageInstance from '../../pages/report_materialBalanceReport.page';
import { fixture } from '../../hooks/pageFixture';

let MaterialBalanceReportPage: MaterialBalanceReportPageInstance;

When('selects create material balance report', async function () {
  MaterialBalanceReportPage = new MaterialBalanceReportPageInstance(fixture.page);
  await MaterialBalanceReportPage.clickOnMaterialBalanceReportMenu();
});
When('selects all the filters of material balance report', async function () {
  await MaterialBalanceReportPage.selectFiltration();
});
When('verifies save functionality of material balance report', async function () {
  await MaterialBalanceReportPage.saveReport();
});
When('verifies save as functionality of material balance report', async function () {
  await MaterialBalanceReportPage.saveAsReport();
});
When('the admin clicks on the run button and the material balance report should be generated successfully', async function () {
  const filePath = await MaterialBalanceReportPage.downloadReport();
    if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
    }
  
});
