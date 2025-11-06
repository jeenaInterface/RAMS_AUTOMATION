import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class MaintainCostSetUpPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        MaintainCostSetUpMenu: "//span[normalize-space()='- Maintain Cost Setup']",
        save: "(//span[contains(text(),'Save')])[1]",
        firstRowEdit: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/button[1]/span[1]/i[1]",
        firstrowdelete: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/button[2]/span[1]/i[1]",
        okButton: "//span[normalize-space(text())='OK']",
        noButton: "//span[normalize-space(text())='No']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "(//div[@class='el-dialog__header']//span)[2]",
        closeButton: "(//button[@aria-label='Close']//i)[2]",
        deleteLastButton: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[9]/td[5]/div[1]/button[2]/span[1]/i[1]"

    };

    async clickOnCostSetupMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.MaintainCostSetUpMenu);
    }

    async verifyEditFunctionality(): Promise<void> {

        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.firstRowEdit).click();
        await this.page.locator('tr:nth-child(8) > .el-table_1_column_11 > .cell > button').first().click();
        await this.page.locator('tr:nth-child(9) > .el-table_1_column_8 > .cell > div > .test > div > .el-select > .el-input > .el-input__inner').click();
        await this.page.getByRole('listitem').filter({ hasText: '11 - PCMC PARTS LEAD' }).locator('span').click();
        await this.page.locator('tr:nth-child(9) > .el-table_1_column_9 > .cell > div > .test > .el-input > .el-input__inner').click();
        await this.page.locator('tr:nth-child(9) > .el-table_1_column_9 > .cell > div > .test > .el-input > .el-input__inner').fill('45');
        await this.page.locator('tr:nth-child(9) > .el-table_1_column_10 > .cell > div > .test > .el-input > .el-input__inner').click();
        await this.page.locator('tr:nth-child(9) > .el-table_1_column_10 > .cell > div > .test > .el-input > .el-input__inner').click();
        await this.page.locator('tr:nth-child(9) > .el-table_1_column_10 > .cell > div > .test > .el-input > .el-input__inner').fill('2');
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.firstRowEdit).click();
        await this.page.locator(this.Elements.deleteLastButton).click();
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.okButton).click();

    }
    async verifyDeleteFunctionality(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.firstrowdelete).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.noButton).click();

    }
    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.closeButton).click();
    }

}