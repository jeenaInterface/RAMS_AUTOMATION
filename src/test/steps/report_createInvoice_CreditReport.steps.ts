import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import CreateInvoiceCreditReportPage from '../../pages/report_createInvoiceCreditReport.page';

let createInvoiceCreditReportPage: CreateInvoiceCreditReportPage;


When('selects create invoiceCredit report', async function () {
  createInvoiceCreditReportPage = new CreateInvoiceCreditReportPage(fixture.page);
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
