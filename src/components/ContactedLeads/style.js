import { StyleSheet, Platform } from 'react-native'
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 10 : 40,
    paddingHorizontal: 18
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    lineHeight: 33,
    marginBottom: 32,
    textAlign: 'center',
    color: colors.black
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30
  },
  filterText: {
    fontWeight: '700',
    fontSize: 13,
    color: colors.primary
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
    position: 'relative',
    zIndex: 100,
    alignItems: 'flex-end',
  },
  filterWrapper: {
    position: 'absolute',
    right: 0,
    top: 25,
    width: 142,
    shadowColor: colors.text02,
    backgroundColor: colors.text02,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 8,
    zIndex: 100
  },
  arrowDownIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.primary,
    marginLeft: 10
  },
})
