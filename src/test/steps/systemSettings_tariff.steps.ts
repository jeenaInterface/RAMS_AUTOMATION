import { When, Then } from "@cucumber/cucumber";
import TariffPage from "../../pages/systemSettings_tariff.page";
import { fixture } from "../../hooks/pageFixture";

let tariffPage: TariffPage;

When('the admin navigates to the create tariff page', async () => {
  tariffPage = new TariffPage(fixture.page);
  await tariffPage.clickOnTariffMenu();
});

When('creates a new tariff with the required details', async () => {
  await tariffPage.createNewTariff();
});

Then('the admin searches for the created tariff by tariff name', async () => {
  await tariffPage.searchTariffByName();
});

Then('verifies that the search results display the correct tariff', async () => {
  await tariffPage.verifySearchResult();
});

When('the admin updates the created tariff with new details', async () => {
  await tariffPage.updateTariff();
});

Then('the admin verifies that the updated details are reflected in the tariff list', async () => {
  await tariffPage.searchTariffByName();
});

Then('the admin verifies the copy functionality', async () => {
  await tariffPage.searchTariffByName();
  await tariffPage.verifyCopyFunctionality();
});

Then('the admin verifies the New button functionality', async () => {
  await tariffPage.searchTariffByName();
  await tariffPage.verifyNewButtonFunctionality();
});

Then('the admin verifies the action log functionality', async () => {
  await tariffPage.searchTariffByName();
  await tariffPage.verifyActionLog();
});
