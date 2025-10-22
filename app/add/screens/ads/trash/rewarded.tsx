import { SafeAreaView, Text, TouchableOpacity, View, Modal, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { AdRequestConfiguration, AdTheme, Gender, Location, RewardedAd, RewardedAdLoader } from 'yandex-mobile-ads';
import AdScreensStyle from './styles/styles';
import LogView from '../../components/logView';
import Logger from '../../common/logger';
import DropdownList from '../../components/dropdownList';
import AdNetwork from '../../common/adNetworkUtils/adNetwork';
import AdNetworkProvider from '../../common/adNetworkUtils/adNetworkProvider';

import StylesModal from './styles/stylesmodal';

const stylesModal = StylesModal;


const logger = new Logger();

const loadAd = async (adUnitId: string, setAd: any, setButtonLabel: any, setIsButtonDisabled: any, setLogs: any) => {
    let loader = await RewardedAdLoader.create()
        .catch((error) => {
            logger.addLog(`Did fail to create the loader with error: ${error}`, setLogs);
            setIsButtonDisabled(false);
            return;
        });
    if (!loader) {
        return;
    }
    let adRequestConfiguration = new AdRequestConfiguration({
        adUnitId: 'R-M-15129928-1',
        age: '20',
        contextQuery: 'context-query',
        contextTags: ['context-tag'],
        gender: Gender.Female,
        location: new Location(55.734202, 37.588063),
        adTheme: AdTheme.Light,
        parameters: new Map<string, string>([['param1', 'value1'], ['param2', 'value2']]),
    });
    await loader.loadAd(adRequestConfiguration)
        .then((ad) => {
            logger.addLog('Did load', setLogs);
            setAd(ad);
            setButtonLabel('Show ad');
            setIsButtonDisabled(false);
        })
        .catch((error) => {
            logger.addLog(`Did fail to load with error: ${error}`, setLogs);
            setAd(undefined);
            setButtonLabel('Load ad');
            setIsButtonDisabled(false);
        });
};

const showAd = async (ad: RewardedAd | undefined, setButtonLabel: any, setIsButtonDisabled: any, setLogs: any) => {

    if (ad) {
        ad.onAdShown = () => {
            logger.addLog('Did show', setLogs);
            setButtonLabel('Load ad');
            setIsButtonDisabled(false);
        };
        ad.onAdFailedToShow = (error) => {
            logger.addLog(`Did fail to show with error: ${JSON.stringify(error)}`, setLogs);
            setButtonLabel('Load ad');
            setIsButtonDisabled(false);
        };
        ad.onAdClicked = () => {
            logger.addLog('Did click', setLogs);
        };
        ad.onAdDismissed = () => {
            logger.addLog('Did dismiss', setLogs);
        };
        ad.onAdImpression = (impressionData) => {
            logger.addLog(`Did track impression: ${JSON.stringify(impressionData)}`, setLogs);
        };
        ad.onRewarded = (reward) => {
            logger.addLog(`Did reward: ${JSON.stringify(reward)}`, setLogs);
            userCoinsBalance('+', 10)
        };
        ad.show();
    }
};

const RewardAdBtn = () => {
    const styles = AdScreensStyle;
    const rewardedAdNetworks = AdNetworkProvider.instance.rewardedAdNetworks;

    const [ad, setAd] = useState<RewardedAd | undefined>(undefined);
    const [buttonLabel, setButtonLabel] = useState<string>('Load ad');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [selectedAdNetwork, setAdNetwork] = useState<AdNetwork | undefined>(rewardedAdNetworks[0]);

    const [modalVisibleAd, setModalVisibleAd] = useState(false);


    return (
            <View >
                <Pressable
                    onPress={() => {
                        setModalVisibleAd(true)
                        setIsButtonDisabled(true);
                        loadAd(selectedAdNetwork?.adUnitId ?? '', setAd, setButtonLabel, setIsButtonDisabled, setLogs);
                    }}
                    disabled={isButtonDisabled}
                    style={isButtonDisabled ? styles.buttonViewDisabled : styles.buttonViewEnabled}
                    title={buttonLabel}
                >

                </Pressable>

                <Modal
                 animationType="slide"
                 transparent={true}
                 visible={modalVisibleAd}
                 onRequestClose={() => {setModalVisibleAd(!modalVisibleAd);}}
                 >
                 <View style={stylesModal.centeredView}>
                   <View style={stylesModal.modalView}>
                     <Image
         							style={{height: 42, width: 42, marginBottom:20}}
         							source={require('../../../../app/assets/ads.png')}
         							/>
                     <Text style={stylesModal.modalText}>Посмотри рекламный
                        ролик до конца и получи 10 монет! {'\n'}Чтобы обновить
                        баланс — выйди в меню и снова вернись в игру.</Text>
                     <View style={{
                       display: 'flex',
                       justifyContent: 'center',
                       textAlign: 'center',
                       flexDirection: 'row',
                       columnGap: 5,
                     }}>
                       <Pressable
                         style={[stylesModal.button, stylesModal.buttonClose]}
                         onPress={() => {
                           showAd(ad, setButtonLabel, setIsButtonDisabled, setLogs);
                           setModalVisibleAd(!modalVisibleAd)
                         }}>
                         <Text style={stylesModal.textStyle}>Смотреть</Text>
                       </Pressable>

                       <Pressable
                         style={[stylesModal.button, stylesModal.buttonClose]}
                         onPress={() => {
                           setModalVisibleAd(!modalVisibleAd)
                         }}>
                         <Text style={stylesModal.textStyle}>Не сейчас</Text>
                       </Pressable>
                     </View>

                   </View>
                 </View>
                </Modal>

            </View>
    );
};

export default RewardAdBtn;
