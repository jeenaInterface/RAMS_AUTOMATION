
import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
export { getRandomInt };
import { currentDate, getRandomInt, randomName, randomEmail, randomValuePhone, randomValuePasscode, randomtext } from "../helper/util/test-data/randomdata";

setDefaultTimeout(100 * 1000);

export default class UserPage {
  private base: PlaywrightWrapper;
  private page: Page;

  constructor(page: Page) {
    this.base = new PlaywrightWrapper(page);
    this.page = page;
  }

  private Elements = {
    userId: "(//label[normalize-space(text())='User ID']/following::input)[1]",
    userName: "(//label[normalize-space(text())='User Name']/following::input)[1]",
    employeeId: "(//label[normalize-space(text())='Employee ID']/following::input)[1]",
    phone1: "(//label[normalize-space(text())='Phone 1']/following::input)[1]",
    phone2: "(//label[normalize-space(text())='Phone 2']/following::input)[1]",
    email: "(//label[normalize-space(text())='Email']/following::input)[1]",
    role: "(//input[@placeholder='--Select One--'])[1]",
    shop: "(//input[@placeholder='--Select One--'])[3]",
    craft: "(//input[@placeholder='--Select One--'])[5]",
    status: "//select[ancestor::label[contains(.,'Status')]]",
    shift: "//select[ancestor::label[contains(.,'Shift')]]",
    password: "(//label[normalize-space(text())='Password']/following::input)[1]",
    homeAddress: "(//label[normalize-space(text())='Home Address']/following::textarea)[1]",
    dateOfHire: "(//label[normalize-space(text())='Date of Hire']/following::input)[1]",
    authorityCheckbox: "(//span[@class='el-checkbox__input']//span)[1]",
    saveButton: "//span[normalize-space(text())='Save']",
    systemSettingsMenu: "//span[normalize-space()='System Setting']",
    userMenu: "//span[normalize-space(text())='- User']",
    createButton: "//span[normalize-space()='Create']",
    CreapePurchaseOrderLimitation: "(//label[normalize-space(text())='Create Purchase Order Limitation']/following::input)[1]",
    approvePurchaceOrderLimitation: "(//label[normalize-space(text())='Approve Purchase Order Limitation']/following::input)[1]",
    okButton: "//button[normalize-space()='OK']",
    successMessage: "//p[normalize-space(text())='User is updated successfully']",
    userIDSearchBox: "(//input[@class='el-input__inner'])[1]",
    firstRow: "//i[@class='ivu-icon ivu-icon-edit']",
    actionLog: "//button[contains(.,'Action Log')]",
    headerTitle: "//div[@class='el-dialog__header']//span[1]",
    closeButton: "(//button[@aria-label='Close']//i)[1]",
    actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
    searchResult:"//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/span[1]"
  };

  //   async navigateToCreateUserPage(): Promise<void> {
  //     await this.base.goto(process.env.BASEURL, { timeout: 60000 });
  //     await this.page.evaluate(() => {
  //       window.moveTo(0, 0);
  //       window.resizeTo(screen.width, screen.height);
  //     });
  //   }
  async clickOnUserMenu(): Promise<void> {
    await this.base.waitAndClick(this.Elements.systemSettingsMenu);
    await this.base.waitAndClick(this.Elements.userMenu);
  }

  async clickOnCreateButton(): Promise<void> {
    await this.base.waitAndClick(this.Elements.createButton);
  }

  public userData: { userId?: string } = {};

  async fillUserForm(): Promise<void> {
    // Use random generation functions directly for each field
    this.userData = { userId: getRandomInt(2222, 9999).toString() };
    await this.page.locator(this.Elements.userId).fill(this.userData.userId!);
    await this.page.locator(this.Elements.userName).fill(randomName);
    await this.page.locator(this.Elements.employeeId).fill(getRandomInt(2222, 9999).toString());
    await this.page.locator(this.Elements.phone1).fill(randomValuePhone);
    await this.page.locator(this.Elements.phone2).fill(randomValuePhone);
    await this.page.locator(this.Elements.email).fill(randomEmail);
    await this.page.getByPlaceholder('--Select One--').first().click();
    await this.page.getByRole('listitem').filter({ hasText: 'MNR Admin' }).click();
    await this.page.getByPlaceholder('--Select One--').nth(2).click();
    await this.page.getByRole('listitem').filter({ hasText: 'Parts - Parts Area' }).click();
    await this.page.getByPlaceholder('--Select One--').nth(4).click();
    await this.page.getByRole('listitem').filter({ hasText: '1 - LBCT Lead' }).click();
    await this.page.getByPlaceholder('--Select One--').nth(3).click();
    await this.page.getByRole('listitem').filter({ hasText: '2 - Second Shift' }).click();
    await this.page.locator(this.Elements.password).fill(getRandomInt(2222, 9999).toString());
    await this.page.locator(this.Elements.homeAddress).fill(randomtext);
    await this.page.locator(this.Elements.dateOfHire).fill(currentDate);
    await this.page.locator(this.Elements.authorityCheckbox).click();
    await this.page.locator(this.Elements.CreapePurchaseOrderLimitation).fill(getRandomInt(100, 1000).toString());
    await this.page.locator(this.Elements.approvePurchaceOrderLimitation).fill(getRandomInt(100, 1000).toString());
  }


  async submit(): Promise<void> {
    await this.page.locator(this.Elements.saveButton).click();
    //await expect(this.page.locator(this.Elements.successMessage)).toBeVisible();
    await this.page.locator(this.Elements.okButton).click();
    await this.base.waitAndClick(this.Elements.systemSettingsMenu);
    await this.base.waitAndClick(this.Elements.userMenu);
  }
  async searchUserId(): Promise<void> {
    await this.page.locator(this.Elements.userIDSearchBox).fill(this.userData.userId!);

  }

  async ClickOneditButton(): Promise<void> {
    await this.page.locator(this.Elements.firstRow).click();
    await this.page.getByPlaceholder('--Select One--').nth(3).click();
    await this.page.getByRole('listitem').filter({ hasText: '1 - First Shift' }).click();
    await this.page.locator(this.Elements.saveButton).click();
    await this.page.locator(this.Elements.okButton).click();
  }

  async verifyActionlog(): Promise<void> {

    await this.page.locator(this.Elements.actionLog).click();
    await expect(this.page.locator(this.Elements.headerTitle)).toBeVisible();
    await this.page.locator(this.Elements.actionTypeTextbox).fill('Add');
    await expect(this.page.locator(this.Elements.searchResult)).toHaveText('Add');
    await this.page.locator(this.Elements.closeButton).click();
  }
}
