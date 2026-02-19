import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import AssetReportPage from '../../pages/assetReport.page';

let assetReportPage: AssetReportPage;


When('selects create asset report', async function () {
  await assetReportPage.clickOnAssetReportMenu();
});
