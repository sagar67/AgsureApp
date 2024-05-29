import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import IconSelector, {ICON_TYPE} from './IconSelect';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usernameActions} from '../store/username';

const black = 'black';
const white = 'white';
const gray = '#959595';

const Account = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const name = useSelector(state => state.user.username);
  const pass = useSelector(state => state.user.password);
  console.log('[ass', pass);
  const dispatch = useDispatch();

  function usernameHandler(enteredInput) {
    setUsername(enteredInput);
  }

  function passwordHandler(enteredInput) {
    setPassword(enteredInput);
  }

  const submitHandler = async () => {
    // if (isNaN(username)) {
    //   return Alert.alert(
    //     'Invalid Username',
    //     "Username should be a 'digit' less than 10",
    //   );
    // }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username.trim())) {
      return Alert.alert(
        'Invalid Username',
        'Username must be 3 to 16 characters long and can only contain letters, numbers, underscores, and hyphens.',
      );
    }
    if (password.trim().length < 6) {
      return Alert.alert('Invalid Password', 'Password should be more than 6');
    }
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.log('Failed to save credentials', error);
    }
    // setUsername('');
    // setPassword('');
    navigation.navigate('Product');
    dispatch(usernameActions.username(username, password));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <Text style={styles.headerText}>{`Welcome 
back`}</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.loginText}>Login</Text>
        <View style={{flexDirection: 'row'}}>
          <IconSelector
            type={ICON_TYPE.Ionicons}
            name={'mail-outline'}
            size={20}
            color={gray}
          />
          <Text style={styles.label}>Email</Text>
        </View>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={usernameHandler}
          placeholder="rosina@company.com"
          placeholderTextColor={black}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={{flexDirection: 'row'}}>
          <IconSelector
            type={ICON_TYPE.MaterialIcons}
            name={'lock-outline'}
            size={20}
            color={gray}
          />
          <Text style={styles.label}>Password</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={passwordHandler}
            placeholderTextColor={black}
            placeholder="*********"
            secureTextEntry
          />
          <TouchableOpacity>
            <Text style={styles.showText}>Show</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot passcode?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitHandler} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.createAccountText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerBackground: {
    flex: 2,
    backgroundColor: '#6857ff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 3,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    // marginHorizontal: 20,
    marginTop: -40,
    paddingTop: 40,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    marginLeft: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    color: black,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  showText: {
    color: '#6857ff',
    position: 'absolute',
    right: '12%',
    bottom: '2%',
  },
  forgotText: {
    color: '#6857ff',
    textAlign: 'left',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#6857ff',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  createAccountText: {
    color: '#6857ff',
    textAlign: 'center',
    fontSize:15
  },
});

export default Account;
