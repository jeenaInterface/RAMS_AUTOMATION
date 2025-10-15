import { expect, Page, Locator } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { currentDate, getRandomInt, randomName, randomEmail, randomValuePhone, randomtext } from "../helper/util/test-data/randomdata";
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
        assetOwner: "(//input[@placeholder='--Input Text--'])[1]",
        assetOwnerName: "(//input[@class='el-input__inner'])[2]",
        SAPCustomerCode: "(//label[normalize-space(text())='SAP Customer Code:']/following::input)[1]",
        Tariff: "(//input[@placeholder='--Select One--'])[2]",
        Contact1Name: "(//label[normalize-space(text())='Contact 1 Name:']/following::input)[1]",
        Contact2Name: "(//label[normalize-space(text())='Contact 2 Name:']/following::input)[1]",
        email: "(//label[normalize-space(text())='Email:']/following::input)[1]",
        state: "(//label[normalize-space(text())='State:']/following::input)[1]",
        city: "(//label[normalize-space(text())='City:']/following::input)[1]",
        zipcode: "(//label[normalize-space(text())='Zip Code:']/following::input)[1]",
        AddressLine1: "(//label[normalize-space(text())='Address Line 1:']/following::input)[1]",
        AddressLine2: "(//label[normalize-space(text())='Address Line 2:']/following::input)[1]",
        PhoneNo: "(//label[normalize-space(text())='Phone No.:']/following::input)[1]",
        FaxNo: "(//label[normalize-space(text())='Fax No.:']/following::input)[1]",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//div[@class='el-dialog__header']//span[1]",
        closeButton: "(//button[@aria-label='Close']//i)[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        assetOwnerMenu: "//span[normalize-space(text())='- Asset Owner']",
        createButton: "//span[normalize-space(text())='Create']",
        saveButton: "//span[normalize-space(text())='Save']",
        okButton: "//button[normalize-space()='OK']",
        inquireSearchBox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        firstRowEdit: "//i[@class='ivu-icon ivu-icon-edit']",
    };

    public assetOwnerData: { ownerId?: string } = {};

    async clickOnAssetOwnerMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.assetOwnerMenu);
    }

    async clickOnCreateButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.createButton);
    }

    async fillAssetOwnerForm(): Promise<void> {
        // generate a random ID and basic details
        this.assetOwnerData = { ownerId: getRandomInt(3000, 9999).toString() };
        await this.page.locator(this.Elements.assetOwner).fill(this.assetOwnerData.ownerId!);
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.assetOwnerName).fill(randomName);
    await this.page.locator(this.Elements.SAPCustomerCode).fill(this.assetOwnerData.ownerId!);
    // select Tariff dropdown specifically by its label to avoid ambiguous locators
    const tariffLocator: Locator = this.page.locator("//label[normalize-space(text())='Tariff']/following::input[1]");
    await tariffLocator.click();
    await this.page.getByRole('listitem').filter({ hasText: 'BAL_06292024' }).first().click();
        await this.page.locator(this.Elements.Contact1Name).fill(randomName);
        await this.page.locator(this.Elements.Contact2Name).fill(randomName);
        await this.page.locator(this.Elements.email).fill(randomEmail);
        await this.page.getByPlaceholder('--Select One--').nth(3).click();
        await this.page.getByRole('listitem').filter({ hasText: 'AK-Alaska' }).click();
        await this.page.locator(this.Elements.city).fill('Unalaska');
        // await this.page.getByPlaceholder('--Input At Least 3 Letters--').click();
        // await this.page.getByRole('listitem').filter({ hasText: 'Unalaska' }).click();
        await this.page.locator('div:nth-child(4) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner').click();
        await this.page.locator('div:nth-child(4) > .el-form-item > .el-form-item__content > .el-input > .el-input__inner').fill('99685');
        await this.page.locator(this.Elements.AddressLine1).fill(randomtext);
        await this.page.locator(this.Elements.AddressLine2).fill(randomtext);
        await this.page.locator(this.Elements.PhoneNo).fill(randomValuePhone);
        await this.page.locator(this.Elements.FaxNo).fill(randomValuePhone);
        // set status if present
    }

    async submit(): Promise<void> {
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
        // reopen the module to reach inquire list state similar to other pages
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.assetOwnerMenu);
    }

    async searchOwner(): Promise<void> {
        await this.page.locator(this.Elements.inquireSearchBox).fill(this.assetOwnerData.ownerId!);
    }

    async clickOnEditButton(): Promise<void> {
        await this.page.locator(this.Elements.firstRowEdit).click();
                fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
    }

    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Add');
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Add');
        await this.page.locator(this.Elements.closeButton).click();
    }

}
