import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext, randomValuePhone } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class AddressPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public data: { oldShip?: string; oldBill?: string; newShip?: string; newBill?: string } = {};

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        addressMenu: "//span[normalize-space()='- Addresses']",
        firstRowEdit: "//i[@class='ivu-icon ivu-icon-edit']",
        saveButton: "//span[normalize-space()='Save']",
        okButton: "//span[normalize-space()='Save']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//div[@class='el-dialog__header']//span[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        closeButton: "(//button[@aria-label='Close']//i)[1]",

        // address form fields (guessing labels used in app)
        shipToAddress: "//div[7]//div[1]//div[1]//div[1]//input[1]",
        billToAddress: "(//input[@type='text'])[19]",
        shipFax:"(//input[@type='text'])[10]",
        billFax:"(//input[@type='text'])[20]"
    };

    async clickOnAddressMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.addressMenu);
    }

    async editShipAndBillAddresses(): Promise<void> {
        await this.page.locator(this.Elements.shipToAddress).click();
        await this.page.locator(this.Elements.shipToAddress).fill('36456456');
        await this.page.locator(this.Elements.shipFax).click();
        await this.page.locator(this.Elements.shipFax).fill('456456456');
        await this.page.locator(this.Elements.billToAddress).click();
        await this.page.locator(this.Elements.billToAddress).fill('4645645');
        await this.page.locator(this.Elements.billFax).click();
        await this.page.locator(this.Elements.billFax).fill('46546');
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async revertChangesAndSave(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        // revert to old values
        await this.page.locator(this.Elements.shipToAddress).click();
        await this.page.locator(this.Elements.shipToAddress).fill('');
        await this.page.locator(this.Elements.shipFax).click();
        await this.page.locator(this.Elements.shipFax).fill('');
        await this.page.locator(this.Elements.billToAddress).click();
        await this.page.locator(this.Elements.billToAddress).fill('');
        await this.page.locator(this.Elements.billFax).click();
        await this.page.locator(this.Elements.billFax).fill('');
        // save
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.closeButton).click();
    }

}
