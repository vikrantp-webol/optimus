<template>
    <div>
        <input ref="location"
            type="text"
            id="location"
            class="input"
            :value="name"
            @blur="reset"
            placeholder="Enter a location..."
            @input="(e) => this.tempName = e.target.value"
            @keydown.enter.prevent="(e) => e.target.blur()">

        <input type="hidden" name="location" :value="latLng">
        <input type="hidden" name="location_name" :value="name">
    </div>
</template>

<script>
    export default {
        props: {
            apiKey: {
                type: String,
                rquired: true
            },

            location: String,
            locationName: String
        },

        data() {
            return {
                name: '',
                tempName: '',
                latLng: null
            }
        },

        watch: {
            tempName(value) {
                if (! value) {
                    this.name = '';
                    this.latLng = null;
                } else if (value.length === 1) {
                    this.name = value;
                }
            }
        },

        mounted() {
            this.createMap().then(this.loadAutoComplete);

            if (this.location) {
                this.latLng = this.location;
            }

            if (this.locationName) {
                this.name = this.locationName;
                this.tempName = this.locationName;
            }
        },

        methods: {
            createMap() {
                return new Promise((resolve, reject) => {
                    let gmap = document.createElement('script');
                    gmap.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&libraries=places';
                    gmap.type = 'text/javascript';
                    gmap.onload = resolve;
                    gmap.onerror = reject;
                    
                    this.$el.appendChild(gmap);
                });
            },

            loadAutoComplete() {
                let autoComplete = new google.maps.places.Autocomplete(this.$refs.location);

                autoComplete.addListener('place_changed', () => {
                    let place = autoComplete.getPlace();

                    if (place.geometry) {
                        this.name = place.formatted_address;
                        this.latLng = place.geometry.location.lat() + ',' + place.geometry.location.lng();
                    }
                });
            },

            reset() {
                if (! this.latLng) {
                    this.$refs.location.value = '';
                } else if (this.name != this.tempName) {
                    this.$refs.location.value = this.name;
                }
            }
        }
    }
</script>
