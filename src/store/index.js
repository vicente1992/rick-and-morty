import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    charactersFilter: []
  },
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload
    },
    setCharactersFilter(state, payload) {
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({ commit }) {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        commit('setCharacters', data.results)
        commit('setCharactersFilter', data.results)
      } catch (error) {
        console.log(error);
      }
    },
    filterByStatus({ commit, state }, status) {
      const results = state.characters.filter((character) => character.status.includes(status))
      commit('setCharactersFilter', results)
    },
    filterByName({ commit, state }, name) {
      const formatName = name.toLowerCase()
      const results = state.characters.filter((character) => character.name.toLowerCase().includes(formatName))
      commit('setCharactersFilter', results)
    }
  },
  modules: {
  }
})
