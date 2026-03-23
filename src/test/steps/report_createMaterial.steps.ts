import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import MaterialReportPage from '../../pages/report_createMaterialReport.page';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';
import { fixture } from '../../hooks/pageFixture';

let InventoryPage: MaterialReportPage;
let inventoryReport: InventoryReportPage;



When('selects create material report', async function () {
  InventoryPage = new MaterialReportPage(fixture.page);
   inventoryReport = new InventoryReportPage(fixture.page);
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
When('selects material report with stock number filtration', async function () {
  await InventoryPage.selectFiltrationStockNumber();
});
When('the admin clicks on the run button and the material report should be generated successfully with applied stock number filter', async function () {
  const filePath = await InventoryPage.downloadReport();
  await InventoryPage.verifyExcelContent(filePath);
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
});
    Then('go to report template and verifies the material report template is displayed in the list', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await InventoryPage.SearchWithReportName();
    
    });
    Then('click on the search icon and verifies the page is redirect to material report details page', async function () {
      await inventoryReport.VerifySearchFunctionality();
    });
    Then('click on download icon and verifies the material report is downloaded successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await InventoryPage.SearchWithReportName();
      const filePath = await inventoryReport.verifyDownloadFunctionality();
      if (this.attach) {
        // Attach as plain text or as HTML link if supported
        const sharedFilePathText = `Report available at shared location: ${filePath}`;
        await this.attach(sharedFilePathText, 'text/plain');
      }
    });
    When('click on schedule icon and verifies the material report is scheduled successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await InventoryPage.SearchWithReportName();
      await inventoryReport.verifyScheduleFunctionality();
    });
    When('click on delete icon and verifies the material report is deleted successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await InventoryPage.SearchWithReportName();
      await inventoryReport.verifyDeleteFuctionlity();
    });