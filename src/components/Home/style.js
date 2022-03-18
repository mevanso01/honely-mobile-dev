import { StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 50
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8
  },
  description: {
    textAlign: 'center',
    color: colors.text02,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21
  },
  logoWrapper: {
    resizeMode: 'contain',
    width: 100
  },
  slideImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  button: {
    width: 180,
    height: 50,
    marginVertical: 16,
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignSelf: 'center'
  },
  buttonText:{
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#FFF',
    alignSelf: 'center',
  }
})
