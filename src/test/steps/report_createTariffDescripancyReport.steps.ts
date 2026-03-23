import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import TariffDiscrepancyReportPageInstance from '../../pages/report_TariffDiscrepancyReport.page';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';

let TariffDiscrepancyReportPage:TariffDiscrepancyReportPageInstance;
let inventoryReport: InventoryReportPage;

When('selects create tariff discrepancy report', async function () {
  TariffDiscrepancyReportPage = new TariffDiscrepancyReportPageInstance(fixture.page);
  inventoryReport = new InventoryReportPage(fixture.page);
  await TariffDiscrepancyReportPage.clickOnTariffDiscrepancyReportMenu();
});
When('selects all the filters for tariff discrepancy report', async function () {
  await TariffDiscrepancyReportPage.selectFiltration();
});
When('verifies save functionality for tariff discrepancy report', async function () {
  await TariffDiscrepancyReportPage.saveReport();
});
When('verifies save as functionality for tariff discrepancy report', async function () {
  await TariffDiscrepancyReportPage.saveAsReport();
});
When('the admin clicks on the run button and the tariff discrepancy report should be generated successfully', async function () {

  const filePath = await TariffDiscrepancyReportPage.downloadReport();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

  });
  Then('go to report template and verifies the tariff discrepancy report template is displayed in the list', async function () {
    await inventoryReport.clickOnmyReportTemplateMenu();
    await TariffDiscrepancyReportPage.SearchWithReportName();
  
  });
  Then('click on the search icon and verifies the page is redirect to tariff discrepancy report details page', async function () {
    await inventoryReport.VerifySearchFunctionality();
  });
  Then('click on download icon and verifies the tariff discrepancy report is downloaded successfully', async function () {
    await inventoryReport.clickOnmyReportTemplateMenu();
    await TariffDiscrepancyReportPage.SearchWithReportName();
    const filePath = await inventoryReport.verifyDownloadFunctionality();
    if (this.attach) {
      // Attach as plain text or as HTML link if supported
      const sharedFilePathText = `Report available at shared location: ${filePath}`;
      await this.attach(sharedFilePathText, 'text/plain');
    }
  });
  When('click on schedule icon and verifies the tariff discrepancy report is scheduled successfully', async function () {
    await inventoryReport.clickOnmyReportTemplateMenu();
    await TariffDiscrepancyReportPage.SearchWithReportName();
    await inventoryReport.verifyScheduleFunctionality();
  });
  When('click on delete icon and verifies the tariff discrepancy report is deleted successfully', async function () {
    await inventoryReport.clickOnmyReportTemplateMenu();
    await TariffDiscrepancyReportPage.SearchWithReportName();
    await inventoryReport.verifyDeleteFuctionlity();
  });
  
