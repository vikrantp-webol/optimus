<template>
    <section>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>

                    <th>Email</th>

                    <th>Username</th>

                    <th class="narrow">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr :key="user.id" v-for="user in users">
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
                            <icon icon="pencil-alt"></icon>
                        </router-link>

                        <a
                            v-if="user.username !== 'admin'"
                            class="icon medium"
                            @click="$refs.confirm.open(user)"
                        >
                            <icon icon="trash-alt"></icon>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <o-confirmation
            ref="confirm"
            @confirm="deleteUser"
            button-class="button-red"
            button-text="Delete"
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
                users: []
            }
        },

        created() {
            this.setTitle('Manage users');

            this.fetchUsers();
        },

        methods: {
            fetchUsers(params = {}) {
                this.$loader.startLoading('primary.admin-users');

                axios.get('/api/admin-users', { params }).then(response => {
                    this.users = response.data.data;

                    this.$loader.stopLoading('primary.admin-users');
                });
            },

            deleteUser(item) {
                axios.delete('/api/admin-users/' + item.id).then(() => {
                    this.users = this.users.filter(({ id }) => id !== item.id);
                });
            }
        }
    }
</script>
