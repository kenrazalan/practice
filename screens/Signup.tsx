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
import { View, TouchableOpacity, Touchable } from "react-native";
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingWrapper } from "../components/KeyboardAvoidingWrapper";

const {brand, darkLight, primary} = Colors

const Signup = ({navigation}) => {
    const [hidePassword,setHidePassword] = useState(true)
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [dob, setDob] = useState()

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(false)
        setDate(currentDate)
        setDob(currentDate)
    }

    const showDatePicker = () => {
        setShow(true)
    }

  return (
      <KeyboardAvoidingWrapper>
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>

        <PageTitle>Signup</PageTitle>
        <Subtitle>Account Signup</Subtitle>

        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

        <Formik
            initialValues={{fullname:'', email:'', password:'',confirmPassword:'', dateOfBirth:''}}
            onSubmit={(values) => {
                console.log(values)
                navigation.navigate("Welcome")
            }}
        >
        {({handleChange,handleBlur,handleSubmit,values}) => 
            <StyledFormArea>
                <MyTextInput
                    label="Full Name "
                    icon="person"
                    placeholder="John Doe"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('fullname')}
                    onBlur={handleBlur('fullname')}
                    value={values.email}             
                />
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
                    label="Date of Birth"
                    icon="calendar"
                    placeholder="YYYY - MM - DD"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('dateOfBirth')}
                    onBlur={handleBlur('dateOfBirth')}
                    isDate={true}
                    value={dob ? dob.toDateString() : ''}    
                    editable={false}   
                    showDatePicker={showDatePicker}      
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
                <MyTextInput
                    label="Confirm Password"
                    icon="lock"
                    placeholder="* * * * * * * "
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    isPassword={true}
                    secureTextEntry={hidePassword} 
                    hidePassword={hidePassword}  
                    setHidePassword={setHidePassword}           
                />
                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                    <ButtonText>
                        Sign up
                    </ButtonText>
                </StyledButton>
                <Line/>
                <ExtraView>
                    <ExtraText>Already have an account?</ExtraText>
                    <TextLink onPress={() => navigation.navigate("Login")}>
                        <TextLinkContent> Login</TextLinkContent>
                    </TextLink>
                </ExtraView>                                                          
            </StyledFormArea>}
        </Formik>
      </InnerContainer>
    </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = 
({label ,icon ,isPassword ,hidePassword ,setHidePassword,isDate, showDatePicker, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props}/>}
            {isDate && <TouchableOpacity onPress={showDatePicker}>
                            <StyledTextInput {...props}/>
                       </TouchableOpacity>}
            
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>
    )

}

export default Signup;
