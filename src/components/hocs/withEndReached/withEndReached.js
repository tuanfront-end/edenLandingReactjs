// @flow
import React, { Component } from "react";

type Props = any;
type State = any;
// ────────────────────────────────────────────────────────────────────────────────
function withEndReached(
  WrapComponent: React$ComponentType<any>
): React$ComponentType<any> {
  return class withEndReached extends Component<Props, State> {
    static defaultProps = {
      onEndReached: (): void => {}
    };

    state = {
      item: {}
    };

    listRef: Function = React.createRef();

    // ─────────────────────────────────────────────────────────────────
    componentDidMount(): void {
      window.addEventListener("scroll", this._handleScroll);
      const { item }: Props = this.props;
      this.setState({
        item
      });
    }

    // ─────────────────────────────────────────────────────────────────
    componentDidUpdate(prevProps: Object, prevState: Object): void {
      const { item }: State = this.state;
      if (prevState.item !== item) {
        window.addEventListener("scroll", this._handleScroll);
      }
    }

    // ─────────────────────────────────────────────────────────────────
    componentWillUnmount(): void {
      window.removeEventListener("scroll", this._handleScroll);
      this.setState({
        item: {}
      });
    }

    // ─────────────────────────────────────────────────────────────────
    _handleScroll = (event: any): any => {
      const list: any = this.listRef.current;
      const { onEndReached }: Props = this.props;
      const { item }: State = this.state;

      if (!item.nextSection) {
        return false;
      }
      if (list.getBoundingClientRect().bottom < window.innerHeight + 200) {
        onEndReached(item.nextSection);
        window.removeEventListener("scroll", this._handleScroll);
      }
      return true;
    };

    // ─────────────────────────────────────────────────────────────────
    render(): React$Node {
      return (
        <div ref={this.listRef}>
          <WrapComponent {...this.props} />
        </div>
      );
    }
  };
}

export default withEndReached;
