import { StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'
import { deviceWidth, deviceHeight } from '../../utils/stylesheet'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 33,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.white
  },
  zipIcon: {
    tintColor: colors.primary,
    width: 24,
    height: 24,
    marginLeft: 17,
    resizeMode: 'contain'
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  searchBoxWrapper: {
    backgroundColor: colors.primary,
    paddingBottom: 27,
    paddingHorizontal: 18,
    position: 'relative',
    zIndex: 100,
    padding: 10
  },
  recentSearchContainer: {
    paddingHorizontal: 18,
    marginTop: 42
  },
  recentText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
  },
  recentSearchItem: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 24
  },
  searchAddressText: {
    color: colors.primary,
    fontSize: 25
  },
  searchLeadsText: {
    color: colors.primary,
    fontSize: 14
  },
  searchListContainer: {
    position: 'absolute',
    backgroundColor: colors.white,
    top: 10,
    left: 16,
    width: deviceWidth - 32,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingTop: 60
  },
  dropDownContainer: {
    maxHeight: 230,
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    marginHorizontal: 18,
  },
  dropDownContent: {
    paddingVertical: 10
  },
  searchText: {
    fontSize: 27,
    color: colors.primary,
    paddingLeft: 18,
    paddingRight: 18,
    paddingVertical: 6
  },
  hintContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.pimary_100,
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingTop: 26,
    paddingBottom: 59,
    left: 18,
    top: 70,
    zIndex: 2000
  },
  hintText: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center'
  },
  hintArrow: {
    width: 30,
    height: 38,
    resizeMode: 'contain',
    marginBottom: 14
  },
  backDrop: {
    position: 'absolute',
    left: 0,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#00000080',
    zIndex: 1000
  }
})
