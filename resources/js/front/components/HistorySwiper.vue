<template>
    <div>
        <swiper ref="swiper" :options="options" @resize="setNavigationPosition" @slide-change="setNavigationPosition">
            <slot></slot>
            
            <div slot="pagination" class="swiper-pagination is-primary"></div>
        </swiper>

        <a
            @click="swiper.slidePrev()"
            :class="{ 'is-disabled': navigation.isBeginning }"
            class="swiper-navigation is-previous is-hidden-touch"
        ></a>

        <a
            @click="swiper.slideNext()"
            :class="{ 'is-disabled': navigation.isEnd }"
            class="swiper-navigation is-next is-hidden-touch"
        ></a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navigation: {
                    isBeginning: true,
                    isEnd: true,
                },

                options: {
                    slidesPerView: 2,
                    spaceBetween: 30,

                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        bulletClass: 'bullet',
                        bulletActiveClass: 'is-active'
                    },

                    breakpoints: {
                        1500: {
                            slidesPerView: 1
                        }
                    }
                }
            }
        },

        computed: {
            swiper() {
                return this.$refs.swiper.swiper;
            }
        },

        mounted() {
            this.setNavigationPosition();
        },

        methods: {
            setNavigationPosition() {
                this.navigation.isBeginning = this.swiper.isBeginning;
                this.navigation.isEnd = this.swiper.isEnd;
            }
        }
    }
</script>
