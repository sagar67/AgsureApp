import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import Login from './Components/Login';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'; // Import createDrawerNavigator
import {enableScreens} from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import Account from './Components/Account';
import Product from './Components/Product';
import DrawerContent from './Components/DrawerContent';
import CustomButton from './Components/CustomButton';

enableScreens();

function App(): React.JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedPassword && savedUsername) setLoggedIn(true);
      } catch (error) {
        console.log('Failed to load credentials', error);
      }
    };
    loadCredentials();
  }, []);

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator(); // Create a Drawer navigator

  const CustomHeader = ({navigation}) => {
    const handleLogout = async () => {
      await AsyncStorage.setItem('username', '');
      await AsyncStorage.setItem('password', '');
      navigation.navigate('Login');
      setLoggedIn(false);
    };

    return (
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerHeaderText}>My Drawer</Text>
          </View>
          <View style={styles.drawerBody}>
            <CustomButton onPress={handleLogout}>Logout</CustomButton>
          </View>
        </View>
      </DrawerContentScrollView>
    );
  };

  function Navigation({navigation}) {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <CustomHeader {...props} />}>
          <Drawer.Screen
            options={{
              headerShown: false,
            }}
            name="MainStack"
            component={MainStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  function MainStack({navigation}) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: '#BAB8B6'},
          headerTintColor: 'black',
          contentStyle: {backgroundColor: '#BAB8B6'},
          // headerRight: () => <CustomHeader navigation={navigation} />, // Pass navigation prop
        }}>
        <Stack.Screen name="Login" component={Login} />
        {!loggedIn && <Stack.Screen name="Account" component={Account} />}
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textContainer: {
    paddingRight: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  drawerBody: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default App;
