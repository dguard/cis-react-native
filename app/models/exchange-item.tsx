export type ExchangeItem = {
  id: string
  name: string
  value: string
}
export type MayBeExchangeItem = ExchangeItem[] | undefined

export type ExchangeRateItem = {
  label: string
  value: string
}
