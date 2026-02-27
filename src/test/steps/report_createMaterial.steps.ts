import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import MaterialReportPage from '../../pages/report_createMaterialReport.page';
import { fixture } from '../../hooks/pageFixture';

let InventoryPage: MaterialReportPage;


When('selects create material report', async function () {
  InventoryPage = new MaterialReportPage(fixture.page);
  await InventoryPage.clickOnMaterialReportMenu();
});
When('selects all the filters of material report', async function () {
  await InventoryPage.selectFiltration();
});
When('verifies save functionality of material report', async function () {
  await InventoryPage.saveReport();
});
When('verifies save as functionality of material report', async function () {
  await InventoryPage.saveAsReport();
});
When('the admin clicks on the run button and the material report should be generated successfully', async function () {

  const filePath = await InventoryPage.downloadReport();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

  });
