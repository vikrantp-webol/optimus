<template>
    <div class="side-header px-10 h-24">
        <div v-if="userIsSet" class="flex items-center">
            <div class="flex-no-shrink mr-4">
                <figure class="image w-12 h-12">
                    <img
                        :src="imageSrc"
                        :alt="user.name"
                        class="rounded-full"
                    >
                </figure>
            </div>

            <div class="flex-grow">
                <div class="font-medium text-white mb-1">
                    {{ user.name }}
                </div>

                <router-link
                    :to="{
                        name: 'users.edit',
                        params: { id: user.id }
                    }"
                    class="flex items-center text-grey-500 hover:text-grey-400"
                >
                    <span class="icon small mr-1">
                        <icon icon="cog" size="sm" />
                    </span>

                    <span class="text-xs">Your details</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        avatar: {
            type: String,
            default: '/back/images/avatar.png',
        },
    },

    computed: {
        ...mapGetters({
            user: 'user/data',
        }),

        userIsSet() {
            return this.user;
        },

        imageSrc() {
            return this.user && this.user.avatar
                ? this.user.avatar
                : this.avatar;
        },
    },
};
</script>
