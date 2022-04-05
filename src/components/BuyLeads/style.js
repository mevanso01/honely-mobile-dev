import { StyleSheet, Platform } from 'react-native'
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: colors.purple,
    paddingTop: Platform.OS === 'ios' ? 30 : 40,
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
    tintColor: colors.purple,
    width: 24,
    height: 24,
    marginLeft: 17,
    resizeMode: 'contain'
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  searchBoxWrapper: {
    backgroundColor: colors.purple,
    paddingBottom: 27,
    paddingHorizontal: 18,
    position: 'relative',
    zIndex: 1000
  },
  recentSearchContainer: {
    paddingHorizontal: 18,
    marginTop: 42
  },
  recentText: {
    color: colors.purple,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
  },
  recentSearchItem: {
    borderColor: colors.purple,
    borderWidth: 1,
    borderRadius: 10,
    padding: 24
  },
  searchAddressText: {
    color: colors.purple,
    fontSize: 25
  },
  searchLeadsText: {
    color: colors.purple,
    fontSize: 14,
    marginTop: 10
  },
  searchListContainer: {
    position: 'absolute',
    backgroundColor: colors.white,
    top: 0,
    left: 18,
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: colors.purple,
    paddingTop: 60
  },
  dropDownContainer: {
    maxHeight: 250,
  },
  dropDownContent: {
    paddingVertical: 10
  },
  searchText: {
    fontSize: 27,
    color: colors.purple,
    paddingLeft: 18,
    paddingRight: 18,
    paddingVertical: 6
  }
})
