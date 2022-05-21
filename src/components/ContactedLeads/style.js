import { StyleSheet, Platform } from 'react-native'
import { colors, fonts } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 40,
  },
  headerContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 32,
  },
  cartIconWrapper: {
    position: 'absolute',
    right: 0
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 33,
    textAlign: 'center',
    color: colors.black
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 18,
  },
  filterText: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.bold
  },
  radioLabel: {
    color: colors.primary,
    fontSize: 14,
    marginLeft: 6
  },
  headerNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black
  },
  statusText: {
    fontSize: 14,
    color: '#737373cc'
  },
  contactText: {
    flex: 1,
    fontSize: 14,
    color: colors.black
  },
  arrowDownIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.black,
    marginLeft: 6
  },
  statusListContainer: {
    position: 'relative',
    flex: 1
  },
  dropDownListContainer: {
    position: 'absolute',
    width: '100%',
    top: 35,
    left: 0,
    backgroundColor: colors.white,
    zIndex: 10,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  filterContainer: {
    alignItems: 'flex-end',
  },
  avatarWrapper: {
    width: 129,
    height: 163,
    resizeMode: 'contain'
  },
  subtitle: {
    fontSize: 22,
    color: colors.text01,
    lineHeight: 22,
    textAlign: 'center',
    fontFamily: fonts.bold
  },
  description: {
    fontSize: 14,
    color: colors.text02,
    lineHeight: 21,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center'
  },
  statusWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative'
  },
  statusDot: {
    position: 'absolute',
    zIndex: 100
  }
})
