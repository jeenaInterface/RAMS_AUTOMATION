import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomEmail, randomName, randomtext, randomValuePhone, randomWebsite } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class AssetManufacturePage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        assetManufactureMenu: "//span[normalize-space(text())='- Asset Manufacturer']",
        createButton: "//span[normalize-space(text())='Create']",
        saveButton: "//span[normalize-space(text())='Save']",
        okButton: "(//div[@class='el-message-box__btns']//button)[2]",
        inquireSearchBox: "(//input[@class='el-input__inner'])[1]",
        firstRowEdit: "//i[@class='ivu-icon ivu-icon-edit']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "(//div[@class='el-dialog__header']//span)[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        closeButton: "(//button[@aria-label='Close']//i)[1]",

        // form fields
        code: "(//label[normalize-space(text())='Code:']/following::input)[1]",
        name: "(//span[normalize-space(text())='*']/following::input)[1]",
        SAPCustomerCode: "(//label[normalize-space(text())='SAP Customer Code:']/following::input)[1]",
        Website: "(//label[normalize-space(text())='Website:']/following::input)[1]",
        terms: "(//label[normalize-space(text())='Terms:']/following::input)[1]",
        fob: "(//label[normalize-space(text())='FOB:']/following::input)[1]",
        shipVia: "(//label[normalize-space(text())='Ship Via:']/following::input)[1]",
        contactName1: "(//label[normalize-space(text())='Contact 1 Name:']/following::input)[1]",
        contactName2: "(//label[normalize-space(text())='Contact 2 Name:']/following::input)[1]",
        AddressLine1: "(//label[normalize-space(text())='Address Line 1:']/following::input)[1]",
        AddressLine2: "(//label[normalize-space(text())='Address Line 2:']/following::input)[1]",
        phone: "(//label[normalize-space(text())='Phone No.:']/following::input)[1]",
        email: "(//label[normalize-space(text())='Email:']/following::input)[1]",
        FaxNo: "(//label[normalize-space(text())='Fax No.:']/following::input)[1]",
        PhoneNo: "(//label[normalize-space(text())='Phone No.:']/following::input)[1]",
        city: "(//label[normalize-space(text())='City:']/following::input)[1]",
        zipcode: "(//label[normalize-space(text())='Zip Code:']/following::input)[1]",
        status: "(//label[normalize-space(text())='Status:']/following::input)[1]",
        state: "(//label[normalize-space(text())='State:']/following::input)[1]",
        newButton:"//span[normalize-space(text())='New']",
        createAssetMnaufactureHeader:"(//div[@class='ivu-card-head']//div)[1]"
    };

    public data: { id?: string } = {};

    async clickOnMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.assetManufactureMenu);
    }

    async clickOnCreateButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.createButton);
    }

    async fillForm(): Promise<void> {
        // generate a readable random manufacturer name and store it as the id
        const manufacturer = `${randomName}${getRandomInt(100, 999)}`; // e.g. "JohnSmith123"
        this.data = { id: manufacturer };
        // fill the name with the generated manufacturer
        await this.page.locator(this.Elements.name).fill(this.data.id!);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.SAPCustomerCode).fill(randomtext);
        await this.page.locator(this.Elements.Website).fill(randomWebsite);
        await this.page.locator(this.Elements.terms).click();
        await this.page.getByRole('listitem').filter({ hasText: 'NET60' }).click();
        await this.page.locator(this.Elements.fob).click();
        await this.page.getByRole('listitem').filter({ hasText: 'DESTINATION' }).click();
        await this.page.locator(this.Elements.shipVia).click();
        await this.page.getByRole('listitem').filter({ hasText: 'BEST WAY' }).click();
        await this.page.locator(this.Elements.contactName1).fill(randomName);
        await this.page.locator(this.Elements.contactName2).fill(randomName);
        await this.page.locator(this.Elements.email).fill(randomEmail);
        await this.page.locator(this.Elements.state).click();
        await this.page.getByRole('listitem').filter({ hasText: 'AK-Alaska' }).click();

        await this.page.getByPlaceholder('--Input At Least 3 Letters--').click();
        await this.page.locator(this.Elements.city).fill('Unalaska');
        await this.page.locator(this.Elements.zipcode).fill('99685');
        await this.page.locator(this.Elements.AddressLine1).fill(randomtext);
        await this.page.locator(this.Elements.AddressLine2).fill(randomtext);
        await this.page.locator(this.Elements.PhoneNo).fill(randomValuePhone);
        await this.page.locator(this.Elements.FaxNo).fill(randomValuePhone);
    }

    async submit(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();

    }

    async search(): Promise<void> {
        await this.page.locator(this.Elements.inquireSearchBox).fill(this.data.id!);
    }

    async clickOnEditButton(): Promise<void> {
        // await this.page.locator(this.Elements.firstRowEdit).click();
        // await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.status).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Inactive' }).click();
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
    }

    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Modify');
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Modify');
        await this.page.locator(this.Elements.closeButton).click();
    }
    async newButtonFunctionality(): Promise<void> {
        await this.page.locator(this.Elements.newButton).click();
        await expect(this.page.locator(this.Elements.createAssetMnaufactureHeader)).toBeVisible();
        await expect(this.page.locator(this.Elements.name)).toBeEmpty();
        await expect(this.page.locator(this.Elements.SAPCustomerCode)).toBeEmpty();
        await expect(this.page.locator(this.Elements.Website)).toBeEmpty();
    }
}
