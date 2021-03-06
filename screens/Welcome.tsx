import React from "react";
import {
  InnerContainer,
  PageTitle,
  StyledFormArea,
  Subtitle,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  Avatar,
  WelcomeImage
} from "./../components/styles";
import { StatusBar } from "expo-status-bar";




const Welcome = ({ navigation, route }) => {
  const { fullname, email } = route.params;
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('../assets/img/expo-bg1.png')} />

        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome</PageTitle>
          <Subtitle welcome={true}>{email || 'kennethrazalan29@gmail.com'}</Subtitle>
          <Subtitle welcome={true}>{fullname || 'Kenneth Razalan'}</Subtitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('../assets/img/expo-bg2.png')} />
            <Line />
            <StyledButton onPress={() => { navigation.navigate('Login') }}>
              <ButtonText>
                Logout
              </ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};


export default Welcome;
