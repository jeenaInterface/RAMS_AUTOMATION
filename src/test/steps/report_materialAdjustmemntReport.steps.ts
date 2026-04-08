import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import MaterialAdjustmentReportPage from '../../pages/report_createMaterialAdjustmentReport.page';
import { fixture } from '../../hooks/pageFixture';

let MaterialAdjustmentReportPageInstance: MaterialAdjustmentReportPage;

When('selects create material adjustment report', async function () {
  MaterialAdjustmentReportPageInstance = new MaterialAdjustmentReportPage(fixture.page);
  await MaterialAdjustmentReportPageInstance.clickOnMaterialAdjustmentReportMenu();
});
When('selects all the filters of material adjustment report', async function () {
  await MaterialAdjustmentReportPageInstance.selectFiltration();
});
When('verifies save functionality of material adjustment report', async function () {
  await MaterialAdjustmentReportPageInstance.saveReport();
});
When('verifies save as functionality of material adjustment report', async function () {
  await MaterialAdjustmentReportPageInstance.saveAsReport();
});
When('the admin clicks on the run button and the material adjustment report should be generated successfully', async function () {
    const filePath = await MaterialAdjustmentReportPageInstance.downloadReport();
    if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
    }
  
});
When('selects material adjustment report with filters', async function () {
  await MaterialAdjustmentReportPageInstance.selectFiltrationwithFilters();
});
When('the admin clicks on the run button and the material adjustment report should be generated successfully with applied filters', async function () {
    const filePath = await MaterialAdjustmentReportPageInstance.downloadReport();
    await MaterialAdjustmentReportPageInstance.verifyExcelContent(filePath);
    if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
    }
});
Then('go to report template and verifies the created material adjustment report template is displayed in the list', async function () {
  await MaterialAdjustmentReportPageInstance.clickOnmyReportTemplateMenu();
  await MaterialAdjustmentReportPageInstance.SearchWithReportName();

});
Then('click on the search icon and verifies the page is redirect to material adjustment report details page', async function () {
  await MaterialAdjustmentReportPageInstance.VerifySearchFunctionality();
});
Then('click on download icon and verifies the material adjustment report is downloaded successfully', async function () {
  await MaterialAdjustmentReportPageInstance.clickOnmyReportTemplateMenu();
  await MaterialAdjustmentReportPageInstance.SearchWithReportName();
  const filePath = await MaterialAdjustmentReportPageInstance.verifyDownloadFunctionality();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
});
When('click on schedule icon and verifies the material adjustment report is scheduled successfully', async function () {
  await MaterialAdjustmentReportPageInstance.clickOnmyReportTemplateMenu();
  await MaterialAdjustmentReportPageInstance.SearchWithReportName();
  await MaterialAdjustmentReportPageInstance.verifyScheduleFunctionality();
});
When('click on delete icon and verifies the material adjustment report is deleted successfully', async function () {
  await MaterialAdjustmentReportPageInstance.clickOnmyReportTemplateMenu();
  await MaterialAdjustmentReportPageInstance.SearchWithReportName();
  await MaterialAdjustmentReportPageInstance.verifyDeleteFuctionlity();
});
