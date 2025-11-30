import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../common/theme/colors';

type ItemData = {
    id: string;
    title: String;
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        backgroundColor: colors.background,
        borderRadius: 12,
        elevation: 2,
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    list: {
        paddingVertical: 8,
    },
});

const Screens: ItemData[] = [
    {
        id: '1',
        title: 'Settings',
    },
    {
        id: '2',
        title: 'Sticky Banner',
    },
    {
        id: '3',
        title: 'Inline Banner',
    },
    {
        id: '4',
        title: 'Interstitial',
    },
    {
        id: '5',
        title: 'Rewarded',
    },
    {
        id: '6',
        title: 'AppOpen',
    },
];

const List = () => {
    const marginHorizontal = 16;
    const navigation = useNavigation<any>();
    const renderItem = ({ item }: { item: ItemData }) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(item.title)} style={[styles.item]}>
                <Text style={[styles.text]}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={Screens} renderItem={renderItem} keyExtractor={(item) => item.id} scrollEnabled={false} />
        </SafeAreaView>
    );
};

export default List;
