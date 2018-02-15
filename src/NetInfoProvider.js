import { createElement, Component } from 'react';
import { NetInfo } from 'react-native';

class NetInfoProvider extends Component {
  static defaultProps = {
    render: () => null,
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
    const { component, render } = this.props;

    if (component) return createElement(component, this.state);

    return render(this.state);
  }
}

export default NetInfoProvider;
