import React, { useCallback, useState } from 'react'
import { bgImage } from 'app/assets/index'
import axios from 'axios'
import DropDown from 'react-native-paper-dropdown'

import { ImageBackground, TextInput, View } from './styles'

type ExchangeItem = {
  id: string
  name: string
  value: string
}

type ExchangeRateItem = {
  label: string
  value: string
}

const ComponentDidMount = (cb: any) => {
  React.useEffect(cb)
}

const Currency: React.FC = () => {
  const [listExchangeRate, setListExchangeRate] = useState<ExchangeItem[] | undefined>(undefined)
  const [amount, setAmount] = useState<string>('100')

  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState<string>('Доллар США')
  const [convertedValue, setConvertedValueInternal] = useState<string | undefined>(undefined)

  const [currencyShowDropdown, setCurrencyShowDropdown] = useState<boolean>(false)
  const [targetCurrencyShowDropdown, setTargetCurrencyShowDropdown] = useState<boolean>(false)

  ComponentDidMount(() => {
    const updateCurrency = async () => {
      if (listExchangeRate) {
        return
      }
      const { Valute } = (await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)).data
      const listValutesInternal = Object.keys(Valute).map((key: any) => ({
        id: Valute[key].ID,
        name: Valute[key].Name,
        value: Valute[key].Value,
      }))
      setListExchangeRate(listValutesInternal)
    }
    updateCurrency()
  })
  ComponentDidMount(() => {
    if (listExchangeRate) {
      setConvertedValue(amount, selectedTargetCurrency)
    }
  })

  const currencyData = [
    {
      label: 'RUB',
      value: 'RUB',
    },
  ]

  let targetCurrency: ExchangeRateItem[] = []
  if (listExchangeRate) {
    targetCurrency = listExchangeRate.map((item: any) => ({
      label: item.name,
      value: item.name,
    }))
  }

  const setConvertedValue = useCallback(
    (amountInternal: any, selectedTargetCurrencyInternal: any) => {
      if (listExchangeRate) {
        const convertedValueInternal = Number(
          amountInternal /
            Number(
              listExchangeRate.filter(
                (item: any) => item.name === selectedTargetCurrencyInternal,
              )[0].value,
            ),
        ).toFixed(5)

        setConvertedValueInternal(convertedValueInternal)
      }
    },
    [listExchangeRate, setConvertedValueInternal],
  )

  const onSubmitAmount = useCallback(
    (value: any) => {
      setAmount(value)
      setConvertedValue(value, selectedTargetCurrency)
    },
    [selectedTargetCurrency, setAmount, setConvertedValue],
  )

  const onSubmitTargetCurrency = useCallback(
    (value: any) => {
      setSelectedTargetCurrency(value)
      setConvertedValue(amount, value)
    },
    [amount, setSelectedTargetCurrency, setConvertedValue],
  )

  return (
    <View alignItems="center" flex={1} justifyContent="center">
      <ImageBackground height="100%" resizeMode="cover" source={bgImage} width="100%">
        <View padding={20}>
          <View mb={10}>
            <DropDown
              label="Currency"
              list={currencyData}
              mode="outlined"
              setValue={() => {}}
              showDropDown={() => setCurrencyShowDropdown(true)}
              value={currencyData[0].value}
              visible={currencyShowDropdown}
              onDismiss={() => setCurrencyShowDropdown(false)}
            />
          </View>
          <View mb={10}>
            <TextInput
              autoComplete={false}
              label="Amount"
              value={amount}
              onChangeText={text => onSubmitAmount(text)}
            />
          </View>
          <View mb={10}>
            <DropDown
              label="Target Currency"
              list={targetCurrency}
              mode="outlined"
              setValue={value => {
                onSubmitTargetCurrency(value)
              }}
              showDropDown={() => setTargetCurrencyShowDropdown(true)}
              value={selectedTargetCurrency}
              visible={targetCurrencyShowDropdown}
              onDismiss={() => setTargetCurrencyShowDropdown(false)}
            />
          </View>
          <TextInput
            autoComplete={false}
            label="Converted Value"
            value={convertedValue}
            onChangeText={() => {}}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

export default Currency
