<template>
    <form @submit.prevent="submit">
        <o-errors :errors="form.errors.all()" v-if="form.errors.any()"></o-errors>

        <div class="has-border-bottom p-4">
            <div class="columns">
                <div class="column is-12 is-8-widescreen">
                    <!-- Name -->
                    <o-form-field input="name" label="Name" required>
                        <o-input
                            id="name"
                            label="Name"
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

                    <!-- Permissions -->
                    <o-form-field label="Permissions" v-if="! isEditingAdmin && ! isEditingSelf">
                        <div class="control my-1" :key="permission" v-for="(permission, index) in permissions">
                            <div class="field">
                                <o-checkbox
                                    :id="`permission_${index}`"
                                    :label="permission"
                                    class="is-capitalized"
                                    v-model="form.permissions"
                                    :checked-value="permission"
                                ></o-checkbox>
                            </div>
                        </div>
                        
                        <template slot="help">
                            User will have to re-authenticate for changes to take place.
                        </template>
                    </o-form-field>
                </div>
            </div>
        </div>

        <div class="p-4">
            <div class="field">
                <div class="control">
                    <button
                        class="button is-success"
                        :class="{ 'is-loading': form.processing }"
                    >Save</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    import Form from 'form-backend-validation';
    import formMixin from '../../../mixins/form';

    export default {
        mixins: [ formMixin ],

        data() {
            return {
                form: new Form({
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    permissions: []
                }),

                permissions: []
            }
        },

        computed: {
            isEditingAdmin() {
                return this.item && this.item.username === 'admin';
            },

            isEditingSelf() {
                return this.$route.params.hasOwnProperty('id') && this.$route.params.id == this.$auth.user().id;
            }
        },

        watch: {
            item(item) {
                this.form.populate({
                    name: item.name,
                    username: item.username,
                    email: item.email,
                    password: null,
                    permissions: item.permissions
                });
            }
        },

        created() {
            this.fetchPermissions();
        },

        methods: {
            fetchPermissions() {
                this.$loader.startLoading('permissions');

                axios.get('/api/user-permissions').then(response => {
                    this.permissions = response.data.data;

                    this.$loader.stopLoading('permissions');
                });
            },

            submit() {
                this.form[this.method](this.action)
                    .then(response => {
                        this.$router.push({
                            name: 'users.index'
                        });
                    });
            }
        }
    }
</script>
