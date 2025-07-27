import { defineStore } from 'pinia'

export const useScrollTextStore = defineStore('scroll', {
  state: () => ({
    text: 'this is testing text, hopefully it works',
  }),
  actions: {
    updateText(newText) {
      this.text = newText
    },
  },
})
