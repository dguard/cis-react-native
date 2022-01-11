import React, {useState} from "react";
import styles from "app/screens/Login/styles";


import {Dimensions, View, ImageBackground} from 'react-native';
let dimensions = Dimensions.get('window');
console.log(dimensions);


import { TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";



const componentDidMount = (cb) => {
    React.useEffect(cb)
};

const http_get = (url: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                console.log('success', request.responseText);
                return resolve(request);
            } else {
                console.warn('error');
                return reject(request);
            }
        };

        request.open('GET', url);
        request.send();
    });
}


const Currency: React.FC = () => {
    const [listExchangeRate, setListExchangeRate] = useState(null as any);
    const [amount, setAmount] = useState("100" as any);

    const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('Доллар США');
    const [convertedValue, _setConvertedValue] = useState(null as any);

    const [currencyShowDropdown, setCurrencyShowDropdown] = useState(false);
    const [targetCurrencyShowDropdown, setTargetCurrencyShowDropdown] = useState(false);

    componentDidMount(() => {
        if(listExchangeRate) {
            return;
        }

        http_get(`https://www.cbr-xml-daily.ru/daily_json.js`).then((resp: any) => {
            console.log();

            const Valute = JSON.parse(resp.responseText)['Valute'];
            let _listValutes = Object.keys(Valute).map((key: any) => {
                return {
                    'id': Valute[key]['ID'],
                    'name': Valute[key]['Name'],
                    'value': Valute[key]['Value']
                }
            });
            setListExchangeRate(_listValutes);


        })
    });
    componentDidMount(() => {
        if(listExchangeRate) {
            setConvertedValue(amount, selectedTargetCurrency);
        }
    });

    const currencyData = [{
        label: 'RUB',
        value: 'RUB'
    }];

    let targetCurrency = [];
    if(listExchangeRate) {
        targetCurrency = listExchangeRate.map((item: any) => {
            return {
                label: item.name,
                value: item.name
            }
        })
    }

    const setConvertedValue = (amount: any, selectedTargetCurrency: any) => {
        if(listExchangeRate) {
            const _convertedValue = Number(amount / listExchangeRate.filter((item: any) => {
                return item['name'] === selectedTargetCurrency
            })[0].value).toFixed(5);

            _setConvertedValue(_convertedValue);
        }
    };

    const onSubmitAmount = (value: any) => {
        setAmount(value);
        setConvertedValue(value, selectedTargetCurrency);
    };

    const onSubmitTargetCurrency = (value: any) => {
        setSelectedTargetCurrency(value);
        setConvertedValue(amount, value);
    };


    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/bg.jpg")} resizeMode="cover" style={{width: '100%', height: '100%'}}>
                <View style={{padding: 20}}>
                    <View style={{marginBottom: 10}}>
                        <DropDown
                            label={"Currency"}
                            mode={"outlined"}
                            visible={currencyShowDropdown}
                            showDropDown={() => setCurrencyShowDropdown(true)}
                            onDismiss={() => setCurrencyShowDropdown(false)}
                            value={currencyData[0].value}
                            setValue={()=>{}}
                            list={currencyData}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <TextInput
                            label="Amount"
                            value={amount}
                            onChangeText={text => onSubmitAmount(text)}
                        />
                    </View>
                    <View style={{marginBottom: 10}}>
                        <DropDown
                            label={"Target Currency"}
                            mode={"outlined"}
                            visible={targetCurrencyShowDropdown}
                            showDropDown={() => setTargetCurrencyShowDropdown(true)}
                            onDismiss={() => setTargetCurrencyShowDropdown(false)}
                            value={selectedTargetCurrency}
                            setValue={(value)=>{onSubmitTargetCurrency(value)}}
                            list={targetCurrency}
                        />
                    </View>
                    <TextInput
                        label="Converted Value"
                        value={convertedValue}
                        onChangeText={text => {}}
                    />



                </View>

            </ImageBackground>
        </View>
    );
};

export default Currency;