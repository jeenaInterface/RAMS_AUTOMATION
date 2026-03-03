import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import CreatePayrollReportPageInstance from '../../pages/report_createPayroll.page';
import { fixture } from '../../hooks/pageFixture';

let CreatePayrollReportPage: CreatePayrollReportPageInstance;

When('selects create payroll report', async function () {
    CreatePayrollReportPage = new CreatePayrollReportPageInstance(fixture.page);
    await CreatePayrollReportPage.clickOnPayrollReportMenu();
});
When('selects all the filters of payroll report', async function () {
    await CreatePayrollReportPage.selectFiltration();
});
When('verifies save functionality of payroll report', async function () {
    await CreatePayrollReportPage.saveReport();
});
When('verifies save as functionality of payroll report', async function () {
    await CreatePayrollReportPage.saveAsReport();
});
When('the admin clicks on the run button and the payroll report should be generated successfully', async function () {
    const filePath = await CreatePayrollReportPage.downloadReport();
    if (this.attach) {
        // Attach as plain text or as HTML link if supported
        const sharedFilePathText = `Report available at shared location: ${filePath}`;
        await this.attach(sharedFilePathText, 'text/plain');
    }

});
