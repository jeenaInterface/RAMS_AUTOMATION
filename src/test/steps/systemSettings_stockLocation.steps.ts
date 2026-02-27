import { Given, When, Then } from "@cucumber/cucumber";
import StockLocationPage from "../../pages/systemSettings_stockLocation.page";
import { fixture } from "../../hooks/pageFixture";

let stockLocationPage: StockLocationPage;

When('select stock location from the system settings menu', async function () {
    stockLocationPage = new StockLocationPage(fixture.page);
    await stockLocationPage.clickOnStockLocationMenu();
});

When('Click on the create button and fill stock location details', async () => {
    await stockLocationPage.createNewStockLocation();
});

Then('Search for the created stock location', async () => {
    await stockLocationPage.searchStockLocationCode();
});

Then('Verify the search result displays the created stock location', async () => {
    await stockLocationPage.verifySearchResult();
});

When('Delete the created stock location', async () => {
    await stockLocationPage.deleteStockLocation();
});

Then('Verify the deleted stock location is not displayed in the search result', async () => {
    await stockLocationPage.verifyStockLocationNotDisplayed();
});
