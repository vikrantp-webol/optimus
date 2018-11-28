<template>
    <div>
        <o-errors
            v-if="anyErrors"
            class="mb-4 rounded"
            :errors="errors"
        ></o-errors>
        
        <form @submit.prevent="submit">
            <div class="mb-4">
                <label for="Username" class="hidden">Username</label>

                <o-input
                    id="username"
                    v-model="form.username"
                    required
                    placeholder="Username"
                ></o-input>
            </div>

            <div class="mb-4">
                <label for="Password" class="hidden">Password</label>

                <o-input
                    id="password"
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="Password"
                ></o-input>
            </div>
            
            <button
                type="submit"
                class="button button-primary w-full"
                :class="{ 'loading': isProcessing }"
            >Login</button>
        </form>
    </div>
</template>

<script>
    import formMixin from '@back/mixins/form';

    export default {
        mixins: [ formMixin ],

        data() {
            return  {
                form: {
                    username: '',
                    password: ''
                }
            }
        },

        methods: {
            onSuccess(response) {
                let data = response.data;

                this.$auth.setToken(data.access_token);
                this.$auth.setUser(data.user);

                this.$emit('login');
            }
        }
    }
</script>
