import './bootstrap';
// import './lib/icons';

const app = new Vue({
    el: '#app',

    data() {
        return {
            navIsActive: false
        }
    },

    methods: {
        toggleNav() {
            this.navIsActive = ! this.navIsActive;
        }
    }
});
