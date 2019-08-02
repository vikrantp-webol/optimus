<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>

                    <th>Email</th>

                    <th>Username</th>

                    <th class="narrow">
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>

                    <td>{{ user.email }}</td>

                    <td>{{ user.username }}</td>

                    <td class="actions">
                        <router-link
                            :to="{
                                name: 'users.edit',
                                params: { id: user.id }
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
            button-class="red"
            button-text="Delete"
            @confirm="deleteUser"
        >
            <template slot-scope="user">
                Are you sure you want to delete <strong>"{{ user.name }}"</strong>
            </template>
        </o-confirmation>
    </section>
</template>

<script>
export default {
    data() {
        return {
            users: [],
        };
    },

    created() {
        this.setTitle('Manage users');

        this.fetchUsers();
    },

    methods: {
        fetchUsers(params = {}) {
            this.$loader.startLoading('primary.admin-users');

            axios.get('/admin/api/users', { params }).then(response => {
                this.users = response.data.data;

                this.$loader.stopLoading('primary.admin-users');
            });
        },

        deleteUser(user) {
            axios.delete(`/admin/api/users/${user.id}`).then(() => {
                this.users = this.users.filter(({ id }) => id !== user.id);
            });
        },
    },
};
</script>
