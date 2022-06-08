import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

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
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 33,
    textAlign: 'center',
    color: colors.text01,
    marginBottom: 24
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 30
  },
  addressIcon: {
    tintColor: colors.darkGray,
    width: 21,
    height: 21,
    resizeMode: 'contain',
    marginRight: 6,
    marginTop: 4
  },
  basicInfoText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  estimateText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 4
  },
  estimateValue: {
    color: colors.primary,
    fontSize: 30,
    lineHeight: 45,
    fontWeight: '500',
    marginBottom: 8
  },
  estimateRange: {
    color: colors.darkGray,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
  photoSkeletonWrapper: {
    borderRadius: 26,
    overflow: 'hidden',
    marginHorizontal: 18
  },
  photo: {
    width: deviceWidth - 36,
    height: 230,
    borderRadius: 26,
    overflow: 'hidden',
    marginHorizontal: 18
  },
  innerContainer: {
    paddingHorizontal: 18
  },
  infoName: {
    fontSize: 12,
    color: colors.text01,
    flex: 0.6
  },
  infoValue: {
    fontSize: 12,
    color: colors.text01,
    flex: 0.4
  }
})
