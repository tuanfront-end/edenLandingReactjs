// @flow
import axios from "../../../axiosFaker";

const section: string = "section5";

describe("test get new app sections", (): void => {
  test("test get new section", async (): Promise<void> => {
    const { status }: any = await axios.get(section);
    const expected: number = 200;
    expect(status).toBe(expected);
  });
});
