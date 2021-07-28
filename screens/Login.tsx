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
import { View } from "react-native";
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'
import { useState } from "react";
import { KeyboardAvoidingWrapper } from "../components/KeyboardAvoidingWrapper";

const {brand, darkLight, primary} = Colors

const Login = ({navigation}) => {
    const [hidePassword,setHidePassword] = useState(true)

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
            onSubmit={(values) => {
                console.log(values)
                navigation.navigate("Welcome")
            }}
        >
        {({handleChange,handleBlur,handleSubmit,values}) => 
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
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                    <ButtonText>
                        Login
                    </ButtonText>
                </StyledButton>
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
