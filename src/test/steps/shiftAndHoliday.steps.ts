import { Given, When, Then } from "@cucumber/cucumber";
import ShiftAndHolidayPage from "../../pages/shiftAndHoliday.page";
import { fixture } from "../../hooks/pageFixture";

let shiftAndHolidayPage: ShiftAndHolidayPage;

When('select shift and holiday module from the system settings menu', async function () {
    shiftAndHolidayPage = new ShiftAndHolidayPage(fixture.page);
    await shiftAndHolidayPage.clickOnShiftAndHolidayMenu();
});

When('Define overtime work for weekend and save', async () => {
    await shiftAndHolidayPage.checkFridayCheckBox();
});

When('Revert back the overtime work for weekend and save', async () => {
    await shiftAndHolidayPage.checkFridayCheckBox();
});

Then('Select holiday calendar', async () => {
    await shiftAndHolidayPage.navigateToHolidayTab();
});

Then('Select any date and click on save button', async () => {
    await shiftAndHolidayPage.selectDateOnCalendar();
});

When('Verify the confirmation message is displayed', async () => {
    await shiftAndHolidayPage.validateMessage();
});

When('Verify action log functionality in shift and holiday module', async () => {
    await shiftAndHolidayPage.verifyActionlog();
});