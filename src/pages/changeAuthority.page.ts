import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class ChangeAuthorityPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public assignedUser: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        changeAuthorityMenu: "//span[normalize-space(text())='- Change Authority']",
        addButton: "//span[normalize-space(text())='Add']",
        removeButton: "//span[normalize-space(text())='Remove']",
        createButton: "//span[normalize-space(text())='Create']",
        userInput: "(//input[@placeholder='--Input At Least 3 Letters--'])[1]",
        mappingSelect: "(//input[@placeholder='--Select One--'])[1]",
        saveButton: "//span[normalize-space(text())='Save']",
        okButton: "//button[normalize-space()='OK']",
        searchInput: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        firstRowUser: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/span[1]",
        firstRowRemove: "(//table[@class='el-table__body']/tbody[1]/tr[1]//button[contains(.,'Remove')])[1]",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//div[@class='el-dialog__header']//span[1]",
        closeButton: "(//button[@aria-label='Close']//i)[1]",
        interfaceMapping: "//span[normalize-space()='- Interface Mapping']",
        searchIcdodeInput: "//i[contains(@class,'el-input__icon el-icon-search')]",
    };

    async clickOnChangeAuthorityMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        // Some menus use a leading dash, some don't. try both selectors gracefully.
        try {
            await this.base.waitAndClick(this.Elements.changeAuthorityMenu);
        } catch (err) {
            // fallback to a menu without leading dash
            await this.base.waitAndClick("//span[normalize-space(text())='Change Authority']");
        }
    }

    async clickAddOperation(): Promise<void> {
        await this.page.getByPlaceholder('--Select One--').click();
        await this.page.getByRole('listitem').filter({ hasText: 'Add' }).click();
    }

    async assignInterfaceMappingToUser(): Promise<void> {
        await this.page.getByPlaceholder('--Select One or More--').click();
        await this.page.getByText('Interface Mapping', { exact: true }).click();
        await this.page.locator('#app').getByText('Change Authority').click();
        await this.base.waitAndClick(this.Elements.searchIcdodeInput);
        await this.page.getByPlaceholder('--Input multiple User ID with split ";"--').click();
        await this.page.getByPlaceholder('--Input multiple User ID with split ";"--').fill('AARON.BARRIOS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.getByRole('row', { name: 'AARON.BARRIOS Aaron Barrios MECHANIC Active' }).locator('label span').nth(1).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async searchForAssignedUser(): Promise<void> {
        await this.page.locator(this.Elements.searchInput).fill(this.assignedUser);
        await fixture.page.waitForTimeout(500);
    }

    async verifyMappingVisibleForUser(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        //verify the mapping is visible for the assigned user
        await expect(this.page.locator(this.Elements.interfaceMapping)).toHaveText("- Interface Mapping");
    }

    async clickRemoveOperation(): Promise<void> {
        await this.page.getByPlaceholder('--Select One--').click();
        await this.page.getByRole('listitem').filter({ hasText: 'Remove' }).click();
    }


    async removeInterfaceMappingFromUser(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);

        const mappingEntry = this.page.locator(this.Elements.interfaceMapping);
        await expect(mappingEntry).not.toBeVisible();



    }


    async resetFunctionality(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.changeAuthorityMenu);
        await this.page.getByPlaceholder('--Select One--').click();
        await this.page.getByRole('listitem').filter({ hasText: 'Add' }).click();
        await this.page.getByPlaceholder('--Select One or More--').click();
        await this.page.getByText('Interface Mapping', { exact: true }).click();
        await this.page.locator('#app').getByText('Change Authority').click();
        await this.base.waitAndClick(this.Elements.searchIcdodeInput);
        await this.page.getByPlaceholder('--Input multiple User ID with split ";"--').click();
        await this.page.getByPlaceholder('--Input multiple User ID with split ";"--').fill('AARON.BARRIOS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await this.page.getByRole('row', { name: 'AARON.BARRIOS Aaron Barrios MECHANIC Active' }).locator('label span').nth(1).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.page.getByRole('button', { name: 'Reset' }).click();
        //verify fields are reset
        await expect(this.page.getByPlaceholder('--Select One--')).toHaveText('');
        const element = this.page.locator('input[placeholder="--Select One or More--"]').first();
        await expect(element).toHaveText('');
        // await expect(this.page.getByPlaceholder('--Select One or More--')).toHaveText('');
        await expect(this.page.getByPlaceholder('--Input multiple User ID with split ";"--')).toHaveText('');

    }
}
