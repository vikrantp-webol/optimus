<template>
    <o-loader :loading="isLoading('primary.*')">
        <table class="table">
            <thead>
                <tr>
                    <th>
                        Name
                    </th>

                    <th>
                        Email
                    </th>

                    <th>
                        Username
                    </th>

                    <th class="narrow">
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>
                        {{ user.name }}
                    </td>

                    <td>
                        {{ user.email }}
                    </td>

                    <td>
                        {{ user.username }}
                    </td>

                    <td class="actions">
                        <router-link
                            :to="{
                                name: 'admin-users.edit',
                                params: { id: user.id },
                            }"
                            class="icon medium"
                        >
                            <icon icon="pencil-alt" />
                        </router-link>

                        <a
                            v-if="user.username !== 'admin'"
                            class="icon medium"
                            @click="openConfirmation(user)"
                        >
                            <icon icon="trash-alt" />
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <o-confirmation
            v-slot="{ item: user }"
            button-class="red"
            button-text="Delete"
            @confirm="deleteUser"
        >
            Are you sure you want to delete user<br>

            <strong>
                {{ user.name }}
            </strong>
        </o-confirmation>
    </o-loader>
</template>

<script>
import { getAdminUsers, deleteAdminUser } from '../routes/api';

export default {
    data() {
        return {
            users: [],
        };
    },

    created() {
        this.setTitle('Manage Admin Users');

        this.fetchUsers();
    },

    methods: {
        fetchUsers(params = {}) {
            this.startLoading('primary.admin-users');

            getAdminUsers(params).then(response => {
                this.users = response.data.data;

                this.stopLoading('primary.admin-users');
            });
        },

        deleteUser(user) {
            deleteAdminUser(user.id);

            this.users = this.users.filter(({ id }) => {
                return id !== user.id;
            });
        },
    },
};
</script>
