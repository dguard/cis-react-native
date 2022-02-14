import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { IThemeState } from 'models/reducers/theme'
import DropDown from 'react-native-paper-dropdown'
import { useSelector } from 'react-redux'

import { bgDarkImage, bgImage } from 'assets/index'

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

interface IState {
  themeReducer: IThemeState
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
  const isDark = useSelector((state: IState) => state.themeReducer.isDark)

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

  const currencyData: ExchangeRateItem[] = [
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
    <View alignCenter justifyCenter stretch>
      <ImageBackground
        resizeMode="cover"
        source={isDark ? bgDarkImage : bgImage}
        fullHeight
        fullWidth>
        <View padding={20}>
          <View mb={10}>
            <DropDown
              label="Currency"
              list={currencyData}
              mode="flat"
              setValue={() => {}}
              showDropDown={() => setCurrencyShowDropdown(true)}
              value={currencyData[0].value}
              visible={currencyShowDropdown}
              onDismiss={() => setCurrencyShowDropdown(false)}
            />
          </View>
          <View mb={10}>
            <TextInput label="Amount" value={amount} onChangeText={text => onSubmitAmount(text)} />
          </View>
          <View mb={10}>
            <DropDown
              label="Target Currency"
              list={targetCurrency}
              mode="flat"
              setValue={value => {
                onSubmitTargetCurrency(value)
              }}
              showDropDown={() => setTargetCurrencyShowDropdown(true)}
              value={selectedTargetCurrency}
              visible={targetCurrencyShowDropdown}
              onDismiss={() => setTargetCurrencyShowDropdown(false)}
            />
          </View>
          <TextInput label="Converted Value" value={convertedValue} onChangeText={() => {}} />
        </View>
      </ImageBackground>
    </View>
  )
}

export default Currency
