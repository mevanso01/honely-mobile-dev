import { StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 18
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingHorizontal: 18,
    paddingVertical: 3
  },
  shadowContainer: {
    shadowColor: colors.text02,
    backgroundColor: colors.text02,
    width: '100%',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 16,
  },
  contactCardContainer: {
    backgroundColor: colors.white,
    borderRadius: 16
  },
  contactCardInnerContainer: {
    backgroundColor: colors.info100,
    padding: 16,
    borderRadius: 16
  },
  photoWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover'
  },
  switchContainer: {
    justifyContent: 'flex-end'
  },
  phoneNumberText: {
    color: colors.text01,
    fontSize: 16,
    marginBottom: 13
  },
  contactDescription: {
    color: colors.text02,
    fontSize: 14
  },
  label: {
    color: colors.text01,
    fontSize: 14,
    marginBottom: 19
  },
  textArearWrapper: {
    borderWidth: 1,
    borderRadius: 8
  },
})
