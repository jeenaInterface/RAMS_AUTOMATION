import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import PurchaseOrderReportPage from '../../pages/report_createPurchaseOrderReport.page';

let OrderReportPage:PurchaseOrderReportPage;

When('selects create purchase order report', async function () {
  OrderReportPage = new PurchaseOrderReportPage(fixture.page);
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
