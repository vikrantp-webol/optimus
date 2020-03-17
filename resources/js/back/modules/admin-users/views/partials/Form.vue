<template>
    <o-loader :loading="isLoading('primary.*')">
        <form @submit.prevent="submit">
            <o-errors v-if="anyErrors" :errors="errors" />

            <div class="p-8 border-b border-grey-400">
                <div class="max-w-3xl">
                    <!-- Name -->
                    <o-form-field
                        input="name"
                        label="Name"
                        required
                    >
                        <o-input
                            id="name"
                            v-model="form.name"
                            required
                        />
                    </o-form-field>

                    <!-- Email -->
                    <o-form-field
                        input="email"
                        label="Email"
                        required
                    >
                        <o-input
                            id="email"
                            v-model="form.email"
                            type="email"
                            required
                        />
                    </o-form-field>

                    <!-- Username -->
                    <o-form-field
                        v-if="! isEditingAdmin"
                        input="username"
                        label="Username"
                        required
                    >
                        <o-input
                            id="username"
                            v-model="form.username"
                            required
                        />
                    </o-form-field>

                    <!-- Password -->
                    <o-form-field
                        input="password"
                        label="Password"
                        :required="! item"
                    >
                        <o-input
                            id="password"
                            v-model="form.password"
                            type="password"
                            :required="! item"
                            autocomplete="new-password"
                        />
                    </o-form-field>

                    <!-- Avatar -->
                    <o-form-field
                        v-if="isEditing"
                        label="Avatar"
                    >
                        <div class="control">
                            <div class="w-48 h-48 border border-grey-500 rounded">
                                <img
                                    :src="avatar"
                                    class="rounded"
                                >
                            </div>
                        </div>

                        <template slot="help">
                            Change your avatar via
                            <a
                                href="http://en.gravatar.com/"
                                class="underline"
                                target="_blank"
                            >gravatar.com</a>.
                        </template>
                    </o-form-field>
                </div>
            </div>

            <div class="p-8">
                <button
                    class="button green"
                    :class="{ 'loading': isProcessing }"
                    :disabled="isProcessing"
                >
                    Save
                </button>
            </div>
        </form>
    </o-loader>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formMixin } from '@optimuscms/theme';

import { createAdminUser, updateAdminUser } from '../../routes/api';

export default {
    mixins: [ formMixin ],

    data() {
        return {
            form: {
                name: '',
                username: '',
                email: '',
                password: '',
            },
        };
    },

    computed: {
        ...mapGetters({
            authedUser: 'user/data',
        }),

        isEditingAdmin() {
            return this.item && this.item.username === 'admin';
        },

        isEditingSelf() {
            return this.authedUser.id == this.$route.params.id;
        },

        avatar() {
            if (this.item && this.item.hasOwnProperty('gravatar_url')) {
                return `${this.item.gravatar_url}?d=identicon&s=384`;
            }

            return null;
        },
    },

    watch: {
        item(item) {
            this.form = {
                name: item.name,
                username: item.username,
                email: item.email,
                password: null,
            };
        },
    },

    methods: {
        ...mapActions({
            updateCurrentUser: 'user/update',
        }),

        save() {
            if (this.isEditing) {
                return updateAdminUser(this.item.id, this.form);
            }

            return createAdminUser(this.form);
        },

        onSuccess(response) {
            if (this.isEditingSelf) {
                this.updateCurrentUser(response.data.data);
            }

            this.$router.push({
                name: 'users.index',
            });
        },
    },
};
</script>
