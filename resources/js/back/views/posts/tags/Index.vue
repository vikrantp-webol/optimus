<template>
    <o-loader :loading="isLoading('primary.*')">
        <section v-if="! tags.length" class="p-8">
            <o-notification class="rounded">
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
                v-slot="{ item: tag }"
                button-class="red"
                button-text="Delete"
                @confirm="deleteTag"
            >
                Are you sure you want to delete tag<br>
                <strong>{{ tag.name }}</strong>
            </o-confirmation>
        </template>
    </o-loader>
</template>

<script>
import {
    getPostTags,
    deletePostTag,
} from '../../../util/api-client';

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
            this.startLoading('primary.tags');

            getPostTags().then(response => {
                this.tags = response.data.data;

                this.stopLoading('primary.tags');
            });
        },

        deleteTag(tag) {
            deletePostTag(tag.id);
            this.tags = this.tags.filter(({ id }) => id !== tag.id);
        },
    },
};
</script>
