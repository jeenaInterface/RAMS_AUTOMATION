import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import ReceivingReportPageInstance from '../../pages/report_receivingReport.page';
import { fixture } from '../../hooks/pageFixture';
import MaterialBalanceReportPage from '../../pages/report_materialBalanceReport.page';

let ReceivingReportPage: ReceivingReportPageInstance;

When('selects create receiving report', async function () {
    ReceivingReportPage = new ReceivingReportPageInstance(fixture.page);
    await ReceivingReportPage.clickOnReceivingReportMenu();
});
When('selects all the filters for receiving report', async function () {
    await ReceivingReportPage.selectFiltration();
});
When('verifies save functionality for receiving report', async function () {
    await ReceivingReportPage.saveReport();
});
When('verifies save as functionality for receiving report', async function () {
    await ReceivingReportPage.saveAsReport();
});
When('the admin clicks on the run button and the receiving report should be generated successfully', async function () {
    const filePath = await ReceivingReportPage.downloadReport();
    if (this.attach) {
        // Attach as plain text or as HTML link if supported
        const sharedFilePathText = `Report available at shared location: ${filePath}`;
        await this.attach(sharedFilePathText, 'text/plain');
    }

});
