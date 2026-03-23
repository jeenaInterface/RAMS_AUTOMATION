import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import PurchaseOrderReportPage from '../../pages/report_createPurchaseOrderReport.page';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';

let OrderReportPage: PurchaseOrderReportPage;
let inventoryReport: InventoryReportPage;

When('selects create purchase order report', async function () {
  OrderReportPage = new PurchaseOrderReportPage(fixture.page);
  inventoryReport = new InventoryReportPage(fixture.page);
  await OrderReportPage.clickOnOrderReportMenu();
});
When('selects all the filters for purchase order report', async function () {
  await OrderReportPage.selectFiltration();
});
When('verifies save functionality for purchase order report', async function () {
  await OrderReportPage.saveReport();
});
When('verifies save as functionality for purchase order report', async function () {
  await OrderReportPage.saveAsReport();
});
When('the admin clicks on the run button and the purchase order report should be generated successfully', async function () {

  const filePath = await OrderReportPage.downloadReport();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

});
When('selects purchase order report with stock number filters', async function () {
  await OrderReportPage.selectFiltrationWithStockNumber();
});
When('the admin clicks on the run button and the purchase order report should be generated successfully with applied stock number filters', async function () {
  const filePath = await OrderReportPage.downloadReport();
  await OrderReportPage.verifyExcelContent(filePath);
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
});

Then('go to report template and verifies the purchase order report template is displayed in the list', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await OrderReportPage.SearchWithReportName();

});
Then('click on the search icon and verifies the page is redirect to purchase order report details page', async function () {
  await inventoryReport.VerifySearchFunctionality();
});
Then('click on download icon and verifies the purchase order report is downloaded successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await OrderReportPage.SearchWithReportName();
  const filePath = await inventoryReport.verifyDownloadFunctionality();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
});
When('click on schedule icon and verifies the purchase order report is scheduled successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await OrderReportPage.SearchWithReportName();
  await inventoryReport.verifyScheduleFunctionality();
});
When('click on delete icon and verifies the purchase order report is deleted successfully', async function () {
  await inventoryReport.clickOnmyReportTemplateMenu();
  await OrderReportPage.SearchWithReportName();
  await inventoryReport.verifyDeleteFuctionlity();
});
