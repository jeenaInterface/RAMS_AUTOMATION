import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomEmail, randomValuePhone, randomtext, randomWebsite } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class VendorPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        vendorMenu: "//span[normalize-space(text())='- Vendor']",
        createButton: "//span[normalize-space(text())='Create']",
        saveButton: "//span[normalize-space(text())='Save']",
        okButton: "//button[normalize-space()='OK']",
        inquireSearchBox: "(//input[@class='el-input__inner'])[1]",
        firstRowEdit: "//i[@class='ivu-icon ivu-icon-edit']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//div[@class='el-dialog__header']//span[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        closeButton: "(//button[@aria-label='Close']//i)[1]",

        // vendor form specific locators (kept generic to match similar pages)
        code: "(//label[normalize-space(text())='Code:']/following::input)[1]",
        vendorName: "(//label[normalize-space(text())='Name:']/following::input)[1]",
        email: "(//label[normalize-space(text())='Email:']/following::input)[1]",
        city: "(//label[normalize-space(text())='City:']/following::input)[1]",
        zipcode: "(//label[normalize-space(text())='Zip Code:']/following::input)[1]",
        PhoneNo: "(//label[normalize-space(text())='Phone No.:']/following::input)[1]",
        FaxNo: "(//label[normalize-space(text())='Fax No.:']/following::input)[1]",
        vendorType: "(//input[@placeholder='--Select One--'])[1]",
        NIGPCode: "(//label[normalize-space(text())='NIGP Code:']/following::input)[1]",
        NIGPDescription: "(//label[normalize-space(text())='NIGP Description:']/following::input)[1]",
        Website: "(//label[normalize-space(text())='Website:']/following::input)[1]",
        terms: "(//label[normalize-space(text())='Terms:']/following::input)[1]",
        fob: "(//label[normalize-space(text())='FOB:']/following::input)[1]",
        shipVia: "(//label[normalize-space(text())='Ship Via:']/following::input)[1]",
        SupplierAccountNumber: "(//label[normalize-space(text())='Supplier Account Number']/following::input)[1]",
        contactName1: "(//label[normalize-space(text())='Contact 1 Name:']/following::input)[1]",
        contactName2: "(//label[normalize-space(text())='Contact 2 Name:']/following::input)[1]",
        AddressLine1: "(//label[normalize-space(text())='Address Line 1:']/following::input)[1]",
        AddressLine2: "(//label[normalize-space(text())='Address Line 2:']/following::input)[1]",
        Freight: "(//label[normalize-space(text())='Freight Max Limitation:']/following::input)[1]",
        checkDuplicationCheckBox: "//span[@class='el-checkbox__input']//span[1]",
        checkDuplicationInvoice: "(//span[normalize-space(text())='Check duplication Invoice No. in']/following::input)[1]",
        status: "(//label[normalize-space(text())='Status:']/following::input)[1]",
                newButton:"//span[normalize-space(text())='New']",
        createVendorHeader:"(//div[@class='ivu-card-head']//div)[1]"


    };

    public vendorData: { vendorId?: string } = {};

    async clickOnVendorMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.vendorMenu);
    }

    async clickOnCreateButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.createButton);
    }

    async fillVendorForm(): Promise<void> {
        // generate a random vendor id and fill common fields
        this.vendorData = { vendorId: getRandomInt(3000, 9999).toString() };
        await this.page.locator(this.Elements.code).fill(this.vendorData.vendorId!);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.vendorName).fill(randomName);
        await this.page.locator('input[name="typeSelect"]').click();
        await this.page.getByText('Emission Service').click();
        await this.page.getByRole('listitem').filter({ hasText: 'FUEL' }).click();
        await this.page.locator(this.Elements.NIGPCode).fill(randomtext);
        await this.page.locator(this.Elements.NIGPDescription).fill(randomtext);
        // fill random website using helper
        await this.page.locator(this.Elements.Website).fill(randomWebsite);
        await this.page.locator(this.Elements.terms).click();
        await this.page.getByRole('listitem').filter({ hasText: 'NET60' }).click();
        await this.page.locator(this.Elements.fob).click(); 
        await this.page.getByRole('listitem').filter({ hasText: 'DESTINATION' }).click();
        await this.page.locator(this.Elements.shipVia).click();
        await this.page.getByRole('listitem').filter({ hasText: 'BEST WAY' }).click();
     
        await this.page.locator(this.Elements.SupplierAccountNumber).fill(this.vendorData.vendorId!);
        await this.page.locator(this.Elements.contactName1).fill(randomName);
        await this.page.locator(this.Elements.contactName2).fill(randomName);
        await this.page.locator(this.Elements.email).fill(randomEmail);
        await this.page.locator('div:nth-child(5) > div:nth-child(2) > .el-form-item > .el-form-item__content > .el-select > .el-input > .el-input__inner').click();
        await this.page.getByRole('listitem').filter({ hasText: 'AK-Alaska' }).click();

        await this.page.getByPlaceholder('--Input At Least 3 Letters--').click();
        await this.page.locator(this.Elements.city).fill('Unalaska');
await this.page.locator(this.Elements.zipcode).fill('99685');
        await this.page.locator(this.Elements.AddressLine1).fill(randomtext);
        await this.page.locator(this.Elements.AddressLine2).fill(randomtext);
        await this.page.locator(this.Elements.PhoneNo).fill(randomValuePhone);
        await this.page.locator(this.Elements.FaxNo).fill(randomValuePhone);
        await this.page.locator(this.Elements.Freight).fill('500');
        await this.page.locator(this.Elements.checkDuplicationCheckBox).check();
        await this.page.locator(this.Elements.checkDuplicationInvoice).fill('15');
        // set status if present
    }

    async submit(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
        // reopen module to be back on inquire/list page
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.vendorMenu);
    }

    async searchVendor(): Promise<void> {
        await this.page.locator(this.Elements.inquireSearchBox).fill(this.vendorData.vendorId!);
    }

    async clickOnEditButton(): Promise<void> {
        await this.page.locator(this.Elements.firstRowEdit).click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.status).click();
        await this.page.getByRole('listitem').filter({ hasText: 'Inactive' }).click();
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.okButton).click();
    }

    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Add');
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Add');
        await this.page.locator(this.Elements.closeButton).click();
    }
        async newButtonFunctionality(): Promise<void> {
        await this.page.locator(this.Elements.newButton).click();
        await expect(this.page.locator(this.Elements.createVendorHeader)).toBeVisible();
        await expect(this.page.locator(this.Elements.code)).toBeEmpty();
        await expect(this.page.locator(this.Elements.vendorName)).toBeEmpty();
        await expect(this.page.locator(this.Elements.Website)).toBeEmpty();
    }

}
