<template>
    <div class="p-10">
        <o-form-field label="Modals">
            <a class="button" @click="openConfirmation">Open confirmation</a>
            <a class="button" @click="openAlert">Open alert</a>
        </o-form-field>
        
        <o-form-field input="test" label="Editor testing">
            <editor id="test" v-model="testing"></editor>
        </o-form-field>

        <o-confirmation>
            Are you sure you want to perform this action
        </o-confirmation>

        <o-alert>
            Something has happened, just letting you know
        </o-alert>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';

    export default {
        data() {
            return {
                testing: ''
            }
        },
        
        created() {
            this.setTitle('Testing components');
        },

        methods: {
            ...mapActions({
                openConfirmation: 'confirmation/open'
            }),

            ...mapMutations({
                openAlert: 'alert/open'
            })
        }
    }
</script>
