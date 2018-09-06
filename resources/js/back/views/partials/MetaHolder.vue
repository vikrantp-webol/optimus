<template>
    <div class="card">
        <a class="card-header is-unselectable" @click="isOpen = ! isOpen">
            <span class="card-header-title">
                <h3 class="title is-size-5 has-text-weight-light">Meta data</h3>
            </span>

            <span class="card-header-icon">
                <span class="icon">
                    <icon icon="angle-down"></icon>
                </span>
            </span>
        </a>

        <div 
            class="card-content"
            :class="isOpen
                ? null
                : 'is-hidden-touch is-hidden-desktop-only is-hidden-widescreen-only'
            "
        >
            <!-- Meta title -->
            <o-form-field input="meta_title" label="Meta title">
                <o-input
                    id="meta_title"
                    v-model="form.title"
                ></o-input>
            </o-form-field>

            <!-- Meta description -->
            <o-form-field input="meta_description" label="Meta description">
                <o-input
                    id="meta_description"
                    type="textarea"
                    v-model="form.description"
                ></o-input>
            </o-form-field>

            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Object,
                default: () => {}
            }
        },

        data() {
            return {
                isOpen: false,

                form: {
                    title: '',
                    description: ''
                }
            }
        },

        watch: {
            value: {
                deep: true,
                handler() {
                    this.populateForm();
                }
            },

            form: {
                deep: true,
                handler(form) {
                    this.$emit('input', form);
                }
            }
        },

        mounted() {
            this.populateForm();
        },

        methods: {
            populateForm() {
                this.form.title = this.value.title;
                this.form.description = this.value.description;
            }
        }
    }
</script>
