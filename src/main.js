import { createApp } from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('enz-typeahead', {
	props: ['states', 'value'], // <-- prop value is added
	mounted: function () {
		var me = this;
		
		var states = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace,
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: this.states // <-- states is being attached here
		});
		
		jQuery(me.$refs.thead_001).typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
			name: 'states',
			source: states
		});
		
		// listen to 'typeahead:select' and emit the input event
		jQuery(me.$refs.thead_001).bind('typeahead:select', function (e) {
			me.$emit('input', e.target.value);
		});
		
		// listen to 'typeahead:autocomplete' and emit the input event
		jQuery(me.$refs.thead_001).bind('typeahead:autocomplete', function (e) {
			me.$emit('input', e.target.value);
		});
		
	},
	template: '<input class="typeahead" type="text" ref="thead_001" placeholder="States of USA">'
});

new Vue({
	el: "#app",
	data: {
		selectedState: null, // <-- Variable with default value
		ourStates: ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District ", "of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]
		
	}
});