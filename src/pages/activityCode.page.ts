import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate, UOM_PIECES, UOM_BOX50 } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class ActivityCodePage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        activityCodeMenu: "//span[normalize-space()='- Activity Code']",
        create: "//span[normalize-space(text())='Create']",
        save: "//span[normalize-space(text())='Save']",
        codeList: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//span[normalize-space(text())='5CL - Shop Cleaning']",
        firstRowEdit: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/button[1]/span[1]/i[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        firstrowdelete: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/button[2]/span[1]/i[1]",
        okButton: "//button[normalize-space()='OK']",
        yesButton: "//span[normalize-space()='Yes']",
        rightSideMoveButton: "(//i[@class='el-icon-arrow-left'])[1]",



    };

    async clickOnActivityCodeMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.activityCodeMenu);
    }

    async CreateActivityCode(): Promise<void> {
        await this.page.getByPlaceholder('--Select One--').click();
        await this.page.getByText('AC - Access Gate Controller').click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.getByPlaceholder('--Select One--').nth(1).click();
        await this.page.getByText('5CL - Shop Cleaning').click();
        await this.page.locator('label').filter({ hasText: 'BK - Blocked' }).locator('span').nth(1).click();
        await this.page.locator('label').filter({ hasText: 'BL - Blowout' }).locator('span').nth(1).click();
        await this.page.locator('label').filter({ hasText: 'BN - Burned' }).locator('span').nth(1).click();
        await this.page.getByRole('button', { name: '' }).first().click();
        await this.page.locator('label').filter({ hasText: '"A" - Service' }).locator('span').nth(1).click();
        await this.page.locator('label').filter({ hasText: '"B" - Service with Rope Check' }).locator('span').nth(1).click();
        await this.page.locator('label').filter({ hasText: 'AB - Abrasive clean and paint' }).locator('span').nth(1).click();
        await this.page.getByRole('button', { name: '' }).nth(1).click();
        await this.page.locator('label').filter({ hasText: 'BACK - Back Reach' }).locator('span').nth(1).click();
        await this.page.locator('label').filter({ hasText: 'BATT - Battery Rack' }).locator('span').nth(1).click();
        await this.page.locator('label').filter({ hasText: 'BOHO - Boom Hoist' }).locator('span').nth(1).click();
        await this.page.getByRole('button', { name: '' }).nth(2).click();
        await this.page.locator('label').filter({ hasText: 'IYAGC' }).locator('span').nth(1).click();
        await this.page.locator('label').filter({ hasText: 'IYAG1' }).locator('span').nth(1).click();
        await this.page.locator('label').filter({ hasText: 'IYAG2' }).locator('span').nth(1).click();
        await this.page.getByRole('button', { name: '' }).nth(3).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }
    async searchCode(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.activityCodeMenu);
        await this.page.getByPlaceholder('--Select One--').click();
        await this.page.getByText('AC - Access Gate Controller').click();
        await this.page.getByPlaceholder('--Input Text--').first().click();
        await this.page.getByPlaceholder('--Input Text--').first().fill('5cl');

    }

    async verifySearchResult(): Promise<void> {
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('5CL - Shop Cleaning');
    }

    async verifyEditFunctionality(): Promise<void> {

        await this.page.getByPlaceholder('--Input Text--').first().click();
        await this.page.getByPlaceholder('--Input Text--').first().fill('5cl');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.firstRowEdit).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);
        await this.page.locator('label').filter({ hasText: 'BN - Burned' }).locator('span').nth(1).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(5000);
        await this.page.locator(this.Elements.rightSideMoveButton).click();
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.okButton).click();

    }
    async verifyDeleteFunctionality(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.activityCodeMenu);
        await this.page.getByPlaceholder('--Select One--').click();
        await this.page.getByText('AC - Access Gate Controller').click();
        await this.page.getByPlaceholder('--Input Text--').first().click();
        await this.page.getByPlaceholder('--Input Text--').first().fill('5cl');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.firstrowdelete).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.yesButton).click();
        await this.page.locator(this.Elements.okButton).click();

    }

}