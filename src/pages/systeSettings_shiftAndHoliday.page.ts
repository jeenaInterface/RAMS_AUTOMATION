import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class ShiftAndHolidayPage {
  private base: PlaywrightWrapper;
  private page: Page;
  public shiftCode: string = '';
  public holidayName: string = '';

  constructor(page: Page) {
    this.base = new PlaywrightWrapper(page);
    this.page = page;
  }

  private Elements = {
    systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
    shiftAndHolidayMenu: "//span[normalize-space(text())='- Shift and Holiday']",
    FridayCheckbox: "(//span[@class='el-checkbox__inner'])[5]",
    holidayTab: "//span[normalize-space()='Define']",
    saveButton: "//span[normalize-space()='Save']",
    date: "//div[@class='ivu-card-body']//div[3]//ul[5]//li[2]//span[1]//span[1]",
    holidayButton: "//span[normalize-space()='Set As Holiday']",
    successMessage: "//p[normalize-space()='Save Successfully']",
    okButton: "//button[normalize-space()='OK']",
    actionLog: "//button[contains(.,'Action Log')]",
    headerTitle: "//div[@class='el-dialog__header']//span[1]",
    actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
    searchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
    closeButton: "(//button[@aria-label='Close']//i)[1]",



  };

  async clickOnShiftAndHolidayMenu(): Promise<void> {
    await this.base.waitAndClick(this.Elements.systemSettingsMenu);
    await this.base.waitAndClick(this.Elements.shiftAndHolidayMenu);
  }

  async checkFridayCheckBox(): Promise<void> {
    await this.base.waitAndClick(this.Elements.FridayCheckbox);
    await this.base.waitAndClick(this.Elements.saveButton);
    await this.base.waitAndClick(this.Elements.okButton);
  }

  async navigateToHolidayTab(): Promise<void> {
    // await this.base.waitAndClickAndHandleNewPage(this.Elements.holidayTab);
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('button', { name: 'Define' }).click();
    const page1 = await page1Promise;
    await page1.locator('div:nth-child(3) > ul:nth-child(6) > li:nth-child(2) > span > span').click();
    await page1.getByRole('button', { name: 'Set As Holiday' }).click();
    await page1.getByRole('button', { name: 'OK' }).click();
    await expect(page1.locator(this.Elements.successMessage)).toBeVisible();
  }


  async selectDateOnCalendar(): Promise<void> {

  }
  async validateMessage(): Promise<void> {

  }
  async verifyActionlog(): Promise<void> {

    await this.page.locator(this.Elements.actionLog).click();
    await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
    await this.page.locator(this.Elements.closeButton).click();
  }
}
