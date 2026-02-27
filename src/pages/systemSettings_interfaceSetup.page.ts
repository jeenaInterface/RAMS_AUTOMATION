import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class InterfaceSetupPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public repairLocationCode = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        interfaceSetupMenu: "//span[normalize-space(text())='- Interface Setup']",
        createButton: "//span[normalize-space(text())='Create']",
        saveButton: "//div[@class='el-dialog__body']//div//span[contains(text(),'Save')]",
        okButton: "//button[normalize-space()='OK']",
        deleteButton: "//button[@class='el-button el-button--default icon-button-secondary']",
        yesButton: "//span[normalize-space()='Yes']",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        closeButton: "//div[@class='el-dialog el-dialog--full full-dialog']//i[@class='el-dialog__close el-icon el-icon-close']",
        editButton: "//i[@class='ivu-icon ivu-icon-edit']",

        // repair location form fields
        repairLocationCode: "(//label[normalize-space(text())='Repair Location Code']/following::input)[1]",
        RepairLocationDesc: "(//label[normalize-space(text())='RepairLocationDesc.']/following::input)[1]",
        testUrl: "(//label[normalize-space(text())='Test URL']/following::input)[1]",
        testConnectionButton: "//span[normalize-space(text())='Test Connection']",
        relairLocationSearch: "(//input[@placeholder='--Input Text--'])[21]",
        textAreaResponse: "//textarea[@type='textarea']"
    };

    async clickOnInterfaceSetupMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.interfaceSetupMenu);
    }

    async createRepairLocation(): Promise<void> {
        const randomNumber = getRandomInt(100, 999);
        this.repairLocationCode = `RL${randomNumber}`;
        await this.base.waitAndClick(this.Elements.createButton);
        await this.page.getByPlaceholder('--Select One--').click();
        await this.page.getByText('APL - APL Co. PTE LTD').click();
        await this.page.locator(this.Elements.repairLocationCode).fill(this.repairLocationCode);
        await this.page.locator('form').filter({ hasText: 'Billing Party Repair Location Code Repair Location Desc.' }).getByPlaceholder('--Input Text--').nth(1).click();
        await this.page.locator('form').filter({ hasText: 'Billing Party Repair Location Code Repair Location Desc.' }).getByPlaceholder('--Input Text--').nth(1).fill('des');
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }
    async EditRepairLocation(): Promise<void> {
        await this.page.getByRole('row', { name: '--Input Text-- --Input Text-- --Input Text--' }).getByPlaceholder('--Input Text--').nth(1).click();
        await this.page.getByRole('row', { name: '--Input Text-- --Input Text-- --Input Text--' }).getByPlaceholder('--Input Text--').nth(1).fill('RL');
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.editButton).click();;
        await this.page.locator('form').filter({ hasText: 'Billing Party Repair Location Code Repair Location Desc.' }).getByPlaceholder('--Input Text--').nth(1).click();
        await this.page.locator('form').filter({ hasText: 'Billing Party Repair Location Code Repair Location Desc.' }).getByPlaceholder('--Input Text--').nth(1).fill('Test description');

        await this.page.locator(this.Elements.saveButton).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async deleteRepairLocation(): Promise<void> {
        await this.page.locator(this.Elements.relairLocationSearch).fill(this.repairLocationCode);
        await this.page.locator(this.Elements.deleteButton).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async testConnection(url?: string): Promise<void> {
        const testUrl = url || `https://${randomtext}.example.com`;
        await this.page.locator(this.Elements.testUrl).fill(testUrl);
        await this.page.locator(this.Elements.testConnectionButton).click();
        // wait for any toasts/popups; check for OK button as success indicator
        await fixture.page.waitForTimeout(1000);
    }

    /**
     * Verify that the test connection produced output in the response textarea
     * located by //textarea[@type='textarea'] and return the output text.
     */
    async verifyTestConnectionOutput(): Promise<string> {
        const outputLocator = this.page.locator(this.Elements.textAreaResponse);
        // wait up to 5s for output to appear
        await outputLocator.waitFor({ state: 'visible', timeout: 5000 });
        const out = (await outputLocator.inputValue()) || '';
        // assert it's not empty
        await expect(out.length).toBeGreaterThan(0);
        return out.trim();
    }

    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
        await this.page.locator(this.Elements.actionTypeTextbox).fill('Add');
        await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Add');
        await this.page.locator(this.Elements.closeButton).click();
    }

}
