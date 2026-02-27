import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";
import { ok } from "assert";

setDefaultTimeout(100 * 1000);

export default class TariffPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public tariffName: string = '';
    public copiedtariffName: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        tariffMenu: "//span[normalize-space(text())='- Create Tariff']",
        inquireTariffMenu: "//span[normalize-space()='- Inquire Tariff']",
        createButton: "//span[normalize-space(text())='Create']",
        copyButton: "//span[normalize-space(text())='Copy']",
        newButton: "//span[normalize-space(text())='New']",
        saveButton: "//span[normalize-space(text())='Save']",
        okButton: "//button[normalize-space()='OK']",
        searchButton: "//span[normalize-space(text())='Search']",
        resetButton: "//span[normalize-space(text())='Reset']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        closeButton: "//div[@class='el-dialog el-dialog--full full-dialog']//i[@class='el-dialog__close el-icon el-icon-close']",
        tariffCodeInput: "(//input[@placeholder='--Input Text--'])[1]",
        descriptionInput: "(//textarea[@placeholder='--Input Text--'])[1]",
        searchInput: "(//input[@placeholder='--Input Text--'])[1]",
        firstRowName: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        firstRowEdit: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/button[1]/span[1]/i[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        shift1ST: "(//input[@rows='2'])[3]",
        shift1OT: "(//input[@type='text'])[4]",
        shift2ST: "(//div[contains(@class,'el-input defColor')]//input)[3]",
        shift2OT: "(//input[@type='text'])[6]",
        shift3ST: "(//input[@type='text'])[7]",
        shift3OT: "(//input[@type='text'])[8]",
        GeneralMarkup: "(//input[@type='text'])[9]",
        Consumables: "(//input[@type='text'])[10]",
        meterialSearch: "(//i[@class='el-input__icon el-icon-search is-clickable'])[1]",
        materialSearch2: "(//i[@class='el-input__icon el-icon-search is-clickable'])[2]",
        searchButtonPopup: "(//span[normalize-space()='Search'])[1]",
        oKButtonPopup: "(//span[contains(text(),'OK')])[3]",
        markUp1: "(//input[@type='text'])[12]",
        stockNo: "(//input[@validateevent='true'])[2]",
        fixedPrice: "(//input[@type='text'])[14]",
        assetGroup: "(//input[@placeholder='--Select One--'])[1]",
        AddAssetGroupTariff: "(//span[normalize-space()='Add Asset Group Tariff'])[1]",
        dateRange: "(//input[@placeholder='--Select Date Range--'])[1]",
        okButton1: "(//span[normalize-space()='OK'])[1]",
        chargeTypeDropdown: "(//input[@placeholder='--Select One--'])[5]",
        okSuccusspopUp: "//button[contains(@class,'el-button el-button--default el-button--primary')]",
        componentCode: "(//input[@placeholder='--Select One--'])[3]",
        repairCode: "(//input[@placeholder='--Select One--'])[4]",
        dateRangeCopy: "//input[@placeholder='--Select Date Range--']",



    };

    async clickOnTariffMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.tariffMenu);
    }

    async createNewTariff(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);
        this.tariffName = `TARIFF-${randomNumber}`;
        await this.page.locator('div').filter({ hasText: 'Tariff Name Effective Period' }).getByPlaceholder('--Input Text--').click();
        await this.page.locator('div').filter({ hasText: 'Tariff Name Effective Period' }).getByPlaceholder('--Input Text--').fill(this.tariffName);

        // Fill tariff code

        await this.page.locator(this.Elements.dateRange).click();
        // click on 'Today' to select today's date
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        // Fill description
        await this.page.locator(this.Elements.shift1OT).fill(`2`);
        await this.page.locator(this.Elements.shift1OT).fill(`3`);
        await this.page.locator(this.Elements.shift2ST).fill(`4`);
        await this.page.locator(this.Elements.shift2OT).fill(`5`);
        await this.page.locator(this.Elements.shift3ST).fill(`6`);
        await this.page.locator(this.Elements.shift3OT).fill(`7`);
        await this.page.locator(this.Elements.GeneralMarkup).fill(`5`);
        await this.page.locator(this.Elements.Consumables).fill(`8`);

        await this.page.locator(this.Elements.meterialSearch).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButtonPopup).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.page.locator(this.Elements.markUp1).fill(`10`);
        await this.page.locator(this.Elements.materialSearch2).click();
        await this.page.locator(this.Elements.stockNo).fill(`1002`);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButtonPopup).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.okButton1).click();
        await this.page.locator(this.Elements.fixedPrice).fill(`20`);
        await this.page.locator(this.Elements.assetGroup).click();
        await this.page.getByRole('listitem').filter({ hasText: 'AG - AGV' }).click();
        await this.page.locator(this.Elements.AddAssetGroupTariff).click();
        await this.page.getByRole('button', { name: ' Create' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByRole('listitem').filter({ hasText: '3BA - Battery' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('PM - Preventive maintenance').click();
        await this.page.locator(this.Elements.chargeTypeDropdown).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Fixed Hour' }).locator('span').click();
        await this.page.locator('#app-modal').getByRole('textbox', { name: '--Input Text--' }).click();
        await this.page.locator('#app-modal').getByRole('textbox', { name: '--Input Text--' }).fill('12');
        await this.page.getByRole('button', { name: 'OK' }).click();

        // Save
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.okSuccusspopUp).click();
    }

    async searchTariffByName(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.inquireTariffMenu);
        await this.page.locator(this.Elements.searchInput).fill(this.tariffName);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResult(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await expect(this.page.locator(this.Elements.firstRowName)).toHaveText(this.tariffName);

    }

    async updateTariff(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('link', { name: this.tariffName }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.assetGroup).click();
        await this.page.getByText('AC - Access Gate Controller').click();
        await this.page.locator(this.Elements.AddAssetGroupTariff).click();
        await this.page.getByRole('button', { name: ' Create' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByRole('listitem').filter({ hasText: '2EL - Electrical' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('IN - Install or Replace').click();
        await this.page.locator(this.Elements.chargeTypeDropdown).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Fixed Hour' }).locator('span').click();
        await this.page.locator('#app-modal').getByRole('textbox', { name: '--Input Text--' }).click();
        await this.page.locator('#app-modal').getByRole('textbox', { name: '--Input Text--' }).fill('10');
        await this.page.getByRole('button', { name: 'OK' }).click();
        // Update description with new details

        // Save changes
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.okSuccusspopUp).click();
    }

    async verifyCopyFunctionality(): Promise<void> {
        // Search for the tariff
        await this.page.getByRole('link', { name: this.tariffName }).click();

        await fixture.page.waitForTimeout(500);
        // Click copy button - this will open a new tab
        const copyBtn = this.page.locator(this.Elements.copyButton);
        await expect(copyBtn).toBeVisible();

        // Wait for new page/tab to open
        const pagePromise = this.page.context().waitForEvent('page');
        await copyBtn.click();
        const newPage = await pagePromise;

        // Switch context to new page and wait for it to load
        await newPage.waitForLoadState('networkidle');
        await fixture.page.waitForTimeout(500);

        // Fill in the tariff name for the copied tariff
        const randomNumber = getRandomInt(1000, 9999);
        this.copiedtariffName = `TARIFF-COPY-${randomNumber}`;

        // Find and fill the tariff code input on the new page
        const tariffCodeLocator = newPage.locator(this.Elements.tariffCodeInput).first();
        await tariffCodeLocator.fill(this.copiedtariffName);
        await fixture.page.waitForTimeout(500);

        await newPage.getByPlaceholder('--Select Date Range--').click();
        await newPage.getByRole('cell', { name: 'Today' }).click();
        await newPage.getByRole('cell', { name: 'Today' }).click();
        await newPage.getByRole('button', { name: 'Save' }).click();
        await newPage.getByRole('button', { name: 'OK' }).click();

        // Close the new tab
        await newPage.locator(this.Elements.systemSettingsMenu).click();
        await newPage.locator(this.Elements.inquireTariffMenu).click();
        await newPage.locator(this.Elements.searchInput).fill(this.copiedtariffName);

        await expect(newPage.locator(this.Elements.firstRowName)).toHaveText(this.copiedtariffName);
        await newPage.close();
    }

    async verifyNewButtonFunctionality(): Promise<void> {
        await this.page.getByRole('link', { name: this.tariffName }).click();
        // Verify New button is visible and clickable
        const newBtn = this.page.locator(this.Elements.newButton);
        await expect(newBtn).toBeVisible();

        // Click New button - this will open a new tab with /systemSetting/tariff/add URL
        const pagePromise = this.page.context().waitForEvent('page');
        await newBtn.click();
        const newPage = await pagePromise;

        // Wait for the new page to load with the add URL
        await newPage.waitForLoadState('networkidle');
        await fixture.page.waitForTimeout(500);

        // Verify the URL contains 'systemSetting/tariff/add'
        const url = newPage.url();
        await expect(url).toContain('systemSetting/tariff/add');

        // Close the new tab
        await newPage.close();
    }

    async verifyActionLog(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.getByRole('link', { name: this.tariffName }).click();
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();

        // Filter action log for 'create' action
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Add Charge Type');
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Add Charge Type');

        await this.page.locator(this.Elements.closeButton).click();
    }
}
