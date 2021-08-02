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
import { Formik } from 'formik'
import { View, TouchableOpacity, Touchable, ActivityIndicator } from "react-native";
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons'
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAvoidingWrapper } from "../components/KeyboardAvoidingWrapper";
import axios from "axios";
import { LoginType, SignupType } from "../types/types";

const { brand, darkLight, primary } = Colors

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [dateOfBirth, setDateOfBirth] = useState()
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(false)
        setDate(currentDate)
        setDateOfBirth(currentDate)
    }

    const showDatePicker = () => {
        setShow(true)
    }

    const handleSignup = async (data: SignupType, setSubmitting) => {
        const url = 'https://nestjs-api-practice.herokuapp.com/user/signup'

        try {
            const response = await axios.post(url, data)
            const result = response.data;
            setMessage('')
            console.log(result)
            navigation.navigate('Welcome', result.data)

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
                        initialValues={{
                            fullname: '',
                            email: '',
                            password: '',
                            confirmpassword: '',
                            dob: ''
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            values = { ...values, dob: dateOfBirth }
                            console.log(values);
                            if (values.fullname === '' ||
                                values.email === '' ||
                                values.password === '' ||
                                values.confirmpassword === '' ||
                                values.dob === ''
                            ) {
                                handleMessage('Please add all fileds.')
                                setSubmitting(false)
                            }
                            else if (values.password !== values.confirmpassword) {
                                handleMessage('Password does not match.')
                                setSubmitting(false)
                            }
                            else {
                                handleSignup(values, setSubmitting)
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) =>
                            <StyledFormArea>
                                <MyTextInput
                                    label="Full Name "
                                    icon="person"
                                    placeholder="John Doe"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('fullname')}
                                    onBlur={handleBlur('fullname')}
                                    value={values.fullname}
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
                                    onChangeText={handleChange('dob')}
                                    onBlur={handleBlur('dob')}
                                    isDate={true}
                                    value={dateOfBirth ? dateOfBirth.toDateString() : ''}
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
                                    onChangeText={handleChange('confirmpassword')}
                                    onBlur={handleBlur('confirmpassword')}
                                    value={values.confirmpassword}
                                    isPassword={true}
                                    secureTextEntry={hidePassword}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Signup
                                    </ButtonText>
                                </StyledButton>}
                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>}
                                <Line />
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
    ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
        return (
            <View>
                <LeftIcon>
                    <Octicons name={icon} size={30} color={brand} />
                </LeftIcon>
                <StyledInputLabel>{label}</StyledInputLabel>
                {!isDate && <StyledTextInput {...props} />}
                {isDate && <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>}

                {isPassword && (
                    <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                    </RightIcon>
                )}
            </View>
        )

    }

export default Signup;
