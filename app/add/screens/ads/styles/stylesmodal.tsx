import { StyleSheet } from 'react-native';
import { colors } from '../../../common/theme/colors';

const StylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    minWidth: 100,
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: colors.textLight,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    color: colors.text,
    fontWeight: '500',
  },
});

export default StylesModal;
