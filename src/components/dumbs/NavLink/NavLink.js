// @flow
import React from "react";
import { Link } from "@reach/router";
import styles from "./styles.module.scss";

const NavLink: Function = (props: Object): any => (
  <Link
    {...props}
    className="pointer"
    getProps={({ isCurrent }: any): Object => {
      return {
        style: {
          display: isCurrent ? "none" : "block"
        }
      };
    }}
  />
);

const NavLinkMobile: Function = (props: Object): any => (
  <Link
    {...props}
    className={styles.tab}
    getProps={({ isCurrent }: any): Object => {
      return {
        style: {
          color: isCurrent ? "#f06292" : "rgba(0, 0, 0, 0.7)"
        }
      };
    }}
  />
);

export { NavLink, NavLinkMobile };
