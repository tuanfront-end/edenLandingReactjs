import axios from "../../../../axiosFaker";
import getArrayAsyncFromData from "../getArrayAsyncFromData";

const data = [
  {
    section: "section1",
    lazy: true
  },
  {
    section: "section2",
    lazy: false
  },
  {
    section: "section3",
    lazy: true
  }
];

test("Should return arrAsync", async () => {
  const arrayPromise = getArrayAsyncFromData(data);
  const received = await Promise.all(arrayPromise);
  const expected = await Promise.all([axios.get("section2")]);
  expect(received).toEqual(expected);
});
