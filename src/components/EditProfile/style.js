import { StyleSheet, Platform } from 'react-native'
import { colors, fonts } from '../../utils/styleGuide'

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingHorizontal: 18
  },
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  title: {
    fontSize: 25,
    lineHeight: 33,
    color: colors.headingColor,
    textAlign: 'center',
    fontFamily: fonts.bold
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden'
  },
  label: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.headingColor
  },
  errorTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginLeft: 5
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginLeft: 16
  },
  photoWrapper: {
    marginTop: 26,
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.text05
  },
  photoEditBtn: {
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  },
  editIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.white
  }
})