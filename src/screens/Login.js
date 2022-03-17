import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Login as LoginScreen } from '../components/Login';
import { useTheme } from 'styled-components/native';

const KeyboardView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Login = (props) => {
  const theme = useTheme();
  const loginProps = {
    ...props,
    onNavigationRedirect: (page, params) => {
      if (!page) return
      props.navigation.navigate(page, params);
    },
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <LoginScreen {...loginProps} />
      </KeyboardView>
    </SafeAreaView>
  )
}

export default Login