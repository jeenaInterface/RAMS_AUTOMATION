import { Given, When, Then } from "@cucumber/cucumber";
import ActivityCodePage from "../../pages/activityCode.page";
import { fixture } from "../../hooks/pageFixture";

let ActivityPage: ActivityCodePage;

When('select Activity Code from the system settings menu', async () => {
    ActivityPage = new ActivityCodePage(fixture.page);
    await ActivityPage.clickOnActivityCodeMenu();
});

When('Click on the create button and fill the Activity Code details', async () => {
    await ActivityPage.CreateActivityCode();
});

Then('Search for the created Activity Code', async () => {
    await ActivityPage.searchCode();
});

Then('Verify the search result displays the Activity Code', async () => {
    await ActivityPage.verifySearchResult();
});
Then('verify the edit functionality by selecting the created Activity Code', async () => {
    await ActivityPage.verifyEditFunctionality();
});
Then('verify the delete functionality by selecting the created Activity Code', async () => {
    await ActivityPage.verifyDeleteFunctionality();
});
Then('Verify Action log for Activity Code module', async () => {
    await ActivityPage.verifyActionLog();
});
