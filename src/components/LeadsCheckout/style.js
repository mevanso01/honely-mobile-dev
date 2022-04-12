import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 40
  },
  headerContainer: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 21
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  backText: {
    marginLeft: 6,
    color: colors.primary,
    fontSize: 13
  },
  headerTitle: {
    fontSize: 28,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 72
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
    alignItems: 'center',
    minWidth: 80
  },
  qtyText: {
    fontSize: 28,
    color: colors.primary,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 3
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
