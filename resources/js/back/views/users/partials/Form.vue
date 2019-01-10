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

                <template v-if="! isEditingAdmin">
                    <!-- Username -->
                    <o-form-field input="username" label="Username" required>
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
                        ></o-input>
                    </o-form-field>
                </template>
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
    import { mapMutations } from 'vuex';
    import formMixin from '@optimuscms/core/src/mixins/form';

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
            isEditingAdmin() {
                return this.item && this.item.username === 'admin';
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
                updateUser: 'user/updateUser'
            }),

            onSuccess() {
                this.updateUser({
                    name: this.form.name,
                    avatar: this.form.avatar
                });
                
                this.$router.push({ name: 'users.index' });
            }
        }
    }
</script>
