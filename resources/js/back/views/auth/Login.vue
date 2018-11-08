<template>
    <section class="bg-gradient-login flex min-h-screen flex-col p-8">
        <transition :css="false" @leave="slideOut">
            <div class="w-full m-auto max-w-sm shadow-styled" v-if="! isAuthenticated">
                <div class="text-center bg-white rounded-t px-6 py-12 md:px-12">
                    <h1
                        class="title text-5xl font-bold text-blue uppercase"
                    >Optimus</h1>

                    <h2 class="subtitle text-primary">
                        <i>Managing your content</i>
                    </h2>
                </div>

                <div class="bg-blue-dark rounded-b px-6 py-12 md:px-12">
                    <login-form
                        method="post"
                        action="/api/auth/login"
                        @login="isAuthenticated = true"
                    ></login-form>
                </div>
            </div>
        </transition>

        <div class="text-center md:text-right pt-10">
            <optix-logo></optix-logo>
        </div>
    </section>
</template>

<script>
    import Velocity from 'velocity-animate';
    import LoginForm from './partials/Form';
    import OptixLogo from './partials/OptixLogo';

    export default {
        components: {
            LoginForm,
            OptixLogo
        },

        data() {
            return  {
                isAuthenticated: false
            }
        },

        methods: {
            slideOut(el, done) {
                Velocity(el, {
                    translateX: '-30%',
                    opacity: 0
                }, {
                    duration: 350,
                    complete: () => {
                        this.$router.push({ name: 'home' });
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .bg-gradient-login {
        background-image: linear-gradient(to bottom, #313542 0%, #944744 80%, #824442 100%);
    }

    .shadow-styled {
        z-index: 1;
        position: relative;

        &:after,
        &:before {
            z-index: -1;
            content: '';
            height: 20px;
            bottom: -15px;
            filter: blur(2px);
            position: absolute;
            width: calc(50% - 7px);
        }

        &:before {
            left: 5px;
            transform: skew(-25deg);
            background: linear-gradient(-185deg, rgba(0, 0, 0, .35) 0%, rgba(0, 0, 0, .0) 70%);
        }

        &:after {
            right: 5px;
            transform: skew(25deg);
            background: linear-gradient(185deg, rgba(0, 0, 0, .35) 0%, rgba(0, 0, 0, .0) 70%);
        }
    }
</style>
