// import { Page } from "@playwright/test";
// import { Logger } from "winston";

// export const fixture = {
//     // @ts-ignore
//     page: undefined as Page,
//     logger: undefined as Logger
// }

// hooks/pageFixture.ts
import { Page } from "@playwright/test";
import { Logger } from "winston";

type ScenarioContext = {
  stockNo?: string;
  purchaseOrderNo?: string;
  receivingDocNo?: string;
};

export const fixture: {
  page: Page | undefined;
  logger: Logger | undefined;
  context: ScenarioContext;
  // Optional: expose page objects for convenience in steps
  materialPage?: import("../pages/material.page").default;
  purchasePage?: import("../pages/purchaseOrder.page").default;
} = {
  page: undefined,
  logger: undefined,
  context: {},
};
