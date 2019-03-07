<template>
    <form @submit.prevent="submit">
        <o-errors v-if="anyErrors" :errors="errors"></o-errors>

        <div class="p-8 border-b border-grey-light">
            <div class="xl:w-2/3">
                <!-- Name -->
                <o-form-field input="name" label="Name" required>
                    <o-input
                        id="name"
                        v-model="form.name"
                        required
                    ></o-input>
                </o-form-field>

                <!-- Email -->
                <o-form-field input="email" label="Email" required>
                    <o-input
                        id="email"
                        type="email"
                        v-model="form.email"
                        required
                    ></o-input>
                </o-form-field>

                <!-- Username -->
                <o-form-field input="username" label="Username" required v-if="! isEditingAdmin">
                    <o-input
                        id="username"
                        v-model="form.username"
                        required
                    ></o-input>
                </o-form-field>

                <!-- Password -->
                <o-form-field input="password" label="Password" :required="! item">
                    <o-input
                        id="password"
                        type="password"
                        v-model="form.password"
                        :required="! item"
                        autocomplete="new-password"
                    ></o-input>
                </o-form-field>

                <!-- Avatar -->
                <o-form-field input="avatar" label="Avatar">
                    <media-picker
                        id="avatar"
                        :media="getMedia('avatar')"
                        v-model="form.avatar"
                        preview
                        accepted-extensions="image"
                    ></media-picker>
                </o-form-field>
            </div>
        </div>

        <div class="p-8">
            <button
                class="button button-green"
                :class="{ 'loading': isProcessing }"
            >Save</button>
        </div>
    </form>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import formMixin from '@js/mixins/form';

    export default {
        mixins: [ formMixin ],

        data() {
            return {
                form: {
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    avatar: null
                }
            }
        },

        computed: {
            ...mapGetters({
                authedUser: 'user/data'
            }),

            isEditingAdmin() {
                return this.item && this.item.username === 'admin';
            },

            isEditingSelf() {
                return this.authedUser.id == this.$route.params.id;
            }
        },

        watch: {
            item(item) {
                this.form = {
                    name: item.name,
                    username: item.username,
                    email: item.email,
                    password: null,
                    avatar: item.avatar ? item.avatar.id : null
                };
            }
        },

        methods: {
            ...mapMutations({
                updateAuthedUser: 'user/update'
            }),

            onSuccess() {
                if (this.isEditingSelf) {
                    this.updateAuthedUser({
                        name: this.form.name,
                        avatar: this.form.avatar
                    });
                }
                
                this.$router.push({ name: 'users.index' });
            }
        }
    }
</script>
