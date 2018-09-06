<template>
    <transition name="lightbox">
        <div class="modal is-lightbox is-active" v-if="isActive">
            <div class="modal-background" @click="close"></div>

            <div class="modal-content" :class="{ 'has-iframe': isIframe }">
                <div class="lightbox-container" @click="close">
                    <div class="iframe-wrap" v-if="isIframe">
                        <iframe :src="src" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>

                    <img :src="src" @click.stop v-else>
                </div>

                <div class="lightbox-navigation-holder" v-if="isGallery">
                    <a class="lightbox-navigation is-previous"
                        :class="{ 'is-disabled': ! hasPreviousImage }"
                        @click="setPreviousImage">
                    </a>
                    
                    <a class="lightbox-navigation is-next"
                        :class="{ 'is-disabled': ! hasNextImage }"
                        @click="setNextImage">
                    </a>
                    
                    <a class="is-close" @click="close">
                        <span class="delete is-large"></span>
                    </a>
                </div>
            </div>

            <button class="modal-close is-large is-hidden-mobile" @click="close"></button>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false,

                src: '',
                type: '',

                gallery: []
            }
        },

        computed: {
            isIframe() {
                return this.type === 'iframe';
            },

            isGallery() {
                return !! this.gallery.length;
            },

            currentIndex() {
                return this.gallery.findIndex(({ url }) => url === this.src);
            },

            hasPreviousImage() {
                return (this.currentIndex - 1) >= 0;
            },

            hasNextImage() {
                return (this.currentIndex + 1) < this.gallery.length;
            }
        },

        methods: {
            open({ src, type, gallery }) {
                this.src = src;
                this.type = type || 'image';
                this.gallery = gallery || [];

                this.isActive = true;
            },

            setPreviousImage() {
                if (this.hasPreviousImage) {
                    this.src = this.gallery[this.currentIndex - 1].url;
                }
            },

            setNextImage() {
                if (this.hasNextImage) {
                    this.src = this.gallery[this.currentIndex + 1].url;
                }
            },

            close() {
                this.isActive = false;
            }
        }
    }
</script>
