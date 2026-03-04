import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import WorkOrderReportPageInstance from '../../pages/report_workOrderReport.page';
import { fixture } from '../../hooks/pageFixture';

let WorkOrderReportPage: WorkOrderReportPageInstance;

When('selects create work order report', async function () {
    WorkOrderReportPage = new WorkOrderReportPageInstance(fixture.page);
    await WorkOrderReportPage.clickOnWorkOrderReportMenu();
});
When('selects all the filters for work order report', async function () {
    await WorkOrderReportPage.selectFiltration();
});
When('verifies save functionality for work order report', async function () {
    await WorkOrderReportPage.saveReport();
});
When('verifies save as functionality for work order report', async function () {
    await WorkOrderReportPage.saveAsReport();
});
When('the admin clicks on the run button and the work order report should be generated successfully', async function () {
    const filePath = await WorkOrderReportPage.downloadReport();
    if (this.attach) {
        // Attach as plain text or as HTML link if supported
        const sharedFilePathText = `Report available at shared location: ${filePath}`;
        await this.attach(sharedFilePathText, 'text/plain');
    }

});
