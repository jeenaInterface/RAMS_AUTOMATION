import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import MaterialBalanceReportPageInstance from '../../pages/report_materialBalanceReport.page';
import { fixture } from '../../hooks/pageFixture';

let MaterialBalanceReportPage: MaterialBalanceReportPageInstance;

When('selects create material balance report', async function () {
  MaterialBalanceReportPage = new MaterialBalanceReportPageInstance(fixture.page);
  await MaterialBalanceReportPage.clickOnMaterialBalanceReportMenu();
});
When('selects all the filters of material balance report', async function () {
  await MaterialBalanceReportPage.selectFiltration();
});
When('verifies save functionality of material balance report', async function () {
  await MaterialBalanceReportPage.saveReport();
});
When('verifies save as functionality of material balance report', async function () {
  await MaterialBalanceReportPage.saveAsReport();
});
When('the admin clicks on the run button and the material balance report should be generated successfully', async function () {
  const filePath = await MaterialBalanceReportPage.downloadReport();
    if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
    }
  
});
Then('go to report template and verifies the created material balance report template is displayed in the list', async function () {
  await MaterialBalanceReportPage.clickOnmyReportTemplateMenu();
  await MaterialBalanceReportPage.SearchWithReportName();

});
Then('click on the search icon and verifies the page is redirect to material balance report details page', async function () {
  await MaterialBalanceReportPage.VerifySearchFunctionality();
});
Then('click on download icon and verifies the material balance report is downloaded successfully', async function () {
  await MaterialBalanceReportPage.clickOnmyReportTemplateMenu();
  await MaterialBalanceReportPage.SearchWithReportName();
  const filePath = await MaterialBalanceReportPage.verifyDownloadFunctionality();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }
});
When('click on schedule icon and verifies the material balance report is scheduled successfully', async function () {
  await MaterialBalanceReportPage.clickOnmyReportTemplateMenu();
  await MaterialBalanceReportPage.SearchWithReportName();
  await MaterialBalanceReportPage.verifyScheduleFunctionality();
});
When('click on delete icon and verifies the material balance report is deleted successfully', async function () {
  await MaterialBalanceReportPage.clickOnmyReportTemplateMenu();
  await MaterialBalanceReportPage.SearchWithReportName();
  await MaterialBalanceReportPage.verifyDeleteFuctionlity();
});
 
