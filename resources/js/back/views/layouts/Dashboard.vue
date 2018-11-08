<template>
    <div class="bg-grey-lightest sm:flex sm:min-h-screen" :class="{ 'side-is-open': navIsOpen }">
        <o-main-nav>
            <ul class="list-reset">
                <o-main-nav-item
                    :to="{ name: 'pages.index' }"
                    icon="file-alt" 
                    :class="{ 'is-active': area === 'pages' }"
                >Pages</o-main-nav-item>

                <o-main-nav-item
                    :to="{ name: 'posts.index' }"
                    :icon="['far', 'newspaper']"
                    :class="{ 'is-active': area === 'posts' }"
                >News</o-main-nav-item>

                <li class="nav-item">
                    <a @click="$mediaManager.open({ limit: 0 })">
                        <icon icon="images" size="2x"></icon>
                        <strong>Media</strong>
                    </a>
                </li>

                <o-main-nav-item
                    :to="{ name: 'users.index' }"
                    icon="users"
                    :class="{ 'is-active': area === 'users' }"
                >Users</o-main-nav-item>
            </ul>
        </o-main-nav>

        <section id="main" class="flex-grow md:flex md:min-h-screen">
            <o-sub-nav @opened="openNav" @closed="closeNav">
                <component
                    :is="$route.matched[0].meta.subNav"
                    name="sub-nav"
                ></component>
            </o-sub-nav>

            <div class="lt-md:ml-5 md:flex-grow">
                <o-header :title="meta.title">
                    <a class="icon" @click="logout">
                        <icon icon="sign-out-alt" size="lg"></icon>
                    </a>
                </o-header>
                
                <o-loader :loading="$loader.isLoading('primary.*')">
                    <router-view></router-view>
                </o-loader>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                navIsOpen: 'navigation/isOpen'
            }),

            meta() {
                return this.$route.matched[this.$route.matched.length - 1].meta;
            },

            area() {
                return this.meta.hasOwnProperty('area')
                    ? this.meta.area
                    : this.$route.matched[0].meta.area;
            }
        },

        methods: {
            ...mapMutations({
                openNav: 'navigation/open',
                closeNav: 'navigation/close'
            }),
            
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
