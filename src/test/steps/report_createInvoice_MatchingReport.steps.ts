import { Given, When, Then } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import CreateInvoiceMatchingReportPage from '../../pages/report_createInvoiceMatchingReport.page';

let createInvoiceMatchingReportPage: CreateInvoiceMatchingReportPage;


When('selects create invoice matching report', async function () {
  createInvoiceMatchingReportPage = new CreateInvoiceMatchingReportPage(fixture.page);
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
