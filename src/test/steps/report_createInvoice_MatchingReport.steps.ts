import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import CreateInvoiceMatchingReportPage from '../../pages/report_createInvoiceMatchingReport.page';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';

let createInvoiceMatchingReportPage: CreateInvoiceMatchingReportPage;
let inventoryReport: InventoryReportPage;



When('selects create invoice matching report', async function () {
  createInvoiceMatchingReportPage = new CreateInvoiceMatchingReportPage(fixture.page);
  inventoryReport = new InventoryReportPage(fixture.page);
  await createInvoiceMatchingReportPage.clickOnInvoiceMatchingReportMenu();
});
When('selects all the filters of invoice matching report', async function () {
  await createInvoiceMatchingReportPage.selectFiltration();
});
When('verifies save functionality of invoice matching report', async function () {
  await createInvoiceMatchingReportPage.saveReport();
});
When('verifies save as functionality of invoice matching report', async function () {
  await createInvoiceMatchingReportPage.saveAsReport();
});
When('the admin clicks on the run button and the invoice matching report should be generated successfully', async function () {

  const filePath = await createInvoiceMatchingReportPage.downloadReport();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

  });
    Then('go to report template and verifies the invoice matching report template is displayed in the list', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await createInvoiceMatchingReportPage.SearchWithReportName();
    
    });
    Then('click on the search icon and verifies the page is redirect to invoice matching report details page', async function () {
      await inventoryReport.VerifySearchFunctionality();
    });
    Then('click on download icon and verifies the invoice matching report is downloaded successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await createInvoiceMatchingReportPage.SearchWithReportName();
      const filePath = await inventoryReport.verifyDownloadFunctionality();
      if (this.attach) {
        // Attach as plain text or as HTML link if supported
        const sharedFilePathText = `Report available at shared location: ${filePath}`;
        await this.attach(sharedFilePathText, 'text/plain');
      }
    });
    When('click on schedule icon and verifies the invoice matching report is scheduled successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await createInvoiceMatchingReportPage.SearchWithReportName();
      await inventoryReport.verifyScheduleFunctionality();
    });
    When('click on delete icon and verifies the invoice matching report is deleted successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await createInvoiceMatchingReportPage.SearchWithReportName();
      await inventoryReport.verifyDeleteFuctionlity();
    });
    
