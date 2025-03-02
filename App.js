import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    SafeAreaView 
} from 'react-native';
import TickerBar from './TickerBar';

export default function App() {
    const [currentPage, setCurrentPage] = useState('main');
    const [formData, setFormData] = useState({
        cash: '',
        gold: '',
        silver: '',
        trade: '',
        stocks: '',
        debts: ''
    });
    const [result, setResult] = useState(null);
    const [goldPrice, setGoldPrice] = useState(250); // سعر افتراضي
    const [currency, setCurrency] = useState('ريال');

    useEffect(() => {
        // يمكنك إضافة API لجلب سعر الذهب هنا
        // fetchGoldPrice();
    }, []);

    const calculateZakat = () => {
        const values = Object.values(formData).map(val => parseFloat(val) || 0);
        const total = values.slice(0, 5).reduce((a, b) => a + b, 0) - values[5];
        const nisab = 85 * goldPrice;
        const zakat = total >= nisab ? total * 0.025 : 0;

        setResult({
            total,
            zakat,
            nisab
        });
    };

    const MainPage = () => (
        <View style={styles.container}>
            <Text style={styles.title}>حاسبة الزكاة الإسلامية</Text>
            <View style={styles.introContainer}>
                <Text style={styles.introText}>
                    الزكاة هي الركن الثالث من أركان الإسلام
                </Text>
                <Text style={styles.listTitle}>تساعدك هذه الحاسبة في حساب زكاة:</Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}>• النقود والأموال السائلة</Text>
                    <Text style={styles.listItem}>• الذهب والفضة</Text>
                    <Text style={styles.listItem}>• عروض التجارة</Text>
                    <Text style={styles.listItem}>• الأسهم والاستثمارات</Text>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => setCurrentPage('calculator')}
            >
                <Text style={styles.buttonText}>حاسبة الزكاة</Text>
            </TouchableOpacity>
        </View>
    );

    const CalculatorPage = () => (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>حساب الزكاة</Text>
            {Object.keys(formData).map((key) => (
                <View key={key} style={styles.inputContainer}>
                    <Text style={styles.label}>
                        {key === 'cash' ? 'النقود والأموال السائلة' :
                         key === 'gold' ? 'قيمة الذهب' :
                         key === 'silver' ? 'قيمة الفضة' :
                         key === 'trade' ? 'قيمة عروض التجارة' :
                         key === 'stocks' ? 'قيمة الأسهم والاستثمارات' :
                         'الديون المستحقة عليك'}:
                    </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={formData[key]}
                        onChangeText={(text) => setFormData({...formData, [key]: text})}
                    />
                </View>
            ))}

            <TouchableOpacity 
                style={styles.button}
                onPress={calculateZakat}
            >
                <Text style={styles.buttonText}>احسب الزكاة</Text>
            </TouchableOpacity>

            {result && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>نتيجة حساب الزكاة</Text>
                    <Text style={styles.resultText}>
                        إجمالي الأموال الزكوية: {result.total.toFixed(2)} {currency}
                    </Text>
                    <Text style={styles.resultText}>
                        مقدار الزكاة الواجبة: {result.zakat.toFixed(2)} {currency}
                    </Text>
                    <Text style={styles.resultText}>
                        النصاب الحالي: {result.nisab.toFixed(2)} {currency}
                    </Text>
                </View>
            )}

            <TouchableOpacity 
                style={[styles.button, styles.backButton]}
                onPress={() => {
                    setCurrentPage('main');
                    setResult(null);
                    setFormData({
                        cash: '',
                        gold: '',
                        silver: '',
                        trade: '',
                        stocks: '',
                        debts: ''
                    });
                }}
            >
                <Text style={styles.buttonText}>العودة للصفحة الرئيسية</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <TickerBar 
                goldPrice={goldPrice} 
                currency={currency}
                numberSystem="arab"
            />
            {currentPage === 'main' ? <MainPage /> : <CalculatorPage />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1a237e',
        marginVertical: 20,
    },
    introContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    introText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    list: {
        marginLeft: 20,
    },
    listItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#1a237e',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#1a237e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    backButton: {
        backgroundColor: '#0d47a1',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 10,
        textAlign: 'center',
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
    },
});