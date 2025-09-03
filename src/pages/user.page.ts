
import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
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
    userId: "//input[@placeholder='Input Text' and ancestor::label[contains(.,'User ID')]]",
    userName: "//input[@placeholder='Input Text' and ancestor::label[contains(.,'User Name')]]",
    employeeId: "//input[@placeholder='Input Text' and ancestor::label[contains(.,'Employee ID')]]",
    phone1: "//input[@placeholder='Input Text' and ancestor::label[contains(.,'Phone 1')]]",
    phone2: "//input[@placeholder='Input Text' and ancestor::label[contains(.,'Phone 2')]]",
    email: "//input[@placeholder='Input Text' and ancestor::label[contains(.,'Email')]]",
    role: "//select[ancestor::label[contains(.,'Role')]]",
    shop: "//select[ancestor::label[contains(.,'Shop')]]",
    craft: "//select[ancestor::label[contains(.,'Craft')]]",
    status: "//select[ancestor::label[contains(.,'Status')]]",
    shift: "//select[ancestor::label[contains(.,'Shift')]]",
    password: "//input[@placeholder='Input Text' and ancestor::label[contains(.,'Password')]]",
    homeAddress: "//textarea[ancestor::label[contains(.,'Home Address')]]",
    dateOfHire: "//input[@type='date' or ancestor::label[contains(.,'Date of Hire')]]",
    authorityCheckbox: "//body/div[@id='app']/div[@class='app-body']/div[@class='app-body-container']/div[@class='app-page']/div[@class='app-page-body']/div[@class='ivu-card ivu-card-dis-hover ivu-card-shadow app-page-body-card']/div[@class='ivu-card-body']/form[@class='el-form']/div[@class='el-row']/div[@class='el-col el-col-13']/div[@class='el-row']/div[@class='el-col el-col-23']/div[@class='el-form-item is-required']/div[@class='el-form-item__content']/div[@class='form-control tree-control']/div[@class='el-tree']/div[@class='el-tree-node is-expanded']/div[@class='el-tree-node__content']/label[@class='el-checkbox']/span[@class='el-checkbox__input is-checked']/span[1]",
    saveButton: "//span[normalize-space(text())='Save']",
    systemSettingsMenu: "//span[normalize-space()='System Setting']",
    userMenu: "//span[normalize-space()='- User']",
    createButton: "//span[normalize-space()='Create']",
    CreapePurchaseOrderLimitation: "(//label[normalize-space(text())='Create Purchase Order Limitation']/following::input)[1]",
    approvePurchaceOrderLimitation: "(//label[normalize-space(text())='Approve Purchase Order Limitation']/following::input)[1]",
    okButton:"//button[normalize-space()='OK']"
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
  this.userData = { userId: getRandomInt };
  await this.page.locator(this.Elements.userId).fill(getRandomInt);
    await this.page.locator(this.Elements.userName).fill(randomName);
    await this.page.locator(this.Elements.employeeId).fill(getRandomInt);
    await this.page.locator(this.Elements.phone1).fill(randomValuePhone);
    await this.page.locator(this.Elements.phone2).fill(randomValuePhone);
    await this.page.locator(this.Elements.email).fill(randomEmail);
    await this.page.locator(this.Elements.role).selectOption('Admin');
    await this.page.locator(this.Elements.shop).selectOption('Chassis - Chassis Maintenance');
    await this.page.locator(this.Elements.craft).selectOption('4 - PCMC Mech');
    await this.page.locator(this.Elements.status).selectOption('Active');
    await this.page.locator(this.Elements.shift).selectOption('2 - Second Shift');
    await this.page.locator(this.Elements.password).fill(randomValuePasscode);
    await this.page.locator(this.Elements.homeAddress).fill(randomtext);
    await this.page.locator(this.Elements.dateOfHire).fill(currentDate);
    await this.page.locator(this.Elements.authorityCheckbox).click();
    await this.page.locator(this.Elements.CreapePurchaseOrderLimitation).fill('100');
    await this.page.locator(this.Elements.approvePurchaceOrderLimitation).fill('100');
  }


  async submit(): Promise<void> {
    await this.page.locator(this.Elements.saveButton).click();
    await expect(this.page.locator('text=User is updated successfully')).toBeVisible();
    await this.page.locator(this.Elements.okButton).click();
    //click on back button in the browser
    await this.page.goBack();
  }

}
