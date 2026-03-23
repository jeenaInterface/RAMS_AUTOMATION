import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import AssetReportPage from '../../pages/report_assetReport.page';
import { fixture } from '../../hooks/pageFixture';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';

let assetReportPage: AssetReportPage;
let inventoryReport: InventoryReportPage;


When('selects create asset report', async function () {
  assetReportPage = new AssetReportPage(fixture.page);
    inventoryReport = new InventoryReportPage(fixture.page);
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
When('the admin clicks on the run button and verifies the report is generated successfully with applied asset number filter', async function () {
  const filePath = await assetReportPage.downloadReport();
  await assetReportPage.verifyExcelContent(filePath);
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

});
When('selects asset number filter for asset report', async function () {
  await assetReportPage.selectAssetNumberFiltration();
});
Then('go to report template and verifies the created report template is displayed in the list', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await assetReportPage.SearchWithReportName();

});
Then('click on the search icon and verifies the page is redirect to report details page', async function () {
  await inventoryReport.VerifySearchFunctionality();
});
Then('click on download icon and verifies the report is downloaded successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await assetReportPage.SearchWithReportName();
  const filePath = await inventoryReport.verifyDownloadFunctionality();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
});
When('click on schedule icon and verifies the report is scheduled successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await assetReportPage.SearchWithReportName();
  await inventoryReport.verifyScheduleFunctionality();
});
When('click on delete icon and verifies the report is deleted successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await assetReportPage.SearchWithReportName();
  await inventoryReport.verifyDeleteFuctionlity();
});

