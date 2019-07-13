// @flow
import React, { PureComponent } from "react";
// import { navigate } from "@reach/router";

type Props = {
  children: string
};

const parser: Object = new DOMParser();

function handleHtml(html: string): string {
  const newHtml: string = `<!DOCTYPE html><html lang="en"><body>${html}</body></html>`;
  const doc: HTMLElement = parser.parseFromString(newHtml, "application/xml");
  const body: ?HTMLElement = doc.querySelector("body");
  const $links: Array<HTMLElement> = [...doc.querySelectorAll("a")];
  $links.forEach(
    ($link: HTMLElement): void => {
      $link.classList.add("wil-link-navigate");
    }
  );
  const innerHTML: string = body ? body.innerHTML : "";
  return innerHTML;
}

class HtmlViewer extends PureComponent<Props> {
  // componentDidMount() {
  //   this._addToQueue = setTimeout(() => {
  //     const $links = [...document.querySelectorAll(".wil-link-navigate")];
  //     $links.forEach(($link: HTMLElement) => {
  //       $link.addEventListener("click", event => {
  //         event.preventDefault();
  //         navigate("ddd");
  //       });
  //     });
  //   }, 0);
  // }

  // componentWillUnmount() {
  //   clearTimeout(this._addToQueue);
  // }

  render(): React$Node {
    const { children, ...props }: Props = this.props;
    return (
      <div
        {...props}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: handleHtml(children) }}
      />
    );
  }
}

export default HtmlViewer;
