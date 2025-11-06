import { Given, When, Then } from "@cucumber/cucumber";
import MaintainCostSetUpPage from "../../pages/maintainCostSetup.page";
import { fixture } from "../../hooks/pageFixture";

let MaintainCostPage: MaintainCostSetUpPage;

When('select Maintain cost setup from the system settings menu', async () => {
    MaintainCostPage = new MaintainCostSetUpPage(fixture.page);
    await MaintainCostPage.clickOnCostSetupMenu();
});

When('verify the edit functionality by selecting the created Maintain cost setup', async () => {
    await MaintainCostPage.verifyEditFunctionality();
});

Then('verify the delete functionality by selecting the created Maintain cost setup', async () => {
    await MaintainCostPage.verifyDeleteFunctionality();
});

Then('Verify Action log for Maintain cost setup  module', async () => {
    await MaintainCostPage.verifyActionLog();
});