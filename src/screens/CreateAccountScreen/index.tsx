import React from 'react';
import {
  ImageBackground,
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

import { PropsStack } from '../../routes/types';
//TODO keyboardAvoidingView IOS

const CreateAccountScreen: React.FC<PropsStack> = ({ route, navigation }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/login.jpg')}>
      <RectButton style={styles.buttonFacebook}>
        <Icon style={styles.icon} name="facebook" size={20} color="#fff" />
        <View style={styles.containerTextFacebook}>
          <Text style={styles.textButtonFacebook}>Cadastrar com facebook</Text>
        </View>
      </RectButton>
      <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="user" size={20} color="#fff" />
        <TextInput
          style={styles.textInput}
          placeholder="Nome"
          placeholderTextColor="#ccc"
          onChangeText={() => {}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="mail" size={20} color="#fff" />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor="#ccc"
          onChangeText={() => {}}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.icon} name="lock" size={20} color="#fff" />
        <TextInput
          style={styles.textInput}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          onChangeText={() => {}}
        />
      </View>
      <RectButton
        style={styles.button}
        onPress={() => navigation.navigate('Main')}>
        <Text style={styles.textButton}>CADASTRAR</Text>
      </RectButton>
      <Text onPress={() => navigation.goBack()} style={styles.textCriarConta}>
        Voltar
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonFacebook: {
    height: 60,
    width: '90%',
    marginBottom: 30,
    flexDirection: 'row',
    backgroundColor: '#4267B2',
    borderRadius: 30,
    alignItems: 'center',
  },
  containerTextFacebook: {
    flex: 1,
  },
  textButtonFacebook: {
    color: '#fff',
    fontSize: 16,
    marginLeft: '10%',
  },
  inputContainer: {
    height: 60,
    width: '90%',
    marginTop: 20,
    backgroundColor: '#191d21',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
  },
  icon: {
    paddingHorizontal: 25,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#fff',
    fontFamily: 'Comfortaa-Regular',
  },
  button: {
    height: 60,
    width: '90%',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d7d1cb',
    borderRadius: 30,
    elevation: 5,
  },
  textButton: {
    fontFamily: 'Anton-Regular',
    fontSize: 24,
  },
  textCriarConta: {
    padding: 10,
    marginVertical: 20,
    fontFamily: 'Comfortaa-Regular',
    color: '#d7d1cb',
  },
});

export default CreateAccountScreen;
