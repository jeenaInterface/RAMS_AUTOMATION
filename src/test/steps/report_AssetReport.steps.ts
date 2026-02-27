import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import AssetReportPage from '../../pages/report_assetReport.page';
import { fixture } from '../../hooks/pageFixture';

let assetReportPage: AssetReportPage;


When('selects create asset report', async function () {
  assetReportPage = new AssetReportPage(fixture.page);
  await assetReportPage.clickOnAssetReportMenu();
});
When('selects all the filters', async function () {
  await assetReportPage.selectFiltration();
});
When('verifies save functionality', async function () {
  await assetReportPage.saveReport();
});
When('verifies save as functionality', async function () {
  await assetReportPage.saveAsReport();
});
When('the admin clicks on the run button and the report should be generated successfully', async function () {
  const filePath = await assetReportPage.downloadReport();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
  
});
