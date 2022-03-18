import { StyleSheet } from 'react-native';
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 18
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    marginTop: 40
  },
  backArrow: {
    position: 'absolute',
    left: -10
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text01,
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.headingColor
  },
  errorText: {
    color: colors.error,
    fontSize: 12
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginTop: 16
  }
})
