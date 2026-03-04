import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import TariffDiscrepancyReportPageInstance from '../../pages/report_TariffDiscrepancyReport.page';

let TariffDiscrepancyReportPage:TariffDiscrepancyReportPageInstance;

When('selects create tariff discrepancy report', async function () {
  TariffDiscrepancyReportPage = new TariffDiscrepancyReportPageInstance(fixture.page);
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
