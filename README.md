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
      onChange={({ isConnected }) => {
        console.log(isConnected);
      }}
      render={({ isConnected }) =>
        isConnected ? (
          <Text>Wonderful, you are connected!</Text>
        ) : (
          <Text>It looks like you encounter connectivity problems.</Text>
        )
      }
    />
  </View>
);
```

### With component injection

```js
import { NetInfoProvider } from 'react-native-netinfo';

const ConnectedComponent = ({ isConnected }) =>
  isConnected ? (
    <Text>Wonderful, you are connected!</Text>
  ) : (
    <Text>It looks like you encounter connectivity problems.</Text>
  );

const App = () => (
  <View>
    <NetInfoProvider
      onChange={({ isConnected }) => {
        console.log(isConnected);
      }}
      component={ConnectedComponent}
    />
  </View>
);
```

NB: you should not set both component and render props. If you were to do this, the render prop would be ignored.
