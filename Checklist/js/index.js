Vue.component('checklist-item', {
	template: '<div>' +
		'<input :checked="complete" @click="progress" type="checkbox" :name="\'checkbox\' + id" :id="\'checkbox\' + id" value="">' +
		'<label :for="\'checkbox\' + id"></label><div :class="\'checkbox\' + id" v-html="i"></div>' +
	'</div>',
	data() {
		return {
			id: this._uid,
			complete: false
		};
	},
	props: {
		i: String
	},
	methods: {
		progress() {
			this.complete = !this.complete;
			this.$emit('complete', this.complete);
			this.updateStorage();
		},
		updateStorage() {
			localStorage.setItem(this.id, JSON.stringify({
				complete: this.complete
			}));
		}
	},
	created() {
		if(localStorage.getItem(this.id)) {
			let storage = JSON.parse(localStorage.getItem(this.id));
			if(storage.complete) {
				this.progress();
			}
		}
	}
});

Vue.component('progress-bar', {
	template: '<div class="status"><div class="progress"><div class="bar" :style="{width: width + \'%\'}"></div></div></div>',
	props: {
		c: Number,
		t: Number
	},
	computed: {
		width() {
			return (this.c / this.t) * 100;
		}
	}
});

Vue.component('checklist', {
	template: '<div>' +
		'<progress-bar :c="complete" :t="total"></progress-bar>' +
		'<ul>' +
			'<li v-for="item in items">' +
				'<checklist-item :i="item" v-on:complete="updateProgress"></checklist-item>' +
			'</li>' +
		'</ul>' +
	'</div>',
	data() {
		return {
			items: [
				// Assets
				'<a href="https://www.nngroup.com/articles/which-ux-research-methods/" target="_blank">Define goals for the study</a>',
				'Have planning kick-off',
				'Define goals for the study',
				'Determine satisfaction and performance metrics',
				'Determine the format and setting of the study',
				'Determine testing dates and daily schedule',
				'Define audience and target amount',
				'Determine insentive',
				'Define recruitment plan',
				'Make list of moderators and observers',
				'Note moderator and observer availability',
				'Create moderator and observer group chat',
				'Reserve testing rooms',
				'<a href="https://calendly.com/" target="_blank">Set up scheduling system (calendly)</a>',
				'Arrange testing devices',
				'Confirm testing software (<a href="https://silverbackapp.com/" target="_blank">Desktop MAC</a>, Android, iOS)',
				'Craft all email templates (offer, confirmation, reminder)',
				'<a href="https://www.nngroup.com/articles/task-scenarios-usability-testing/" target="_blank">Craft testing script and tasks</a>',
				'Schedule workshop/dry run session',
				'Conduct workshop/dry run session',
				'Send guidelines and script to moderators',
				'Send recruitment email',
				'Confirm submissions and assign moderators and observers to each session',
				'Make sure all calendar events have: participant name, participant contact number, and location',
				'Create repository for notes and recordings and share with team'
			],

			complete: 0
		};
	},
	computed: {
		total() {
			return this.items.length;
		}
	},
	methods: {
		updateProgress(complete) {
			(complete) ? this.complete++ : this.complete--;
		}
	}
});

new Vue().$mount('#app');