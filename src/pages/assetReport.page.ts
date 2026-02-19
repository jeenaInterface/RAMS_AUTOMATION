import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class AssetOwnerPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        assetGroup:"(//label[normalize-space(text())='Asset Group']/following::input)[2]",
        assetStatus:"(//label[normalize-space(text())='Asset Status']/following::input)[2]",
        assetFields:"//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        summaryFields:"(//span[@class='el-checkbox__inner'])[25]",
        dateRange:"//label[normalize-space(text())='Summary Statistic Date Range (Repair Date)']/following::input",
        runButton:"//span[normalize-space()='Run']",
        saveButton:"//span[normalize-space()='Save']",
        saveAsButton:"//button[@type='button']//span[contains(text(),'Save As')]",
        reportMenu:"//span[normalize-space()='Report']",
        AssetReportMenu:"(//span[normalize-space()='- Create Asset Report'])[1]"

    }

     async clickOnAssetReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.AssetReportMenu);
    }
}
