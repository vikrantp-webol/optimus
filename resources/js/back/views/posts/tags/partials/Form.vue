<template>
    <form @submit.prevent="submit">
        <o-errors v-if="anyErrors" :errors="errors" />

        <div class="p-8 border-b border-grey-400">
            <div class="max-w-3xl">
                <!-- Name -->
                <o-form-field input="name" label="Name" required>
                    <o-input
                        id="name"
                        v-model="form.name"
                        required
                    />
                </o-form-field>
            </div>
        </div>

        <div class="p-8">
            <button
                class="button green"
                :class="{ 'loading': isProcessing }"
            >
                Save
            </button>
        </div>
    </form>
</template>

<script>
import formMixin from '../../../../mixins/form';

export default {
    mixins: [ formMixin ],

    data() {
        return {
            form: {
                name: '',
            },
        };
    },

    watch: {
        item(item) {
            this.form = {
                name: item.name,
            };
        },
    },

    methods: {
        onSuccess() {
            this.$router.push({
                name: 'posts.tags.index',
            });
        },
    },
};
</script>
