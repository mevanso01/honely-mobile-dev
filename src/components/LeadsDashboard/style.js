import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 40,
  },
  innerContainer: {
    paddingHorizontal: 18,
    justifyContent: 'center'
  },
  headerContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 32,
  },
  cartIconWrapper: {
    position: 'absolute',
    right: 18
  },
  title: {
    fontSize: 27,
    lineHeight: 33,
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.bold
  },
  container: {
    flexGrow: 1,
    paddingBottom: 30,
    backgroundColor: colors.backgroundColor,
    paddingTop: 20
  },
  subtitle: {
    fontSize: 22,
    color: colors.text01,
    fontFamily: fonts.bold,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 32
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
  imageWrapper: {
    width: deviceWidth * 0.6,
    marginBottom: 17,
    marginTop: 32
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  },
  bottomContainer: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    paddingBottom: 40,
    width: '100%',
    paddingHorizontal: 18
  },
  leadsContent: {
    flex: 1,
  },
  locationIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.white
  },
  locationText: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 8,
    color: colors.white,
    flex: 1
  },
  infoIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.borderColor
  },
  nameText: {
    fontSize: 25,
    fontWeight: '700',
    color: colors.white
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 8,
    color: colors.white,
    lineHeight: 24,
    paddingBottom: 7,
  },
  sheetContent: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 32,
    width: '100%'
  },
  contactDescription: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 4,
    color: colors.text02
  },
  cardContainer: {
    padding: 24,
    backgroundColor: colors.primary,
    borderRadius: 16,
    marginHorizontal: 18
  },
  paginationText: {
    color: colors.gray,
    fontSize: 21,
    marginTop: 21
  },
  radioLabel: {
    color: colors.primary,
    fontSize: 14,
    marginLeft: 6
  },
  filterText: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.bold
  },
  userTypeText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 15
  },
  notFoundText: {
    paddingHorizontal: 18,
    fontSize: 16,
    color: colors.text01,
    textAlign: 'center'
  },
  copyTextWrapper: {
    position: 'absolute',
    backgroundColor: colors.white500,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    paddingLeft: 15
  },
  copyText: {
    color: colors.text01,
    fontSize: 14,
    fontFamily: fonts.bold
  }
})
