// @flow
import axios from "../../../axiosFaker";
// import getAppSectionIndex from "../getAppSectionIndex";

const asynAxiosArr: Array<any> = [
  axios.get("section1"),
  axios.get("section2"),
  axios.get("section5")
];

describe("test get app sections", (): void => {
  test("test sigle section", async (): Promise<void> => {
    const { status }: any = await asynAxiosArr[0];

    const expected: number = 200;
    expect(status).toBe(expected);
  });

  test("test array section", async (): Promise<void> => {
    const res: Array<Object> = await Promise.all(asynAxiosArr);
    const arrStatus: Function = res.reduce(
      (arr: Array<any>, item: Object): Array<any> => {
        return [...arr, item.status];
      },
      []
    );
    const expected: Array<number> = [200, 200, 200];
    expect(arrStatus).toEqual(expected);
  });
});
