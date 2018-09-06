<template>
    <div class="swiper has-testimonials">
        <swiper :options="options">
            <slot></slot>

            <a
                slot="button-prev"
                v-show="navigation"
                class="swiper-navigation is-previous"
            ></a>

            <a
                slot="button-next"
                v-show="navigation"
                class="swiper-navigation is-next"
            ></a>

            <div slot="pagination" class="swiper-pagination is-primary"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        props: {
            navigation: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                options: {
                    autoplay: {
                        delay: 7000
                    },

                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        bulletClass: 'bullet',
                        bulletActiveClass: 'is-active'
                    },

                    navigation: {
                        nextEl: '.is-next',
                        prevEl: '.is-previous',
                        disabledClass: 'is-disabled'
                    }
                }
            }
        }
    }
</script>
