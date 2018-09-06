<template>
    <section class="background is-gradient login-holder p-4">
        <transition :css="false" @leave="loginLeave">
            <div class="login-wrap has-shadow is-primary" v-if="! isAuthenticated">
                <div class="login-top background is-white px-5 py-6">
                    <h1 class="title is-size-1 is-uppercase">Optimus</h1>
                    <h2 class="subtitle is-size-6 has-text-primary">Managing your content</h2>
                </div>

                <div class="login-bottom background is-secondary p-5">
                    <o-errors
                        v-if="form.errors.any()"
                        class="mb-2"
                        :errors="form.errors.all()"
                    ></o-errors>

                    <form @submit.prevent="submit">
                        <div class="field mb-2">
                            <label for="Username" class="is-hidden">Username</label>

                            <div class="control">
                                <input
                                    type="text"
                                    class="input input-primary"
                                    v-model="form.username"
                                    placeholder="Username"
                                >
                            </div>
                        </div>

                        <div class="field mb-2">
                            <label for="Password" class="is-hidden">Password</label>

                            <div class="control">
                                <input
                                    type="password"
                                    class="input input-primary"
                                    v-model="form.password"
                                    placeholder="Password"
                                >
                            </div>
                        </div>

                        <div class="field mb-3">
                            <div class="control">
                                <button
                                    type="submit"
                                    class="button is-primary is-big is-fullwidth"
                                    :class="{ 'is-loading': form.processing }"
                                >Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </transition>

        <div class="login-logo pt-4">
            <optix-logo></optix-logo>
        </div>
    </section>
</template>

<script>
    import Velocity from 'velocity-animate';
    import Form from 'form-backend-validation';

    import OptixLogo from './partials/OptixLogo';

    export default {
        components: { OptixLogo },

        data() {
            return  {
                isAuthenticated: false,

                form: new Form({
                    username: '',
                    password: ''
                })
            }
        },

        methods: {
            submit() {
                this.form.post('/api/auth/login').then(response => {
                    this.$auth.setToken(response.access_token);
                    this.$auth.setUser(response.user);

                    this.isAuthenticated = this.$auth.check();
                });
            },

            loginLeave(el, done) {
                Velocity(el, {
                    translateX: '-30%',
                    opacity: 0
                },
                {
                    duration: 350,
                    complete: () => {
                        this.$router.push({
                            name: 'home'
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../sass/back/app.scss";

    .login-holder {
        display: flex;
        min-height: 100vh;
        flex-direction: column;

        .login-wrap {
            width: 100%;
            margin: auto;
            max-width: 380px;

            .login-top {
                text-align: center;
                border-radius: $radius $radius 0 0;
            }

            .login-bottom {
                border-radius: 0 0 $radius $radius;
            }
        }

        .login-logo {
            max-width: 80%;
            margin-left: auto;
            text-align: center;
            align-self: flex-end;

            @include mobile {
                margin-right: auto;
            }

            svg {
                max-width: 100%;

                path {
                    fill: rgba($white, .45);
                }
            }
        }
    }
</style>
