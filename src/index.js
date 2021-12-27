import { defineCustomElement } from 'vue'
export const $$ = (name) => document.querySelector(name)

export const setProps = (el, state) => {
  const query = $$(el)
  for(let i in state) {
    query[i] = state[i]
  }
}

export const setFn = (el, name, params) => {
  const query = $$(el)
  query.functionCallback = {
    name: name, 
    params
  }
}