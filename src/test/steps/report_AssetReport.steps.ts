import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import AssetReportPage from '../../pages/assetReport.page';
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
  await assetReportPage.downloadReport();
  
});
