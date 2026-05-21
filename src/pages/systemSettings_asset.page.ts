import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class AssetPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        assetMenu: "//span[normalize-space(text())='- Asset']",
        createButton: "//span[normalize-space(text())='Create']",
        saveButton: "//span[normalize-space(text())='Save']",
        okButton: "(//div[@class='el-message-box__btns']//button)[2]",
        inquireSearchBox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        firstRowEdit: "//i[@class='ivu-icon ivu-icon-edit']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "(//div[@class='el-dialog__header']//span)[2]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        closeButton: "(//button[@aria-label='Close']//i)[2]",

        // asset form specific locators
        assetNo: "(//label[normalize-space(text())='Asset Number']/following::input)[1]",
        assetGroup: "(//label[normalize-space(text())='Asset Group']/following::input)[1]",
        assetStatus: "(//label[normalize-space(text())='Asset Status']/following::input)[1]",
        assetdescription: "(//label[normalize-space(text())='Asset Description']/following::textarea)[1]",
        notes: "(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        serialNumber: "(//label[normalize-space(text())='Serial Number']/following::input)[1]",
        SAPMainAssetNo: "(//label[normalize-space(text())='SAP Main Asset No.']/following::input)[1]",
        year: "(//label[normalize-space(text())='Year']/following::input)[1]",
        hours: "(//label[normalize-space(text())='Hours']/following::input)[1]",
        AssetManufacturersIcon: "//div[@class='el-select']/following-sibling::i[1]",
        nameSearch: "(//label[normalize-space(text())='Name']/following::input)[1]",
        searchButton: "//span[normalize-space(text())='Search']",
        okButtonSearchPopUp: "(//button[@class='el-button el-button--primary']//span)[3]",
        model: "(//label[normalize-space(text())='Model']/following::input)[1]",
        fuel: "(//label[normalize-space(text())='Fuel']/following::input)[1]",
        warrenryEndDate: "(//label[normalize-space(text())='Warranty Ends']/following::input)[1]",
        engineManufature: "(//label[normalize-space(text())='Engine Manufacturer']/following::input)[1]",
        engineSerialNo: "(//label[normalize-space(text())='Engine Serial']/following::input)[1]",
        engineModel: "(//label[normalize-space(text())='Engine Model']/following::input)[1]",
        engineFamily: "(//label[normalize-space(text())='Engine Family']/following::input)[1]",
        retiredDate: "(//label[normalize-space(text())='Retired Date']/following::input)[1]",
        newButton: "//span[normalize-space(text())='New']",
        createAssetHeader: "(//div[@class='ivu-card-head']//div)[1]"

    };

    public assetData: { assetId?: string } = {};

    async clickOnAssetMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.assetMenu);
    }

    async clickOnCreateButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.createButton);
    }

    async fillAssetForm(): Promise<void> {
        this.assetData = { assetId: 'Automation' + getRandomInt(4000, 9999).toString() };
        await this.page.locator(this.Elements.assetNo).fill(this.assetData.assetId!);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.assetGroup).click();
        await this.page.getByRole('listitem').filter({ hasText: 'AC - Access Gate Controller' }).click();
        await this.page.locator(this.Elements.assetdescription).fill(randomtext);
        await this.page.locator(this.Elements.notes).fill(randomtext);
        await this.page.locator(this.Elements.serialNumber).fill(this.assetData.assetId!);
        await this.page.locator(this.Elements.SAPMainAssetNo).fill(this.assetData.assetId!);
        await this.page.locator(this.Elements.year).fill('2025');
        await this.page.locator(this.Elements.hours).fill('100');

        await this.page.locator(this.Elements.AssetManufacturersIcon).click();
        await this.page.locator(this.Elements.nameSearch).fill('ABB');
        await this.page.locator(this.Elements.searchButton).click();
        await this.page.locator(this.Elements.okButtonSearchPopUp).click();
        await this.page.locator(this.Elements.model).fill(randomtext);
        await this.page.locator(this.Elements.fuel).fill('petrol');

        await this.page.locator(this.Elements.warrenryEndDate).fill('2030-Oct-16');
        await this.page.locator(this.Elements.engineManufature).fill(randomtext);
        await this.page.locator(this.Elements.engineSerialNo).fill(randomtext);
        await this.page.locator(this.Elements.engineModel).fill(randomtext);
        await this.page.locator(this.Elements.engineFamily).fill(randomtext);

    }

    async submit(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
        // reopen asset list
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.assetMenu);
    }

    async searchAsset(): Promise<void> {
        await this.page.locator(this.Elements.inquireSearchBox).fill(this.assetData.assetId!);
    }

    async clickOnEditButton(): Promise<void> {
        await fixture.page.waitForTimeout(8000);
        await this.page.locator(this.Elements.firstRowEdit).click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.assetStatus).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Retired' }).first().click();
        // fill retired date using project's currentDate (format YYYY-Mmm-DD, e.g. 2025-Oct-16)
        await this.page.locator(this.Elements.retiredDate).fill('2025-Oct-16');
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
    }

    async verifyActionLog(): Promise<void> {
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Add');
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Add');
        await this.page.locator(this.Elements.closeButton).click();
    }


}
