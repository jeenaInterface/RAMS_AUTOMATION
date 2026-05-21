import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class StockLocationPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public stockLocationCode: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        stockLocationMenu: "//span[normalize-space(text())='- Stock Location']",
        create: "//span[normalize-space(text())='Create']",
        code: "(//label[normalize-space(text())='Code']/following::input)[1]",
        description: "(//label[normalize-space(text())='Description']/following::textarea)[1]",
        status: "//div[@class='el-input']//input[@placeholder='--Select One--']",
        save: "//span[normalize-space(text())='Save']",
        codeList: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/span[1]",
        okButton: "//button[normalize-space()='OK']",
        OkButtonOnPopUp: "(//span[contains(text(),'OK')])[2]",
        warehouseDropdown: "(//input[@class='el-input__inner'])[1]",
        firstRowEdit: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/button[1]/span[1]/i[1]",
        firstRowDelete: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/div[1]/button[1]",
        confirmDeleteButton: "//span[normalize-space()='OK']",
        row:"(//label[normalize-space(text())='Row']/following::input)[1]",
        column:"(//label[normalize-space(text())='Column']/following::input)[1]",
        shelf:"(//label[normalize-space(text())='Shelf']/following::input)[1]",
        bin:"(//label[normalize-space(text())='Bin']/following::input)[1]",
        subbin:"(//label[normalize-space(text())='Sub Bin']/following::input)[1]",
        yesButton:"//span[normalize-space(text())='Yes']"


    };

    async clickOnStockLocationMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.stockLocationMenu);
    }

    async createNewStockLocation(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);
        this.stockLocationCode = `TSL${randomNumber}`;
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.locator(this.Elements.row).fill(this.stockLocationCode);
        await this.page.locator(this.Elements.column).fill(`${randomNumber}`);
        await this.page.locator(this.Elements.shelf).fill(`${randomNumber}`);
        await this.page.locator(this.Elements.bin).fill(`${randomNumber}`);
        await this.page.locator(this.Elements.subbin).fill(`${randomNumber}`);
        await this.base.waitAndClick(this.Elements.save);
        await this.page.locator(this.Elements.okButton).click();
    }

    async searchStockLocationCode(): Promise<void> {
        await this.page.locator(this.Elements.codeList).fill(this.stockLocationCode);
    }

    async verifySearchResult(): Promise<void> {
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText(this.stockLocationCode);
    }

    async deleteStockLocation(): Promise<void> {
        await this.page.locator(this.Elements.firstRowDelete).click();
        await this.page.locator(this.Elements.yesButton).click();
        await this.page.locator(this.Elements.okButton).click();
    }

    async verifyStockLocationNotDisplayed(): Promise<void> {
        const deletedStockLocationLocator = `//table[@class='el-table__body']//span[normalize-space(text())='${this.stockLocationCode}']`;
        await expect(this.page.locator(deletedStockLocationLocator)).not.toBeVisible();
    }
}
