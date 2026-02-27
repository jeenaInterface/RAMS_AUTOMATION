import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class SupportDataPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public assetGroupCode: string = '';
    public WarehouseCode: string = '';
    public vendorType: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        vendorMenu: "//span[normalize-space(text())='- Vendor']",
        supportDataMenu: "//span[normalize-space(text())='- Supporting Data']",
        create: "//span[normalize-space(text())='Create']",
        vendorType: "(//input[@placeholder='--Select One--'])[1]",
        code: "(//label[normalize-space(text())='Code']/following::input)[1]",
        description: "(//label[normalize-space(text())='Description']/following::textarea)[1]",
        status: "//div[@class='el-input']//input[@placeholder='--Select One--']",
        save: "//span[normalize-space(text())='Save']",
        codeList: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/span[1]",
        assetMenu: "//span[normalize-space(text())='- Asset']",
        assetGroup: "(//label[normalize-space(text())='Asset Group']/following::input)[1]",
        firstRowEdit: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/button[1]/span[1]/i[1]",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//div[@class='el-dialog__header']//span[1]",
        closeButton: "(//button[@aria-label='Close']//i)[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResultActionLog: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        okButton: "//button[normalize-space()='OK']",
        OkButtonOnPopUp: "(//span[contains(text(),'OK')])[2]",
        typeList: "(//input[@placeholder='--Select One--'])[1]",
        stockLocation: "//span[normalize-space()='- Stock Location']",
        wareHouseCode: "(//input[@class='el-input__inner'])[1]",


    };

    async clickOnSupportDataMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.supportDataMenu);
    }

    async CreateNewAssetGroup(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);
        this.assetGroupCode = `TSG${randomNumber}`;
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.locator(this.Elements.code).fill(this.assetGroupCode);
        await this.page.locator(this.Elements.description).fill(`Test Asset Group ${randomNumber}`);
        await this.base.waitAndClick(this.Elements.save);
        await this.page.locator(this.Elements.okButton).click();
    }
    async searchCode(): Promise<void> {
        await this.page.locator(this.Elements.codeList).fill(this.assetGroupCode);
    }

    async verifySearchResult(): Promise<void> {
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText(this.assetGroupCode);
    }
    async verifyAssetGroupInAssetForm(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.assetMenu);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.locator(this.Elements.assetGroup).click();
        const assetGroupOption = this.page.locator(`.el-select-dropdown__item:has-text("${this.assetGroupCode}")`);
        await expect(assetGroupOption).toBeVisible();

    }
    async verifyEditFunctionality(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.supportDataMenu);
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.codeList).fill(this.assetGroupCode);
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.firstRowEdit).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.status).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Inactive' }).click();
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.OkButtonOnPopUp).click();

    }

    async CreateNewWareHouse(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);
        this.WarehouseCode = `TW${randomNumber}`;

        await this.page.locator(this.Elements.typeList).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Warehouse' }).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.locator(this.Elements.code).fill(this.WarehouseCode);
        await this.page.locator(this.Elements.description).fill(`Test WareHouse ${randomNumber}`);
        await this.base.waitAndClick(this.Elements.save);
        await this.page.locator(this.Elements.okButton).click();
    }

    async CreateVendorType(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);
        this.vendorType = `TVT${randomNumber}`;

        await this.page.locator(this.Elements.typeList).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Vendor Type' }).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.locator(this.Elements.code).fill(this.vendorType);
        await this.page.locator(this.Elements.description).fill(`Test Vendor Type ${randomNumber}`);
        await this.base.waitAndClick(this.Elements.save);
        await this.page.locator(this.Elements.okButton).click();
    }
    async searchWareHouseCode(): Promise<void> {
        await this.page.locator(this.Elements.codeList).fill(this.WarehouseCode);
    }

    async verifySearchResultWareHouseCode(): Promise<void> {
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText(this.WarehouseCode);
    }
    async searchVendorTypeCode(): Promise<void> {
        await this.page.locator(this.Elements.codeList).fill(this.vendorType);
    }

    async verifySearchResultVendorType(): Promise<void> {
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText(this.vendorType);
    }
    async verifyWareHouseInStockLocationForm(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.assetMenu);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.locator(this.Elements.assetGroup).click();
        const assetGroupOption = this.page.locator(`.el-select-dropdown__item:has-text("${this.assetGroupCode}")`);
        await expect(assetGroupOption).toBeVisible();

    }

    async clickOnStockLocation(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.stockLocation);
        await this.page.locator(this.Elements.wareHouseCode).click();
        const warehouseCodeOption = this.page.locator(`.el-select-dropdown__item:has-text("${this.WarehouseCode}")`);
        await expect(warehouseCodeOption).toBeVisible();
    }
    async verifyEditWareHouseFunctionality(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.supportDataMenu);
        await this.page.locator(this.Elements.typeList).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Warehouse' }).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.codeList).fill(this.WarehouseCode);
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.firstRowEdit).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.status).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Inactive' }).click();
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.okButton).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);

    }

    async verifyNewlyAddedVendorInVendoeList(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.vendorMenu);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.locator(this.Elements.vendorType).click();
        const warehouseCodeOption = this.page.locator(`.el-select-dropdown__item:has-text("${this.vendorType}")`);
        await expect(warehouseCodeOption).toBeVisible();
    }
    async verifyEditVendorTypeFunctionality(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.supportDataMenu);
        await this.page.locator(this.Elements.typeList).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Vendor Type' }).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.codeList).fill(this.vendorType);
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.firstRowEdit).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.status).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Inactive' }).click();
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.okButton).click();
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(500);

    }

}
