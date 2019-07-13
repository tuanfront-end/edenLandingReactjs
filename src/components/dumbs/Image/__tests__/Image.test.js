import React from "react";
import renderer from "react-test-renderer";
import Image from "../Image";

test("Image screenshot", () => {
  const component = renderer.create(
    <Image
      preview="https://placeimg.com/400/300/any"
      src="https://placeimg.com/400/300/any"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
