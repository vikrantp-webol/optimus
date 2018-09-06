<template>
    <div class="dashboard background is-grey-lighter" :class="{ 'side-is-open': navIsOpen }">
        <o-main-nav>
            <ul>
                <o-nav-item
                    :to="{ name: 'pages.index' }"
                    icon="file-alt" 
                    exact
                >Pages</o-nav-item>

                <li>
                    <a @click="$mediaManager.open({ limit: 0 })">
                        <icon icon="images" size="2x" class="mb-2"></icon>
                        <strong>Media</strong>
                    </a>
                </li>

                <o-nav-item
                    :to="{ name: 'users.index' }"
                    icon="users"
                    exact
                >Users</o-nav-item>
            </ul>
        </o-main-nav>
        
        <section class="main">
            <o-sub-nav>
                <component :is="$route.matched[0].meta.subNav" name="sub-nav"></component>
            </o-sub-nav>

            <div class="main-content">
                <o-header :title="meta.title">
                    <div class="level-item">
                        <a class="icon" @click="logout">
                            <icon icon="sign-out-alt" size="lg"></icon>
                        </a>
                    </div>
                </o-header>
                
                <o-loader :loading="$loader.isLoading()">
                    <router-view></router-view>
                </o-loader>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                nav: {
                    open: false
                }
            }
        },

        computed: {
            ...mapGetters({
                navIsOpen: 'navigation/isOpen'
            }),

            meta() {
                return this.$route.matched[this.$route.matched.length - 1].meta;
            }
        },

        methods: {
            logout() {
                axios.post('/api/auth/logout').then(() => {
                    this.$auth.removeToken();
                    this.$auth.removeUser();

                    this.$router.push({ name: 'login' });
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../../sass/back/app.scss";
    
    $side-primary-width: 100px;
    $side-secondary-width: 260px;

    .dashboard {
        .side-scroll {
            height: 100%;
            display: flex;
        }

        .main {
            flex-grow: 1;
        }

        .side-primary {
            z-index: 110;

            position: relative;
            width: $side-primary-width;

            .nav {
                width: 100%;
                position: relative;
                min-height: min-content;
                
                &:after {
                    top: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 2;
                    width: 1px;
                    content: '';
                    position: absolute;
                    pointer-events: none;
                    background: rgba($white, .075);
                }

                ul > li {
                    > a {
                        display: flex;
                        padding: 20px 10px;
                        text-align: center;
                        align-items: center;
                        flex-direction: column;
                        justify-content: center;
                        min-height: $side-primary-width;
                        border-bottom: solid 1px rgba($white, .075);

                        .icon {
                            font-size: $size-5;
                            margin-bottom: 5px;
                        }

                        &:hover,
                        &:focus,
                        &:active {
                            color: $white;
                            background-color: $primary;
                        }
                    }

                    &.is-active {
                        > a {
                            color: $white;
                            background-color: $primary;
                        }
                    }
                }
            }
        }

        .side-secondary {
            z-index: 100;

            position: relative;
            width: $side-secondary-width;

            .nav {
                width: 100%;
                position: relative;

                &:before {
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 3px;
                    content: '';
                    position: absolute;
                    pointer-events: none;
                    background: linear-gradient(to right, rgba($black, .15) 0%, rgba($black, 0) 100%);
                }

                ul > li {
                    display: block;
                    margin-bottom: 15px;

                    > a {
                        color: $white;
                        display: block;
                        padding: 6px 10px;
                        border-radius: $radius;
                        font-weight: $weight-semibold;

                        &:hover,
                        &:focus,
                        &:active {
                            background-color: darken($blue-darker, 5%);
                        }
                    }

                    &.is-divider {
                        height: 1px;
                        margin: 15px 0;
                        background-color: $blue-dark;
                    }

                    &.is-active {
                        > a {
                            background-color: darken($blue-darker, 5%);
                        }
                    }
                }
            }
        }

        @include mobile {
            .side-scroll {
                overflow: auto;
            }

            .side-primary {
                @include transition;

                top: 0;
                left: 0;
                bottom: 0;
                position: fixed;
                transform: translateX(-100%);
            }

            &.side-is-open {
                .side-primary {
                    transform: translateX(0);
                }
            }
        }

        @include touch {
            .main {
                margin-left: 25px;
            }

            .side-toggle {
                top: 0;
                bottom: 0;
                z-index: 1;
                width: 25px;
                right: -25px;
                height: 100%;
                position: absolute;
                background-color: $blue-darker;
                box-shadow: 6px 0 6px 3px rgba($black, .2);
        
                .dots {
                    top: 50%;
                    left: 50%;
                    position: absolute;
                    transform: translate(-50%, -50%);
        
                    i,
                    i:before,
                    i:after {
                        width: 4px;
                        height: 4px;
                        display: block;
                        border-radius: 4px;
                        background-color: $blue-light;
                    }
        
                    i {
                        position: relative;
        
                        &:before,
                        &:after {
                            content: '';
                            position: absolute;
                        }
        
                        &:before {
                            transform: translateY(-10px);
                        }
        
                        &:after {
                            transform: translateY(10px);
                        }
                    }
                }
            }

            .side-secondary {
                @include transition;

                top: 0;
                left: 0;
                bottom: 0;
                position: fixed;
                transform: translateX(-100%);
                max-width: calc(90% - #{$side-primary-width});
            }

            &.side-is-open {
                .side-secondary {
                    transform: translateX(0);
                    left: $side-primary-width;
                }
            }
        }

        @include tablet {
            display: flex;
            min-height: 100vh;

            .side-primary {
                flex-shrink: 0;
            }
        }

        @include tablet-only {
            .side-secondary {
                left: $side-primary-width;
            }
        }

        @include desktop {
            .side-toggle {
                display: none;
            }

            .main {
                display: flex;
                min-height: 100vh;

                .main-content {
                    flex-grow: 1;
                }
            }

            .side-secondary {
                flex-shrink: 0;
            }
        }
    }
</style>
