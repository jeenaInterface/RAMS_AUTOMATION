import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import CreateUserReportPageInstance from '../../pages/report_createUserReport.page';
import { fixture } from '../../hooks/pageFixture';

let CreateUserReportPage: CreateUserReportPageInstance;

When('selects create user report', async function () {
    CreateUserReportPage = new CreateUserReportPageInstance(fixture.page);
    await CreateUserReportPage.clickOnUserReportMenu();
});
When('selects all the filters for user report', async function () {
    await CreateUserReportPage.selectFiltration();
});
When('verifies save functionality for user report', async function () {
    await CreateUserReportPage.saveReport();
});
When('verifies save as functionality for user report', async function () {
    await CreateUserReportPage.saveAsReport();
});
When('the admin clicks on the run button and the user report should be generated successfully', async function () {
    const filePath = await CreateUserReportPage.downloadReport();
    await CreateUserReportPage.verifyExcelContent(filePath);  
    if (this.attach) {
        // Attach as plain text or as HTML link if supported
        const sharedFilePathText = `Report available at shared location: ${filePath}`;
        await this.attach(sharedFilePathText, 'text/plain');
    }

});
   


