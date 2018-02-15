import React, { createElement, Component } from 'react';
import { NetInfo } from 'react-native';

const isEmptyChildren = children => React.Children.count(children) === 0;

class NetInfoProvider extends Component {
  static defaultProps = {
    onChange: () => {}
  };

  state = {
    isConnected: true,
    connectionInfo: {
      type: null,
      effectiveType: null
    }
  };

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  handleConnectionChange = () => {
    Promise.all([
      NetInfo.isConnected.fetch(),
      NetInfo.getConnectionInfo()
    ]).then(([isConnected, connectionInfo]) => {
      this.props.onChange({ isConnected, connectionInfo });
      this.setState({ isConnected, connectionInfo });
    });
  };

  render() {
    const { children, component, render } = this.props;

    if (component) return createElement(component, this.state);

    if (render) return render(this.state);

    if (typeof children === 'function') return children(this.state);

    if (children && !isEmptyChildren(children))
      return React.Children.only(children);

    return null;
  }
}

export default NetInfoProvider;
