import { expectTypeOf, test, vi } from "vitest";
import { BaseContent } from "@/content";
import { USER_DATA_CONTENT_WITH_REPLACEMENT } from "./data";

// Disables a package that checks that code is only executed on the server side.
// Also, this mock can be defined in the Vitest setup file.
vi.mock("server-only", () => {
  return {};
});

test("测试带有 \\n 字段的content", () => {

  const int = new BaseContent(USER_DATA_CONTENT_WITH_REPLACEMENT);

  expectTypeOf(int.currentData).toBeObject();
});