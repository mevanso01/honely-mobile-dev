import { StyleSheet } from 'react-native';
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 33,
    color: colors.text01
  },
  subTitle: {
    marginTop: 4,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    color: colors.text02,
    marginBottom: 32
  },
  imageWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: colors.primaryContrast,
  },
  image: {
    resizeMode: 'contain',
    width: 153,
    height: 153,
  },
  userName: {
    marginTop: 32
  },
  nameDetail: {
    marginTop: 5,
    fontWeight: '500',
    fontSize: 14,
    color: colors.text02, 
    lineHeight: 21,
  }
})
