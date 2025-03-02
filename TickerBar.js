import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const TickerBar = ({ goldPrice, currency, numberSystem }) => {
    const [animation] = useState(new Animated.Value(0));
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        // تحريك النص
        Animated.loop(
            Animated.timing(animation, {
                toValue: -1,
                duration: 20000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();

        // تحديث التاريخ والوقت
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString('ar-SA'));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const translateX = animation.interpolate({
        inputRange: [-1, 0],
        outputRange: [-300, 300]
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.ticker, { transform: [{ translateX }] }]}>
                <Text style={styles.text}>
                    {`التاريخ والوقت: ${currentDateTime} | سعر جرام الذهب: ${goldPrice} ${currency}`}
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a237e',
        height: 40,
        overflow: 'hidden',
    },
    ticker: {
        position: 'absolute',
        height: '100%',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default TickerBar;