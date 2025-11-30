import { StyleSheet } from 'react-native';
import { colors } from '../../../common/theme/colors';

const AdScreensStyle = StyleSheet.create({
    backgroundColor: {
        backgroundColor: colors.backgroundSecondary,
    },
    commonView: {
        margin: 1,
        backgroundColor: colors.backgroundSecondary,
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
        color: colors.text,
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
        borderColor: colors.border,
        backgroundColor: colors.background,
    },
    logLabel: {
        fontSize: 14,
        color: colors.text,
    },
    buttonViewEnabled: {
        height: 44,
        width: 44,
        borderRadius: 12,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    buttonViewDisabled: {
        height: 44,
        width: 44,
        borderRadius: 12,
        backgroundColor: colors.buttonDisabled,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    buttonLabelEnabled: {
        fontSize: 14,
        color: colors.success,
        fontWeight: '600',
    },
    buttonLabelDisabled: {
        fontSize: 14,
        color: colors.textTertiary,
    },
    bannerSizeInput: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        padding: 10,
        width: '15%',
        backgroundColor: colors.background,
        color: colors.text,
    },
    bannerView: {
        alignItems: 'center',
        paddingBottom: 1,
        borderWidth: 0,
        marginTop: 5,
    },
    settingsList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 8,
        backgroundColor: colors.background,
        borderRadius: 10,
        elevation: 1,
    },
    settingLabel: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '500',
    },
    labelWhenReady: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.success,
    },
    labelWhenlNotReady: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.error,
    },
    fullscreenAdDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        paddingHorizontal: 10,
        width: '75%',
        backgroundColor: colors.background,
    },
    bannerInlineDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        paddingHorizontal: 10,
        width: '45%',
        backgroundColor: colors.background,
    },
    bannerStickyDropdownList: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.border,
        paddingHorizontal: 10,
        width: '55%',
        backgroundColor: colors.background,
    },
    placeholderStyle: {
        color: colors.textTertiary,
        fontSize: 16,
    },
    selectedTextStyle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AdScreensStyle;
