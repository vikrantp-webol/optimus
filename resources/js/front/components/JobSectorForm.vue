<template>
    <form @submit.prevent="submit">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label for="job_sector" class="is-hidden">Select Job Sector...</label>

                    <div class="control">
                        <div class="select is-fullwidth">
                            <select id="job_sector" v-model="value">
                                <option value="" selected>Select Job Sector...</option>
                                <option :value="sector.slug" :key="sector.id" v-for="sector in sectors">{{ sector.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field">
            <div class="control has-text-centered">
                <button class="button is-secondary">View Sector</button>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        props: {
            sectors: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                value: ''
            }
        },

        methods: {
            submit() {
                document.location.href = '/jobs/sectors' + (this.value ? '/' + this.value : '');
            }
        }
    }
</script>
