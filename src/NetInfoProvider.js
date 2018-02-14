import { createElement, Component } from 'react';
import { NetInfo } from 'react-native';

class NetInfoProvider extends Component {
  static defaultProps = {
    render: () => null,
    onChange: () => {}
  };

  state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  handleConnectionChange = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.props.onChange({ isConnected });
      this.setState({ isConnected });
    });
  };

  render() {
    const { component, render } = this.props;

    if (component) return createElement(component, this.state);

    return render(this.state);
  }
}

export default NetInfoProvider;
