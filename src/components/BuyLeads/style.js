import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'

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
    marginBottom: 14
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
  },
  cartIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 18
  },
  cartIconContainer: {
    position: 'absolute',
    right: 18,
  },
  cartQtyWrapper: {
    position: 'absolute',
    top: -10,
    right: -5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 21,
    height: 21
  },
  cartQty: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: fonts.bold
  },
  addressIcon: {
    tintColor: colors.primary,
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  addressText: {
    fontSize: 24,
    color: colors.primary,
    marginLeft: 6
  },
  filterText: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.bold
  },
  radioLabel: {
    color: colors.primary,
    fontSize: 14,
    marginLeft: 6
  },
  innerContainer: {
    paddingHorizontal: 18
  },
  cardContainer: {
    marginBottom: 16,
    backgroundColor: colors.leadsCardBg,
    borderRadius: 10,
    padding: 16,
    opacity: 0.88
  },
  scrollContainer: {
    marginTop: 17
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30
  },
  userIcon: {
    tintColor: colors.white,
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 8  
  },
  cardBigText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '500',
  },
  priceDescription: {
    color: colors.white,
    fontSize: 12,
  },
  checkIcon: {
    tintColor: colors.white,
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 12
  },
  addedText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.white,
    fontWeight: '600'
  },
  modifyText: {
    fontSize: 10,
    lineHeight: 16,
    color: colors.white,
    fontWeight: '600'
  },
  minusBtn: {
    backgroundColor: colors.white,
    width: 28,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4
  },
  plusBtn: {
    backgroundColor: colors.white,
    width: 28,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  cartQtyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary
  },
  qtyTextContainer: {
    height: 35,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 51,
    borderRightColor: colors.leadsCardBg,
    borderRightWidth: 1,
    borderLeftColor: colors.leadsCardBg,
    borderLeftWidth: 1
  },
  qtyText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24
  },
  cartQtyLabel: {
    fontSize: 11,
    color: colors.white,
    marginRight: 7
  },
})
