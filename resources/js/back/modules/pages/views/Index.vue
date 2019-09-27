<template>
    <o-loader :loading="isLoading('primary.*')">
        <section v-if="! pages.length" class="p-8">
            <o-notification class="rounded">
                You haven't added any pages yet,

                <router-link
                    :to="{ name: 'pages.create' }"
                    class="underline"
                >
                    click here to add one
                </router-link>.
            </o-notification>
        </section>

        <table v-else class="table">
            <thead>
                <tr>
                    <th class="narrow" />

                    <th>
                        Title
                    </th>

                    <th>
                        Path
                    </th>

                    <th>
                        Sub pages
                    </th>

                    <th class="narrow">
                        Actions
                    </th>
                </tr>
            </thead>

            <o-loader tag="tbody" :loading="isLoading('secondary.*')" transition-name="flip-list">
                <tr v-for="page in pages" :key="page.id" :class="{ 'draft': ! page.is_published }">
                    <td class="actions">
                        <a
                            class="icon"
                            :class="{
                                'pointer-events-none opacity-50': ! canMoveItemUp(pages, page.id)
                            }"
                            @click="moveItemUp(pages, page.id)"
                        >
                            <icon icon="angle-up" />
                        </a>

                        <a
                            class="icon"
                            :class="{
                                'pointer-events-none opacity-50': ! canMoveItemDown(pages, page.id)
                            }"
                            @click="moveItemDown(pages, page.id)"
                        >
                            <icon icon="angle-down" />
                        </a>
                    </td>

                    <td>
                        {{ page.title }}
                    </td>

                    <td>
                        /{{ page.path }}
                    </td>

                    <td>
                        <a @click="applyFilter('parent', page.id)">
                            Sub pages ({{ page.children_count }})
                        </a>
                    </td>

                    <td class="actions">
                        <router-link
                            :to="{
                                name: 'pages.edit',
                                params: { id: page.id },
                            }"
                            class="icon medium"
                        >
                            <icon icon="pencil-alt" />
                        </router-link>

                        <a
                            v-if="page.is_deletable"
                            class="icon medium"
                            @click="openConfirmation(page)"
                        >
                            <icon icon="trash-alt" />
                        </a>
                    </td>
                </tr>
            </o-loader>
        </table>

        <o-confirmation
            v-slot="{ item: page }"
            button-class="red"
            button-text="Delete"
            @confirm="deletePage"
        >
            Are you sure you want to delete page<br>
            <strong>{{ page.title }}</strong>
        </o-confirmation>
    </o-loader>
</template>

<script>
import { listingMixin, sortableMixin } from '@optimuscms/theme';

import {
    getPages,
    movePage,
    deletePage,
} from '../routes/api';

export default {
    mixins: [
        listingMixin,
        sortableMixin,
    ],

    data() {
        return {
            pages: [],

            filters: {
                parent: null,
            },
        };
    },

    created() {
        this.setTitle('Manage Pages');

        this.startLoading('primary.pages');

        this.fetchPages(this.query).then(() => {
            this.stopLoading('primary.pages');
        });
    },

    methods: {
        fetchPages(queryParams = {}) {
            if (! queryParams.hasOwnProperty('parent')) {
                queryParams['parent'] = 'root';
            }

            return getPages(queryParams).then(response => {
                this.pages = response.data.data;
            });
        },

        onFilter(queryParams) {
            this.startLoading('secondary.pages');

            this.fetchPages(queryParams).then(() => {
                this.stopLoading('secondary.pages');
            });
        },

        move(id, from, to) {
            movePage(id, this.getMoveDirection(from, to));

            this.pages = this.moveItem(this.pages, from, to);
        },

        deletePage(page) {
            deletePage(page.id);

            this.pages = this.pages.filter(({ id }) => id !== page.id);
        },
    },
};
</script>
