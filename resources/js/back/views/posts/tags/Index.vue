<template>
    <div>
        <section>
            <table class="table is-hoverable is-fullwidth is-listing">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th class="is-narrow has-text-centered">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="tag.id" v-for="tag in tags">
                        <td>{{ tag.name }}</td>
                        <td class="has-actions">
                            <router-link
                                class="icon is-medium"
                                :to="{ name: 'posts.tags.edit', params: { id: tag.id } }"
                            >
                                <icon icon="pencil-alt"></icon>
                            </router-link>

                            <a class="icon is-medium" @click="$refs.confirm.open(tag)">
                                <icon icon="trash-alt"></icon>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        
        <o-confirm
            ref="confirm"
            type="danger"
            @confirm="deleteTag">
                <template slot="confirmButtonText">Delete</template>
                
                <template slot-scope="tag">
                    Are you sure you want to delete <strong>"{{ tag.name }}"</strong>
                </template>
        </o-confirm>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tags: []
            }
        },

        created() {
            this.fetchTags();
        },

        methods: {
            fetchTags() {
                this.$loader.start('tags');

                axios.get('/api/post-tags').then(response => {
                    this.tags = response.data.data;

                    this.$loader.stop('tags');
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
