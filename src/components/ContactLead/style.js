import { StyleSheet, Platform } from 'react-native'
import { colors, fonts } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
  },
  headerContainer: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  backIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  backText: {
    marginLeft: 2,
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  settingIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 33,
    textAlign: 'center',
    color: colors.text01,
    marginBottom: 24
  },
  arrowDownIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.white
  },
  scrollViewContainer: {
    flexGrow: 1,
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
    borderRadius: 8,
  },
  contactCardContainer: {
    backgroundColor: colors.white,
    borderRadius: 8
  },
  contactCardInnerContainer: {
    backgroundColor: colors.info100,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  switchContainer: {
    justifyContent: 'flex-end'
  },
  label: {
    color: colors.text01,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500'
  },
  textArearWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10
  },
  statusLabel: {
    fontSize: 18,
    color: colors.text01,
    marginRight: 16
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18
  },
  ToContactContainer: {
    marginTop: 15,
    paddingHorizontal: 16,
  },
  contactIcon: {
    tintColor: colors.disabled,
    width: 14,
    height: 14,
    resizeMode: 'contain'
  },
  contactInfoText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.disabled,
    marginLeft: 6
  },
  propertyDetailsText: {
    color: colors.info,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 6
  },
  propertyIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.info
  }
})
