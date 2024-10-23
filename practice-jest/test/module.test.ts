import { obj } from "../src/module";

jest.mock("../src/module");

it("jest.mock을 이용하여 모듈 전체를 모킹: 모듈을 모킹하고 테스트하는 방법", () => {
  jest.replaceProperty(obj, "prop", "changed");
  console.log(obj);
});
