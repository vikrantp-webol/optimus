<template>
    <div>
        <section v-if="! tags.length" class="p-8">
            <o-notification class="bg-blue-300 rounded">
                You haven't added any tags yet,

                <router-link
                    :to="{ name: 'posts.tags.create' }"
                    class="underline"
                >
                    click here to add one
                </router-link>.
            </o-notification>
        </section>

        <template v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>

                        <th class="narrow">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="tag in tags" :key="tag.id">
                        <td>{{ tag.name }}</td>

                        <td class="actions">
                            <router-link
                                :to="{
                                    name: 'posts.tags.edit',
                                    params: { id: tag.id }
                                }"
                                class="icon medium"
                            >
                                <icon icon="pencil-alt" />
                            </router-link>

                            <a class="icon medium" @click="openConfirmation(tag)">
                                <icon icon="trash-alt" />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <o-confirmation
                button-class="red"
                button-text="Delete"
                @confirm="deleteTag"
            >
                <template slot-scope="tag">
                    Are you sure you want to delete <strong>"{{ tag.name }}"</strong>
                </template>
            </o-confirmation>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tags: [],
        };
    },

    created() {
        this.setTitle('News categories');

        this.fetchTags();
    },

    methods: {
        fetchTags() {
            this.$loader.startLoading('primary.tags');

            axios.get('/admin/api/post-tags').then(response => {
                this.tags = response.data.data;

                this.$loader.stopLoading('primary.tags');
            });
        },

        deleteTag(tag) {
            axios.delete(`/admin/api/post-tags/${tag.id}`).then(() => {
                this.tags = this.tags.filter(({ id }) => id !== tag.id);
            });
        },
    },
};
</script>
