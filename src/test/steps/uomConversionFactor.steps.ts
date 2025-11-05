import { Given, When, Then } from "@cucumber/cucumber";
import UOMConversionPage from "../../pages/uomConversionFactor.page";
import { fixture } from "../../hooks/pageFixture";

let UOMPage: UOMConversionPage;

When('select UOM Conversion Factor from the system settings menu', async () => {
  UOMPage = new UOMConversionPage(fixture.page);
  await UOMPage.clickOnUOMConversionMenu();
});

When('Click on the create button and fill the UOM Conversion Factor details', async () => {
  await UOMPage.CreateUOMConversionFactor();
});

Then('Search for the created UOM Conversion Factor', async () => {
  await UOMPage.searchCode();
});

Then('Verify the search result displays the created UOM Conversion Factor', async () => {
  await UOMPage.verifySearchResult();
});
Then('verify the edit functionality by selecting the created UOM Conversion Factor', async () => {
  await UOMPage.verifyEditFunctionality();
});
Then('verify the delete functionality by selecting the created UOM Conversion Factor', async () => {
  await UOMPage.verifyDeleteFunctionality();
});
