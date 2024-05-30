import {useState} from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {usernameActions} from '../store/username';
import CustomButton from './CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {
  const name = useSelector(state => state.user.username);
  const pass = useSelector(state => state.user.password);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function usernameHandler(enteredInput) {
    setUsername(enteredInput);
  }

  function passwordHandler(enteredInput) {
    setPassword(enteredInput);
  }

  const submitHandler = async () => {
    const savedUsername = await AsyncStorage.getItem('username');
    const savedPassword = await AsyncStorage.getItem('password');
    if (savedPassword && savedUsername) navigation.navigate('Product');
    else navigation.navigate('Account');
  };

  return (
    <>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.background}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontSize: 70,
              fontWeight: 'bold',
              textAlign: 'left',
              top: '10%',
              marginLeft: 16.5,
            }}>{`Find your
Gadget`}</Text>
        </View>
        <View style={styles.rootContainer}>
          <CustomButton onPress={submitHandler}>Get started</CustomButton>
        </View>
      </ImageBackground>
    </>
  );
}

export default Login;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: 'center',
    top: '25%',
    // marginBottom: 50,
    // marginHorizontal: 20,
  },
  textLabel: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#5084A0',
  },
  textInput: {
    backgroundColor: 'grey',
    marginBottom: 8,
    borderRadius: 6,
    padding: 10,
    color: 'white',
  },
  background: {
    flex: 1,
    resizeMode: 'contain',
    // justifyContent: 'center',
    backgroundColor: '#5956e9',
  },
});
