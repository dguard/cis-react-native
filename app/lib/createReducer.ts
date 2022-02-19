/*
 * Will dynamically create reducers
 * enforcing a unique way to describe reducers
 */
export const createReducer = (initialState: any, handlers: any) =>
  function reducer(state = initialState, action: any) {
    if (handlers.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
