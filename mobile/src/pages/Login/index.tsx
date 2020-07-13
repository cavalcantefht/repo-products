import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

import api from '../../services/api';
import { setToken } from '../../services/auth';

const Login = () => {
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [visiblePassword, setVisiblePassword] = useState<Boolean>(true);
  const [load, setLoad] = useState<Boolean>(false);
  const [error, setError] = useState<String>('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
    });

    return unsubscribe;
  }, [navigation]);

  async function handleLogin() {
    setError('');
    setLoad(true);
    if (!email || !password) {
      setLoad(false);
      setError('Favor preencher os campos corretamente!');
    } else {
      try {
        const response = await api.post('auth/login', { email, password });
        const token = response.data.access_token;
        await setToken(token);
        setLoad(false);
        navigation.navigate('Products');
      } catch (error) {
        setLoad(false);
        setError(error.response.data.error);
      }
    }
  }

  return (
    <>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text h1> PRODUTOS </Text>
        </View>
        <View style={styles.form}>
          {
            error !== "" &&
            (
              <View style={styles.alert}>
                <Text style={styles.textAlert}>{error}</Text>
              </View>
            )
          }
          <Modal
            animationType="slide"
            transparent={true}
            visible={Boolean(load)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <ActivityIndicator
                  size="large"
                />
              </View>
            </View>
          </Modal>
          <Input
            placeholder="E-mail"
            onChangeText={text => setEmail(text)}
            autoCorrect={false}
            autoCompleteType="email"
            keyboardType="email-address"
            value={String(email)}
            autoFocus
          />
          <Input
            placeholder="Senha"
            autoCapitalize="none"
            onChangeText={text => setPassword(text)}
            secureTextEntry={Boolean(visiblePassword)}
            value={String(password)}
            rightIcon={
              <Icon
                name={visiblePassword ? "eye" : "eye-off"}
                onPress={() => setVisiblePassword(!visiblePassword)}
                size={20}
              />
            }
          />
          <Button
            title="Entrar"
            onPress={handleLogin}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    padding: 15
  },
  text: {
    fontSize: 30,
    alignSelf: "center",
    marginTop: 10,
    fontFamily: "Roboto_500Medium"
  },
  alert: {
    backgroundColor: "#f8d7da",
    height: 50,
    padding: 10,
    width: "100%",
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.25,
    flexDirection: "row",
    textAlign: "center"
  },
  textAlert: {
    color: "#721c24",
    fontSize: 16,
    fontFamily: "Roboto_400Regular"
  },
  input: {
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    padding: 5,
    paddingLeft: 15,
    marginTop: 15,
    backgroundColor: "#FFF",
    borderRadius: 15
  },
  button: {
    marginTop: 15,
    height: 45,
    backgroundColor: "#000",
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row'
  },
  buttonText: {
    color: "#FFF",
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    opacity: 0.9,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Login;