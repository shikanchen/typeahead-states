import { createApp } from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  el: "#app",
  data: {
    keyword: null,
		states: []
  },
  methods: {
    queryForStates(event) {
			const keyword = event.target.value
			this.keyword = keyword
			var self = this
			$.get("http://localhost:4000/graphql",
				{
					query : "query getFilteredStates($keyword: String) {states(keyword: $keyword) {name}}",
					operationName : "getFilteredStates",
					variables : "{\"keyword\": \""+self.keyword+"\"}"
				},
				function(data) {
					const filteredStates = data.data.states
					self.states = filteredStates
				}
			);
    },
		completeState(name) {
			this.keyword = name
		}
	}
});
