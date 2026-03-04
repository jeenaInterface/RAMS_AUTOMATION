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
