<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>

                    <th class="narrow">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="tag.id" v-for="tag in tags">
                    <td>{{ tag.name }}</td>
                    
                    <td class="actions">
                        <router-link
                            :to="{
                                name: 'posts.tags.edit',
                                params: { id: tag.id }
                            }"
                            class="icon medium"
                        >
                            <icon icon="pencil-alt"></icon>
                        </router-link>

                        <a class="icon medium" @click="openConfirmation(tag)">
                            <icon icon="trash-alt"></icon>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <o-confirmation
            @confirm="deleteTag"
            button-class="button-red"
            button-text="Delete"
        >
            <template slot-scope="tag">
                Are you sure you want to delete <strong>"{{ tag.name }}"</strong>
            </template>
        </o-confirmation>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                tags: []
            }
        },

        created() {
            this.setTitle('News categories');

            this.fetchTags();
        },

        methods: {
            fetchTags() {
                this.$loader.startLoading('primary.tags');

                axios.get('/api/post-tags').then(response => {
                    this.tags = response.data.data;

                    this.$loader.stopLoading('primary.tags');
                });
            },

            deleteTag(item) {
                axios.delete('/api/post-tags/' + item.id).then(() => {
                    this.tags = this.tags.filter(({ id }) => id !== item.id);
                });
            }
        }
    }
</script>
