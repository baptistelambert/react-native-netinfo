# react-native-netinfo

Notifies your app when the network connection goes online or offline.

Inspired by [react-network](https://github.com/ReactTraining/react-network) and [react-native-offline](https://github.com/rauliyohmc/react-native-offline), designed with a similar API to the former for when you need a simpler and lighter package than the latter.

## Installation

```
npm install react-native-netinfo
# or with yarn
yarn add react-native-netinfo
```

## Usage

### With a render prop

```js
import { NetInfoProvider } from 'react-native-netinfo';

const App = () => (
  <View>
    <NetInfoProvider
      onChange={({ isConnected, connectionInfo }) => {
        console.log(isConnected);
        console.log(connectionInfo);
      }}
      render={({ isConnected, connectionInfo }) =>
        isConnected ? (
          <React.Fragment>
            <Text>Wonderful, you are connected!</Text>
            <Text>Connection type: {connectionInfo.type}</Text>
            <Text>
              Effective connection type:{connectionInfo.effectiveType}
            </Text>
          </React.Fragment>
        ) : (
          <Text>It looks like you encounter connectivity problems.</Text>
        )
      }
    />
  </View>
);
```

### With children as a function

```js
import { NetInfoProvider } from 'react-native-netinfo';

const App = () => (
  <View>
    <NetInfoProvider
      onChange={({ isConnected, connectionInfo }) => {
        console.log(isConnected);
        console.log(connectionInfo);
      }}
    >
      {({ isConnected, connectionInfo }) =>
        isConnected ? (
          <React.Fragment>
            <Text>Wonderful, you are connected!</Text>
            <Text>Connection type: {connectionInfo.type}</Text>
            <Text>
              Effective connection type:{connectionInfo.effectiveType}
            </Text>
          </React.Fragment>
        ) : (
          <Text>It looks like you encounter connectivity problems.</Text>
        )
      }
    </NetInfoProvider>
  </View>
);
```

### With component injection

```js
import { NetInfoProvider } from 'react-native-netinfo';

const ConnectedComponent = ({ isConnected, connectionInfo }) =>
  isConnected ? (
    <React.Fragment>
      <Text>Wonderful, you are connected!</Text>
      <Text>Connection type: {connectionInfo.type}</Text>
      <Text>Effective connection type:{connectionInfo.effectiveType}</Text>
    </React.Fragment>
  ) : (
    <Text>It looks like you encounter connectivity problems.</Text>
  );

const App = () => (
  <View>
    <NetInfoProvider
      onChange={({ isConnected, connectionInfo }) => {
        console.log(isConnected);
        console.log(connectionInfo);
      }}
      component={ConnectedComponent}
    />
  </View>
);
```

NB: you should not set both component and render props. If you were to do this, the render prop would be ignored.

## Constants

This package also exposes constants for connection info's types and effective types.

You can use them like so:

```js
import { CONSTANTS } from 'react-native-netinfo';

const App = () => (
  <View>
    <Text>{CONSTANTS.CONNECTION_INFO.TYPES.WIFI}</Text>
    <Text>{CONSTANTS.CONNECTION_INFO.EFFECTIVE_TYPES['4G']}</Text>
  </View>
);
```

You can find the full list of types and effective types in the [official React Native documentation about NetInfo](https://facebook.github.io/react-native/docs/netinfo.html#connectiontype-enum).
