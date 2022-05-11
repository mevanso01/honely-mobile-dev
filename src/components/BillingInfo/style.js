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
    fontSize: 28,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 32
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
  },
  cardWrapper: {
    width: 54,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#0000001A'
  },
  paymentText: {
    fontFamily: fonts.regular,
    color: colors.text01,
    fontSize: 18,
    paddingHorizontal: 18,
    marginBottom: 11
  },
  cardLastText: {
    fontSize: 14,
    color: colors.text01,
    fontWeight: '500'
  },
  orPayWithText: {
    fontFamily: fonts.regular,
    color: colors.text01,
    fontSize: 18,
    lineHeight: 18,
    width: '100%',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  addCardText: {
    color: colors.text01,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center'
  },
  saveCardText: {
    fontFamily: fonts.regular,
    color: colors.text01,
    fontSize: 18,
    paddingLeft: 23
  },
  saveCheckBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 25
  }
})
