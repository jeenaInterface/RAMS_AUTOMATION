import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';
import { fixture } from '../../hooks/pageFixture';

let InventoryPage: InventoryReportPage;


When('selects create inventory report', async function () {
  InventoryPage = new InventoryReportPage(fixture.page);
  await InventoryPage.clickOnInventoryReportMenu();
});
When('selects all the filters of inventory report', async function () {
  await InventoryPage.selectFiltration();
});
When('verifies save functionality of inventory report', async function () {
  await InventoryPage.saveReport();
});
When('verifies save as functionality of inventory report', async function () {
  await InventoryPage.saveAsReport();
});
When('the admin clicks on the run button and the inventory report should be generated successfully', async function () {
  const filePath = await InventoryPage.downloadReport();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

});
When('selects all the filters of inventory report with stock number filtration', async function () {
  await InventoryPage.selectFiltrationWithStockNumber();
});
When('the admin clicks on the run button and the inventory report should be generated successfully with applied stock number filter', async function () {
  const filePath = await InventoryPage.downloadReport();
  await InventoryPage.verifyExcelContent(filePath);
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

});
Then('go to report template and verifies the created inventory report template is displayed in the list', async function () {
  await InventoryPage.clickOnmyReportTemplateMenu();
  await InventoryPage.SearchWithReportName();

});
Then('click on the search icon and verifies the page is redirect to inventory report details page', async function () {
  await InventoryPage.VerifySearchFunctionality();
});
Then('click on download icon and verifies the inventory report is downloaded successfully', async function () {
  await InventoryPage.clickOnmyReportTemplateMenu();
  await InventoryPage.SearchWithReportName();
  const filePath = await InventoryPage.verifyDownloadFunctionality();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
});
When('click on schedule icon and verifies the inventory report is scheduled successfully', async function () {
  await InventoryPage.clickOnmyReportTemplateMenu();
  await InventoryPage.SearchWithReportName();
  await InventoryPage.verifyScheduleFunctionality();
});
When('click on delete icon and verifies the inventory report is deleted successfully', async function () {
  await InventoryPage.clickOnmyReportTemplateMenu();
  await InventoryPage.SearchWithReportName();
  await InventoryPage.verifyDeleteFuctionlity();
});
