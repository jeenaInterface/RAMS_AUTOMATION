import { Given, When, Then } from "@cucumber/cucumber";
import ChangeAuthorityPage from "../../pages/changeAuthority.page";
import { fixture } from "../../hooks/pageFixture";

let changeAuthorityPage: ChangeAuthorityPage;

When('the admin selects "Change Authority" from the system settings menu', async () => {
    changeAuthorityPage = new ChangeAuthorityPage(fixture.page);
    await changeAuthorityPage.clickOnChangeAuthorityMenu();
});

When('the admin selects the "Add" operation', async () => {
    await changeAuthorityPage.clickAddOperation();
});

When('assigns an interface mapping to a specific user', async () => {
    await changeAuthorityPage.assignInterfaceMappingToUser();
});


Then('the user should see the assigned interface mapping', async () => {
    await changeAuthorityPage.verifyMappingVisibleForUser();
});


When('the admin selects the "Remove" operation', async () => {
    await changeAuthorityPage.clickOnChangeAuthorityMenu();
    await changeAuthorityPage.clickRemoveOperation();

});

When('removes the interface mapping from the user', async () => {
    await changeAuthorityPage.assignInterfaceMappingToUser();
});


Then('the assigned interface mapping should no longer be visible for the user', async () => {
    await changeAuthorityPage.removeInterfaceMappingFromUser();
});
Then('Verify reset functionalities', async () => {
    await changeAuthorityPage.resetFunctionality();
});
