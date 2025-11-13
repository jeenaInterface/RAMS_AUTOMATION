import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate, UOM_PIECES, UOM_BOX50 } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);


export default class taxRatePage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        taxRateMenu: "//span[normalize-space()='- Tax Rate']",
        searchBox: "//span[normalize-space(text())='Search']",
        resetButton: "//span[normalize-space(text())='Reset']",
        createButton: "//span[normalize-space(text())='Create']",
        taxRateGrid: '#taxRateGrid',
        taxRateNameInput: '#taxRateName',
        taxRateValueInput: '#taxRateValue',
        saveButton: '#saveBtn',
        interfaceSetupMenu: '#interfaceSetupMenu',
        actionLogTab: '#actionLogTab',
        state: "(//input[@class='el-input__inner'])[2]",
        city: "(//input[@class='el-input__inner'])[3]",
        effectiveDate: "(//input[@placeholder='-- Select Date Range --'])[1]",
        country: "//tbody/tr[1]/td[1]/div[1]/span[1]",
        searchbutton: "//span[normalize-space()='Search']",
        searchArrow: "//div[normalize-space(text())='Search Criteria']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        actionTypeTextbox: "(//input[@placeholder='--Input Text--'])[8]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        closeButton: "//div[@class='el-dialog el-dialog--full full-dialog']//i[@class='el-dialog__close el-icon el-icon-close']",
        stateSearch:"(//input[@placeholder='--Input Text--'])[3]",
        deleteButton: "//button[@class='el-button el-button--default icon-button-secondary']",
        deletButtonOnPopup:"//span[normalize-space()='Delete']",
        okButton:"//span[normalize-space()='OK']"

    }

    async navigateToTaxRateModule() {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.taxRateMenu);
    }



    async Search() {

        await fixture.page.waitForTimeout(500);
        await this.page.click(this.Elements.searchbutton);
        // verify the country field text contains 'usa' (case-insensitive)
        const raw = (await this.page.locator(this.Elements.country).textContent()) || '';
        const hasUSA = raw.includes('US');
        return hasUSA;

    }

    async clickCreate() {
        await this.page.click(this.Elements.createButton);
    }

    async enterTaxRateDetails() {
  await this.page.locator('form').filter({ hasText: 'Country StateAK - AlaskaAL - AlabamaAR - ArkansasAS - American SamoaAZ - Arizona' }).getByPlaceholder('--Select One--').click();
  await this.page.getByRole('listitem').filter({ hasText: 'AK - Alaska' }).click();
  await this.page.locator('form').filter({ hasText: 'Country State City State Tax Local Tax Combined Rate0.00% Effective Period' }).getByPlaceholder('--Input Text--').nth(1).click();
  await this.page.locator('.el-dialog__wrapper').first().click();
  await this.page.locator('form').filter({ hasText: 'Country State City State Tax Local Tax Combined Rate0.00% Effective Period' }).getByPlaceholder('--Input Text--').nth(1).click();
  await this.page.locator('form').filter({ hasText: 'Country State City State Tax Local Tax Combined Rate0.00% Effective Period' }).getByPlaceholder('--Input Text--').nth(1).fill('10');
  await this.page.locator('form').filter({ hasText: 'Country State City State Tax Local Tax Combined Rate0.00% Effective Period' }).getByPlaceholder('--Input Text--').nth(2).click();
  await this.page.locator('form').filter({ hasText: 'Country State City State Tax Local Tax Combined Rate10.00% Effective Period' }).getByPlaceholder('--Input Text--').nth(2).fill('20');
  await this.page.locator('form').filter({ hasText: 'Country State City State Tax Local Tax Combined Rate10.00% Effective Period' }).locator('i').nth(1).click();
  // click on 'Today' to select today's date
  await this.page.getByRole('cell', { name: 'Today' }).click();
  await this.page.getByRole('cell', { name: 'Today' }).click();
  await this.page.getByRole('button', { name: 'Save' }).click();
  await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async deleteTaxRate() {
        await this.page.locator(this.Elements.stateSearch).fill("AK");
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.deleteButton).click();
        await this.page.locator(this.Elements.deletButtonOnPopup).click();
        await this.page.locator(this.Elements.okButton).click();




    }

    async navigateToActionLog() {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Delete');
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Delete');
        await this.page.locator(this.Elements.closeButton).click();
    }

    async clickResetAndVerifyFieldsEmpty(): Promise<void> {
        await this.page.getByPlaceholder('--Select One--').click();
        await this.page.getByText('AK - Alaska').click();
        await this.page.getByPlaceholder('--Input At Least 3 Letters--').click();
        await this.page.getByPlaceholder('-- Select Date Range --').click();
        // click on 'Today' to select today's date
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.base.waitAndClick(this.Elements.resetButton);
        await fixture.page.waitForTimeout(500);

        // read values
        const stateVal = (await this.page.locator(this.Elements.state).inputValue()) || '';
        const cityVal = (await this.page.locator(this.Elements.city).inputValue()) || '';
        const dateVal = (await this.page.locator(this.Elements.effectiveDate).inputValue()) || '';

        // assert they are empty
        await expect(stateVal.trim()).toBe('');
        await expect(cityVal.trim()).toBe('');
        await expect(dateVal.trim()).toBe('');
    }
}