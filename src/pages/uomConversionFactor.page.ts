import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate, UOM_PIECES, UOM_BOX50 } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class UOMConversionPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        UOMConversionFactor: "//span[normalize-space()='- UOM Conversion Factor']",
        create: "//span[normalize-space(text())='Create']",
        fromUOM: "(//input[@placeholder='--Select One--'])[3]",
        fromUOMSEARCH: "//table[@class='el-table__header']/thead[1]/tr[2]/th[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        toUOM: "(//input[@placeholder='--Select One--'])[4]",
        CONVERSIONfACTOR: "(//label[normalize-space(text())='Conversion Factor(From/To)']/following::input)[1]",
        save: "//span[normalize-space(text())='Save']",
        codeList: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//tbody/tr[1]/td[1]/div[1]/span[1]",
        firstRowEdit: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[3]/table[1]/tbody[1]/tr[1]/td[4]/div[1]/button[1]/span[1]/i[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        firstrowdelete: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[3]/table[1]/tbody[1]/tr[1]/td[4]/div[1]/button[2]/span[1]/i[1]",
        okButton: "//button[normalize-space()='OK']",
        yesButton: "//span[normalize-space()='Yes']"



    };

    async clickOnUOMConversionMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.UOMConversionFactor);
    }

    async CreateUOMConversionFactor(): Promise<void> {

        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.getByPlaceholder('--Select One--').nth(2).click();
        await this.page.getByRole('listitem').filter({ hasText: 'PIECES' }).locator('span').click();
        await this.page.getByPlaceholder('--Select One--').nth(3).click();
        await this.page.getByRole('listitem').filter({ hasText: 'LBS' }).click();
        await this.page.locator('form').getByPlaceholder('--Input Text--').click();
        await this.page.locator('form').getByPlaceholder('--Input Text--').fill('12');
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }
    async searchCode(): Promise<void> {
        await this.page.getByPlaceholder('--Select One--').first().click();
        await this.page.getByRole('listitem').filter({ hasText: 'PIECES' }).click();
    }

    async verifySearchResult(): Promise<void> {
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText(UOM_PIECES);
    }

    async verifyEditFunctionality(): Promise<void> {

        await this.page.locator(this.Elements.firstRowEdit).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.CONVERSIONfACTOR).fill("0.03")
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.okButton).click();

    }
    async verifyDeleteFunctionality(): Promise<void> {
        await this.page.locator(this.Elements.fromUOMSEARCH).fill(UOM_PIECES);
        await this.page.locator(this.Elements.firstrowdelete).click();
        await this.page.locator(this.Elements.yesButton).click();
        await this.page.locator(this.Elements.okButton).click();

    }

}