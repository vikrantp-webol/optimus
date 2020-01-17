<template>
    <o-notification is-error>
        <template v-for="errorGroup in errors">
            <p v-for="(error, index) in errorGroup" :key="index">
                {{ error }}
            </p>
        </template>
    </o-notification>
</template>

<script>
export default {
    props: {
        errors: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
