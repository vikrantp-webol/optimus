<template>
    <div ref="component" class="map-holder">
        <div ref="map" class="map"></div>
    </div>
</template>

<script>
    export default {
        props: {
            apiKey: {
                type: String,
                rquired: true
            },

            latitude: Number,
            longitude: Number
        },

        computed: {
            location() {
                return {
                    lat: this.latitude,
                    lng: this.longitude
                }
            }
        },

        mounted() {
            this.createMap().then(this.loadMap);
        },

        methods: {
            createMap() {
                return new Promise((resolve, reject) => {
                    let gmap = document.createElement('script');
                    gmap.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&libraries=places';
                    gmap.type = 'text/javascript';
                    gmap.onload = resolve;
                    gmap.onerror = reject;
                    
                    this.$refs.component.appendChild(gmap);
                });
            },

            loadMap() {
                let map = new google.maps.Map(this.$refs.map, {
                    zoom: 17,
                    center: this.location
                });

                let marker = new google.maps.Marker({
                    map: map,
                    position: this.location
                });
            }
        }
    }
</script>
