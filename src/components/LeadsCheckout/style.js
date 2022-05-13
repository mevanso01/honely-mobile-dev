import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 40
  },
  headerContainer: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 21
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
    fontSize: 27,
    lineHeight: 33,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 32,
    fontFamily: fonts.bold
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18
  },
  textStyle: {
    fontSize: 28,
    color: colors.primary
  },
  qtyTextContainer: {
    minWidth: 80,
    alignItems: 'center'
  },
  qtyTextWrapper: {
    minWidth: 40,
    alignItems: 'center',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1
  },
  qtyText: {
    fontSize: 28,
    color: colors.primary,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 3,
  },
  qtyBtnText: {
    fontSize: 39,
    color: colors.primary
  },
  upperText: {
    color: colors.primary,
    fontSize: 14,
    marginLeft: 3
  }
})
