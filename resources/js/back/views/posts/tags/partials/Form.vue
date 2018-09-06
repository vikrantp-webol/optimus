<template>
    <form @submit.prevent="submit">
        <errors :errors="form.errors.all()" v-if="form.errors.any()"></errors>

        <div class="has-border-bottom p-4">
            <div class="columns">
                <div class="column is-12 is-8-fullhd">
                    <!-- Title -->
                    <o-form-field input="name" label="Name" required>
                        <o-input
                            id="name"
                            v-model="form.name"
                            required
                        ></o-input>
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
    import formMixin from '../../../../mixins/form';

    export default {
        mixins: [ formMixin ],

        data() {
            return {
                form: new Form({
                    name: '',
                }),
            }
        },

        watch: {
            item(item) {
                this.form.populate({
                    name: item.name
                });
            }
        },

        methods: {
            submit() {
                this.form[this.method](this.action)
                    .then(response => {
                        this.$router.push({
                            name: 'posts.tags.index'
                        });
                    });
            }
        }
    }
</script>
