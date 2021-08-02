import React from "react";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledFormArea,
  Subtitle,
  LeftIcon,
  StyledTextInput,
  StyledInputLabel,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent
} from "./../components/styles";
import { StatusBar } from "expo-status-bar";
import {Formik} from 'formik'
import { ActivityIndicator, View } from "react-native";
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'
import { useState } from "react";
import { KeyboardAvoidingWrapper } from "../components/KeyboardAvoidingWrapper";
import axios from 'axios'
import { LoginType } from "../types/types";

const {brand, darkLight, primary} = Colors

const Login = ({navigation}) => {
    const [hidePassword,setHidePassword] = useState(true)
    const [message,setMessage] = useState('')
    const [messageType,setMessageType] = useState('')

    const handleLogin = async (data: LoginType,setSubmitting) => {
        const url = 'https://nestjs-api-practice.herokuapp.com/user/login'
        
        try {
            const response = await axios.post(url, data)
            const result = response.data;
            setMessage('')
            console.log(result.user)
            navigation.navigate('Welcome', result.user)
            
        } catch (error) {
            const response = error.response.data
            setMessage(response.message)
        }
        setSubmitting(false)
    }
    const handleMessage = (message, type = 'Failed') => {
        setMessage(message)
        setMessageType(type)
    }

  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          source={require("../assets/img/expo-bg1.png")}
        />
        <PageTitle>Login</PageTitle>
        <Subtitle>Account Login</Subtitle>

        <Formik
            initialValues={{ email:'', password:''}}
            onSubmit={(values,{setSubmitting}) => {
                if(values.email === '' || values.password === ''){
                    handleMessage('Please add all fileds.')
                    setSubmitting(false)
                }
                else{
                    handleLogin(values, setSubmitting)
                }
                
            }}
        >
        {({handleChange,handleBlur,handleSubmit,values,isSubmitting}) => 
            <StyledFormArea>
                <MyTextInput
                    label="Email Address"
                    icon="mail"
                    placeholder="test@gmail.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"               
                />
                <MyTextInput
                    label="Password"
                    icon="lock"
                    placeholder="* * * * * * * "
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    isPassword={true}
                    secureTextEntry={hidePassword} 
                    hidePassword={hidePassword}  
                    setHidePassword={setHidePassword}           
                />
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                    <ButtonText>
                        Login
                    </ButtonText>
                </StyledButton>}
                {isSubmitting && <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary}/>
                </StyledButton>}
                <Line/> 
                <StyledButton google={true} onPress={handleSubmit}>
                    <Fontisto name="google" color={primary} size={25}/>
                    <ButtonText google={true}>
                        Sign in with Google
                    </ButtonText>
                </StyledButton>  
                <ExtraView>
                    <ExtraText>Dont have an account already?</ExtraText>
                    <TextLink onPress={() => navigation.navigate("Signup")}>
                        <TextLinkContent> Signup</TextLinkContent>
                    </TextLink>
                </ExtraView>                                                          
            </StyledFormArea>}
        </Formik>
      </InnerContainer>
    </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({label ,icon ,isPassword ,hidePassword ,setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    )

}

export default Login;
