import { StyleSheet } from 'react-native';
import { colors } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

export default StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 33,
    marginBottom: 32
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingBottom: 30
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
    padding: 15,
    width: deviceWidth * 0.7,
    marginBottom: 17
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
    // justifyContent: 'flex-end',
    paddingBottom: 40,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.primary
  },
  locationText: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 8,
    color: colors.text01
  },
  cardHeader: {
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    paddingBottom: 13
  },
  infoIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.borderColor
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 8,
    color: colors.text01
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
  shadowContainer: {
    shadowColor: colors.text01,
    backgroundColor: colors.text01,
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
  cardContainer: {
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 16
  }
})
