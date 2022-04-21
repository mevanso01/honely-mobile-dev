import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors.primary,
    marginBottom: 18,
    paddingHorizontal: 18,
    paddingBottom: 29
  },
  title: {
    fontSize: 27,
    lineHeight: 33,
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.bold
  },
  subTitle: {
    marginTop: 4,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    color: colors.text02,
    textAlign: 'center',
    color: colors.white,
    marginTop: 12
  },
  settingIconContainer: {
    position: 'absolute',
    right: 18,
  },
  settingIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.white
  },
  container: {
    flex: 1,
    paddingHorizontal: 18
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: colors.primary_100,
    paddingHorizontal: 10
  },
  photoWrapper: {
    width: 153,
    height: 153,
    borderRadius: 80,
    backgroundColor: colors.text05,
    overflow: 'hidden',
  },
  image: {
    width: 153,
    height: 153,
  },
  nameText: {
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 34,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 9
  },
  nameDetail: {
    marginTop: 5,
    fontWeight: '700',
    fontSize: 14,
    color: colors.white, 
    textAlign: 'center',
    marginTop: 22
  }
})
