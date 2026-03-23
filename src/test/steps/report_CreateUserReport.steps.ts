import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import CreateUserReportPageInstance from '../../pages/report_createUserReport.page';
import { fixture } from '../../hooks/pageFixture';
import InventoryReportPage from '../../pages/report_createInventoryReport.page';

let CreateUserReportPage: CreateUserReportPageInstance;
let inventoryReport: InventoryReportPage;

When('selects create user report', async function () {
    CreateUserReportPage = new CreateUserReportPageInstance(fixture.page);
    inventoryReport = new InventoryReportPage(fixture.page);
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
    Then('go to report template and verifies the user report template is displayed in the list', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await CreateUserReportPage.SearchWithReportName();
    
    });
    Then('click on the search icon and verifies the page is redirect to user report details page', async function () {
      await inventoryReport.VerifySearchFunctionality();
    });
    Then('click on download icon and verifies the user report is downloaded successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await CreateUserReportPage.SearchWithReportName();
      const filePath = await inventoryReport.verifyDownloadFunctionality();
      if (this.attach) {
        // Attach as plain text or as HTML link if supported
        const sharedFilePathText = `Report available at shared location: ${filePath}`;
        await this.attach(sharedFilePathText, 'text/plain');
      }
    });
    When('click on schedule icon and verifies the user report is scheduled successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await CreateUserReportPage.SearchWithReportName();
      await inventoryReport.verifyScheduleFunctionality();
    });
    When('click on delete icon and verifies the user report is deleted successfully', async function () {
      await inventoryReport.clickOnmyReportTemplateMenu();
      await CreateUserReportPage.SearchWithReportName();
      await inventoryReport.verifyDeleteFuctionlity();
    });
    
   


