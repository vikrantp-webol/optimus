<template>
    <menu-form />
</template>

<script>
import MenuForm from './partials/Form';

export default {
    components: { MenuForm },

    created() {
        this.setTitle('Add Menu');
    },
};
</script>
