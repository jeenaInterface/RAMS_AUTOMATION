import { Page } from "@playwright/test";
import { safeClick, safeFill } from "playwright-healer";

export default class PlaywrightWrapper {
    [x: string]: any;

    constructor(private page: Page) { }

    async goto(url: string, p0: { timeout: number; }) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        });
    }

    async waitAndClick(locator: string) {
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible"
        });
        await safeClick(this.page as unknown as import("playwright").Page, locator);
    }

    async fill(locator: string, value: string) {
        await safeFill(this.page as unknown as import("playwright").Page, locator, value);
    }

    async navigateTo(link: string) {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(link)
        ])
    }

    async waitAndClickAndHandleNewPage(locator: string): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.waitAndClick(locator)
        ]);
        return newPage;
    }
}
