import { StyleSheet } from 'react-native'
import { colors } from '../../utils/styleGuide'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
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
  }
})
