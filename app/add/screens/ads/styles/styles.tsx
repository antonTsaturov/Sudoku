import { StyleSheet } from 'react-native';
const AdScreensStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: '#f2f2f2',
    },
    commonView: {
        margin: 1,
    },
    verticalContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    horizontalContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    scrollView: {
        flex: 1,
    },
    inputLabel: {
        fontSize: 14,
    },
    labelView: {
        alignItems: 'center',
        paddingBottom: 1,
    },
    logsContainer: {
        height: 125,
        borderRadius: 10,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
    },
    logLabel: {
        fontSize: 14,
    },
    buttonViewEnabled: {
        height: 40,
        width:40,
        // borderRadius: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // textAlign: 'center',
        // marginTop:-25,
        // left:5,
        // borderWidth:1
    },
    buttonViewDisabled: {
      height: 40,
      width:40,
      // borderRadius: '100%',
      // alignItems: 'center',
      // justifyContent: 'center',
      // textAlign: 'center',
      // marginTop:-25,
      // left:5,
    },
    buttonLabelEnabled: {
        fontSize: 14,
        color: '#2e8b57',
    },
    buttonLabelDisabled: {
        fontSize: 14,
        color: '#919191',
    },
    bannerSizeInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        width: '15%',
    },
    bannerView: {
        alignItems: 'center',
        paddingBottom: 1,
        borderWidth:0,
        marginTop:5,
    },
    settingsList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    settingLabel: {
        fontSize: 14,
    },
    labelWhenReady: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2e8b57',
    },
    labelWhenlNotReady: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FF004E',
    },
    fullscreenAdDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '75%',
    },
    bannerInlineDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '45%',
    },
    bannerStickyDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '55%',
    },
    placeholderStyle: {
        color: '#aaa',
        fontSize: 16,
    },
    selectedTextStyle: {
        color: '#000',
        fontSize: 16,
    },
});

export default AdScreensStyle;
