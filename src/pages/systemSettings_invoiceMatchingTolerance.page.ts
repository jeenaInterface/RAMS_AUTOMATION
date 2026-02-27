import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class InvoiceMatchingTolerancePage {
    private base: PlaywrightWrapper;
    private page: Page;
    public data: { oldFreightMax?: string; newFreightMax?: string } = {};

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        invoiceMatchingMenu: "//span[normalize-space(text())='- Invoice Matching Tolerance']",
        saveButton: "//span[normalize-space(text())='Save']",
        resetButton: "//span[normalize-space(text())='Reset']",
        okButton: "//button[normalize-space()='OK']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//div[@class='el-dialog__header']//span[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        closeButton: "(//button[@aria-label='Close']//i)[1]",

        // form fields
        invoiceLevelPercent: "(//input[@placeholder='--Input Number--'])[1]",
        invoiceLevelAmount: "(//input[@class='el-input__inner'])[2]",
        costItemLevelPercent: "(//input[@placeholder='--Input Number--'])[5]",
        costItemLevelAmount: "(//input[@placeholder='--Input Number--'])[6]",
        unitPricePercent: "(//input[@placeholder='--Input Number--'])[3]",
        unitPriceAmount: "(//input[@placeholder='--Input Number--'])[4]",
        taxPercent: "(//input[@placeholder='--Input Number--'])[7]",
        taxAmount: "(//input[@placeholder='--Input Number--'])[8]",
        freightPercent: "(//input[@placeholder='--Input Number--'])[9]",
        freightAmount: "(//input[@placeholder='--Input Number--'])[10]",
        freightMaxAmount: "(//input[@placeholder='--Input Number--'])[11]",
    };

    async clickOnInvoiceMatchingMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.invoiceMatchingMenu);
    }

    async editFreightMaxLimitation(): Promise<void> {
        // store current
        try {
            this.data.oldFreightMax = await this.page.locator(this.Elements.freightMaxAmount).inputValue();
        } catch (e) {
            this.data.oldFreightMax = '';
        }
        // set new value
        const newVal = (getRandomInt(1000, 9000) + 1000).toString(); // between 2000 and 10000-ish
        this.data.newFreightMax = newVal;
        await this.page.locator(this.Elements.freightMaxAmount).fill(this.data.newFreightMax);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
    }

    async resetFreightMaxLimitationTo(value: string): Promise<void> {
        // set to given value and save
        await this.page.locator(this.Elements.freightMaxAmount).fill(value);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
    }

    async verifyFreightMaxValue(expected: string): Promise<void> {
        // reopen module to ensure value persisted
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.invoiceMatchingMenu);
        const val = await this.page.locator(this.Elements.freightMaxAmount).inputValue();
        if (val.trim() !== expected.trim()) {
            throw new Error(`Expected Freight Max Limitation to be '${expected}', but found '${val}'`);
        }
    }

    async clickResetAndVerifyFieldsEmpty(): Promise<void> {
        // click Reset and verify known fields are empty
        await this.page.locator(this.Elements.resetButton).click();
        await fixture.page.waitForTimeout(500);
        const locators = [
            this.Elements.invoiceLevelPercent,
            this.Elements.invoiceLevelAmount,
            this.Elements.costItemLevelPercent,
            this.Elements.costItemLevelAmount,
            this.Elements.unitPricePercent,
            this.Elements.unitPriceAmount,
            this.Elements.taxPercent,
            this.Elements.taxAmount,
            this.Elements.freightPercent,
            this.Elements.freightAmount,
            this.Elements.freightMaxAmount,
        ];
        for (const sel of locators) {
            const val = await this.page.locator(sel).inputValue();
            if (val && val.trim().length > 0) {
                throw new Error(`Expected field ${sel} to be empty after reset but found '${val}'`);
            }
        }
    }

    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Modify');
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Modify');
        await this.page.locator(this.Elements.closeButton).click();
    }

}
