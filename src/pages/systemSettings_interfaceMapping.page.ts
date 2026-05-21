import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate, UOM_PIECES, UOM_BOX50 } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class interfaceMappingPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public ARProductCode: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        interfaceMapping: "//span[normalize-space()='- Interface Mapping']",
        AR: "(//div[@class='el-tabs__item is-active'])[1]",
        create: "(//i[@class='ivu-icon ivu-icon-plus']/following-sibling::span)[1]",
        createAP: "(//button[@class='ivu-btn ivu-btn-text']//span)[2]",
        ARGLCode: "(//label[normalize-space(text())='AR GL Code']/following::input)[1]",
        ARProductCode: "(//label[normalize-space(text())='AR Product Code']/following::input)[1]",
        ARProfitCenter: "(//label[normalize-space(text())='AR Profit Center']/following::input)[1]",
        save: "(//button[@class='el-button el-button--primary']//span)[1]",
        codeList: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//td[@class='el-table_1_column_59_column_60 is-left internal-filter']//div[@class='cell']",
        firstRowEdit: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/div[1]/button[1]/span[1]/i[1]",
        actionTypeTextbox: "(//input[@placeholder='--Input Text--'])[14]",
        firstrowdelete: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/div[1]/button[2]/span[1]/i[1]",
        okButton: "//button[normalize-space()='OK']",
        yesButton: "//span[normalize-space()='Yes']",
        searchCode: "(//input[@class='el-input__inner'])[3]",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        closeButton: "(//button[@aria-label='Close']//i)[3]",
        searchResultActionLog: "(//span[contains(text(),'Modify')])[2]",
        APTab: "//div[normalize-space(text())='AP']",
        GLAccount: "(//label[normalize-space(text())='Freight Cost Center']/following::input)[2]",
        searchResultAP: "//div[@class='cell']//span[contains(text(),'5393200 - Fac Maint. - O/S Svc')]",
        saveAP: "//div[@class='el-dialog__body']//div//span[contains(text(),'Save')]",
        OKButtonOnAP: "//span[normalize-space()='OK']",
        editButtonAP: "(//button[@type='button'])[15]",
        deleteButtonAP: "(//button[@type='button'])[16]",
        actionTypeTextboxAP:"(//input[@placeholder='--Input Text--'])[11]"




    };

    async clickOninterfaceMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.interfaceMapping);
    }

    async CreateAR(): Promise<void> {

        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.create);
        await this.page.getByRole('textbox', { name: '--Select One--' }).click();
        await this.page.getByRole('listitem').filter({ hasText: 'AC - Access Gate Controller' }).click();
        const randomNumber = getRandomInt(1000, 9999);
        this.ARProductCode = `AR${randomNumber}`;
        await this.page.locator(this.Elements.ARGLCode).click();
        await this.page.locator(this.Elements.ARGLCode).fill(randomNumber.toString());
        await this.page.locator(this.Elements.ARProductCode).click();
        await this.page.locator(this.Elements.ARProductCode).fill(this.ARProductCode);
        await this.page.locator(this.Elements.ARProfitCenter).click();
        await this.page.locator(this.Elements.ARProfitCenter).fill(randomNumber.toString());
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.okButton).click();
    }
    async searchCode(): Promise<void> {
        await this.page.locator(this.Elements.searchCode).click();
        await this.page.locator(this.Elements.searchCode).fill(this.ARProductCode);
    }

    async verifySearchResult(): Promise<void> {
        // read the text of the search result element and compare to the generated ARProductCode
        const actual = (await this.page.locator(this.Elements.searchResult).textContent()) || '';
        const value = actual.trim();
        // use Playwright's expect for a clear test assertion
        await expect(value).toBe(this.ARProductCode);
    }

    // return the raw text of the search result element (trimmed)
    async getSearchResultText(): Promise<string> {
        const actual = (await this.page.locator(this.Elements.searchResult).textContent()) || '';
        return actual.trim();
    }

    async verifyEditFunctionality(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.firstRowEdit).click();
        await this.page.locator(this.Elements.ARProfitCenter).click();
        const randomNumber = getRandomInt(1000, 9999);
        await this.page.locator(this.Elements.ARProfitCenter).fill(randomNumber.toString());
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.save).click();
        await this.page.locator(this.Elements.okButton).click();

    }
    async verifyDeleteFunctionality(): Promise<void> {
        await this.page.locator(this.Elements.searchCode).click();
        await this.page.locator(this.Elements.searchCode).fill(this.ARProductCode);
        await this.page.locator(this.Elements.firstrowdelete).click();
        await this.page.locator(this.Elements.yesButton).click();
        await this.page.locator(this.Elements.okButton).click();
        await fixture.page.waitForTimeout(500);

    }

    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Modify');
        await expect(this.page.locator(this.Elements.searchResultActionLog)).toHaveText('Modify');
        await this.page.locator(this.Elements.closeButton).click();
    }

    async CreateAP(): Promise<void> {
        await this.base.waitAndClick(this.Elements.APTab);
        await fixture.page.waitForTimeout(500);
        await this.page.getByPlaceholder('--Select One--').first().click();
        await this.page.getByText('OPX_AGV_BATTERY - Maintenance Parts - AGV Battery').click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByPlaceholder('--Select One--').first().click();
        await this.page.getByRole('listitem').filter({ hasText: 'OPX_AGV - Maintenance Parts - AGV' }).click();
        await this.page.getByPlaceholder('--Select One--').nth(1).click();
        await this.page.getByRole('listitem').filter({ hasText: '1216 - M&R Facility' }).locator('span').click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.base.waitAndClick(this.Elements.createAP);
        await this.page.getByPlaceholder('--Select One--').nth(2).click();
        await this.page.getByText('5393200 - Fac Maint. - O/S Svc').click();
        await this.page.getByPlaceholder('--Select One--').nth(3).click();
        await this.page.getByRole('listitem').filter({ hasText: '1215 - M&R' }).locator('span').click();
        await this.page.getByPlaceholder('--Select One--').nth(4).click();
        await this.page.getByRole('listitem').filter({ hasText: 'OPX_AGV - Maintenance Parts - AGV' }).locator('span').click();
        await this.page.getByPlaceholder('--Select One--').nth(3).click();

        await this.page.locator(this.Elements.saveAP).click();
        await this.page.locator(this.Elements.OKButtonOnAP).click();

    }
    async searchCodeAP(): Promise<void> {
        await this.page.locator(this.Elements.GLAccount).click();
        await this.page.locator(this.Elements.GLAccount).fill("5393200");
    }
    async verifySearchResultAP(): Promise<void> {
        // read the text of the search result element and compare to the generated ARProductCode
        const actual = (await this.page.locator(this.Elements.searchResultAP).textContent()) || '';
        const value = actual.trim();
        // use Playwright's expect for a clear test assertion
        await expect(value).toBe("5393200 - Fac Maint. - O/S Svc");
    }
    async verifyEditFunctionalityAP(): Promise<void> {
        await this.page.locator(this.Elements.editButtonAP).click();
        await this.page.getByPlaceholder('--Select One--').nth(3).click();
        await this.page.getByRole('listitem').filter({ hasText: '1216 - M&R Facility' }).locator('span').click();
        await this.page.locator(this.Elements.saveAP).click();
        await this.page.locator(this.Elements.OKButtonOnAP).click();

    }
    async verifyDeleteFunctionalityAP(): Promise<void> {
        await this.page.locator(this.Elements.deleteButtonAP).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();

    }
    async verifyActionLogAP(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.actionTypeTextboxAP).fill('Modify');
        await expect(this.page.locator(this.Elements.searchResultActionLog)).toHaveText('Modify');
        await this.page.locator(this.Elements.closeButton).click();
    }
}