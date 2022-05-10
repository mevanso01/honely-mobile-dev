import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 200,
  },
  markerIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  backIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: colors.white,
    marginRight: 2
  },
  backBtnWrapper: {
    position: 'absolute',
    top: 40,
    left: 15
  },
  addressIcon: {
    tintColor: colors.primary,
    width: 28,
    height: 28,
    resizeMode: 'contain'
  },
  addressText: {
    fontSize: 22,
    color: colors.primary,
    marginLeft: 6
  },
  addressContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 14,
    position: 'absolute',
    top: 160
  },
  scrollContainer: {
    marginTop: 245
  },
  scrollContent: {
    flexGrow: 1
  },
  labelText: {
    color: colors.primary,
    fontSize: 13,
    fontFamily: fonts.bold
  },
  thumbIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  sliderWrapper: {
    width: (deviceWidth - 36) * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  thumbWrapper: {
    alignItems: 'center',
    left: 0,
    position: 'relative',
  },
  thumbTextWrapper: {
    position: 'absolute',
    top: 30,
    width: 50,
    alignItems: 'center'
  },
  maxDistanceLabelWrapper: {
    paddingBottom: 12
  },
  maxDistanceIcon: {
    tintColor: colors.primary,
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  leadsQtyContainer: {
    width: '100%',
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 13
  },
  userTypeText: {
    fontSize: 25,
    color: colors.primary,
    marginBottom: 11,
  },
  sectionContainer: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtyText: {
    fontSize: 25,
    color: colors.primary,
    marginRight: 28,
    marginLeft: 28,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.primary,
    lineHeight: 17
  }
})
