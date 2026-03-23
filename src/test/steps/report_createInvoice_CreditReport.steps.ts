import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import CreateInvoiceCreditReportPage from '../../pages/report_createInvoiceCreditReport.page';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';

let createInvoiceCreditReportPage: CreateInvoiceCreditReportPage;
let inventoryReport: InventoryReportPage;


When('selects create invoiceCredit report', async function () {
  createInvoiceCreditReportPage = new CreateInvoiceCreditReportPage(fixture.page);
  inventoryReport = new InventoryReportPage(fixture.page);
  await createInvoiceCreditReportPage.clickOnInvoiceCreditReportMenu();
});
When('selects all the filters of invoiceCredit report', async function () {
  await createInvoiceCreditReportPage.selectFiltration();
});
When('verifies save functionality of invoiceCredit report', async function () {
  await createInvoiceCreditReportPage.saveReport();
});
When('verifies save as functionality of invoiceCredit report', async function () {
  await createInvoiceCreditReportPage.saveAsReport();
});
When('the admin clicks on the run button and the invoiceCredit report should be generated successfully', async function () {

  const filePath = await createInvoiceCreditReportPage.downloadReport();
  if (this.attach) {
    // Attach as plain text or as HTML link if supported
    const sharedFilePathText = `Report available at shared location: ${filePath}`;
    await this.attach(sharedFilePathText, 'text/plain');
  }

  });
  Then('go to report template and verifies the created invoice Credit report template is displayed in the list', async function () {
    await inventoryReport.clickOnmyReportTemplateMenu();
    await createInvoiceCreditReportPage.SearchWithReportName();
  
  });
  Then('click on the search icon and verifies the page is redirect to invoice Credit report details page', async function () {
    await inventoryReport.VerifySearchFunctionality();
  });
  Then('click on download icon and verifies the invoice Credit report is downloaded successfully', async function () {
    await inventoryReport.clickOnmyReportTemplateMenu();
    await createInvoiceCreditReportPage.SearchWithReportName();
    const filePath = await inventoryReport.verifyDownloadFunctionality();
    if (this.attach) {
      // Attach as plain text or as HTML link if supported
      const sharedFilePathText = `Report available at shared location: ${filePath}`;
      await this.attach(sharedFilePathText, 'text/plain');
    }
  });
  When('click on schedule icon and verifies the invoice Credit report is scheduled successfully', async function () {
    await inventoryReport.clickOnmyReportTemplateMenu();
    await createInvoiceCreditReportPage.SearchWithReportName();
    await inventoryReport.verifyScheduleFunctionality();
  });
  When('click on delete icon and verifies the invoice Credit report is deleted successfully', async function () {
    await inventoryReport.clickOnmyReportTemplateMenu();
    await createInvoiceCreditReportPage.SearchWithReportName();
    await inventoryReport.verifyDeleteFuctionlity();
  });
  
