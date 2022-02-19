import React, { useCallback, useMemo, useState } from 'react'
import axios from 'axios'
import { ExchangeItem, ExchangeRateItem, MayBeExchangeItem } from 'models/exchange-item'
import { TextInput } from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import { useSelector } from 'react-redux'

import { bgDarkImage, bgImage } from 'assets/index'

import { ThemeReducerInterface } from 'store/reducers/themeReducer'

import { ImageBackground, View } from './styles'

export const CurrencyScreen: React.FC = () => {
  const [listExchangeRate, setListExchangeRate] = useState<MayBeExchangeItem>()
  const [amount, setAmount] = useState('100')

  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('Доллар США')
  const [convertedValue, setConvertedValueInternal] = useState<string>()

  const [currencyShowDropdown, setCurrencyShowDropdown] = useState(false)
  const [targetCurrencyShowDropdown, setTargetCurrencyShowDropdown] = useState(false)
  const isDark = useSelector((state: ThemeReducerInterface) => state.themeReducer.isDark)

  const updateCurrency = useCallback(async () => {
    if (listExchangeRate) {
      return
    }
    let resp
    try {
      resp = await axios.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
    } catch (error) {
      console.error(error)
      return
    }
    const { Valute } = resp.data
    const listValutesInternal = Object.keys(Valute).map((key: string) => ({
      id: Valute[key].ID,
      name: Valute[key].Name,
      value: Valute[key].Value,
    }))
    setListExchangeRate(listValutesInternal)
  }, [listExchangeRate])

  const setConvertedValue = useCallback(
    (amountInternal: string, selectedTargetCurrencyInternal: string) => {
      if (listExchangeRate) {
        const selectedTargetCurrencyValue = listExchangeRate.filter(
          (item: ExchangeItem) => item.name === selectedTargetCurrencyInternal,
        )[0].value

        const convertedValueInternal = Number(
          Number(amountInternal) / Number(selectedTargetCurrencyValue),
        ).toFixed(5)

        setConvertedValueInternal(convertedValueInternal)
      }
    },
    [listExchangeRate, setConvertedValueInternal],
  )

  React.useEffect(() => {
    updateCurrency()
  }, [listExchangeRate, updateCurrency])

  React.useEffect(() => {
    if (listExchangeRate) {
      setConvertedValue(amount, selectedTargetCurrency)
    }
  }, [listExchangeRate, amount, selectedTargetCurrency, setConvertedValue])

  const currencyData: ExchangeRateItem[] = useMemo(
    () => [
      {
        label: 'RUB',
        value: 'RUB',
      },
    ],
    [],
  )

  const targetCurrency: ExchangeRateItem[] = useMemo(() => {
    if (listExchangeRate) {
      return listExchangeRate.map((item: ExchangeItem) => ({
        label: item.name,
        value: item.name,
      }))
    }
    return []
  }, [listExchangeRate])

  const onSubmitAmount = useCallback(
    (value: string) => {
      setAmount(value)
      setConvertedValue(value, selectedTargetCurrency)
    },
    [selectedTargetCurrency, setAmount, setConvertedValue],
  )

  const onSubmitTargetCurrency = useCallback(
    (value: string) => {
      setSelectedTargetCurrency(value)
      setConvertedValue(amount, value)
    },
    [amount, setSelectedTargetCurrency, setConvertedValue],
  )

  const onShowCurrencyDropdown = useCallback(() => setCurrencyShowDropdown(true), [])
  const onDismissCurrencyDropdown = useCallback(() => setCurrencyShowDropdown(false), [])

  const onShowTargetCurrencyDropdown = useCallback(() => setTargetCurrencyShowDropdown(true), [])
  const onDismissTargetCurrencyDropdown = useCallback(
    () => setTargetCurrencyShowDropdown(false),
    [],
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
              showDropDown={onShowCurrencyDropdown}
              value={currencyData[0].value}
              visible={currencyShowDropdown}
              onDismiss={onDismissCurrencyDropdown}
            />
          </View>
          <View mb={10}>
            <TextInput label="Amount" value={amount} onChangeText={onSubmitAmount} />
          </View>
          <View mb={10}>
            <DropDown
              label="Target Currency"
              list={targetCurrency}
              mode="flat"
              setValue={value => {
                onSubmitTargetCurrency(value)
              }}
              showDropDown={onShowTargetCurrencyDropdown}
              value={selectedTargetCurrency}
              visible={targetCurrencyShowDropdown}
              onDismiss={onDismissTargetCurrencyDropdown}
            />
          </View>
          <TextInput label="Converted Value" value={convertedValue} onChangeText={() => {}} />
        </View>
      </ImageBackground>
    </View>
  )
}
