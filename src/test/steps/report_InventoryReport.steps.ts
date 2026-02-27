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
