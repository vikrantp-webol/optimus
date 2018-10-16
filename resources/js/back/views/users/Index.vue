<template>
    <section>
        <table class="table is-hoverable is-fullwidth is-listing">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th class="is-narrow has-text-centered">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr :key="user.id" v-for="user in users">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.username }}</td>
                    <td class="has-actions">
                        <router-link class="icon is-medium" :to="{ name: 'users.edit', params: { id: user.id } }">
                            <icon icon="pencil-alt"></icon>
                        </router-link>

                        <a class="icon is-medium" @click="$refs.confirm.open(user)">
                            <icon icon="trash-alt"></icon>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>

        <o-confirm
            ref="confirm"
            type="danger"
            @confirm="deleteUser">
                <template slot="confirmButtonText">Delete</template>
                
                <template slot-scope="user">
                    Are you sure you want to delete <strong>"{{ user.name }}"</strong>
                </template>
        </o-confirm>
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
            this.fetchUsers();
        },

        methods: {
            fetchUsers(params = {}) {
                this.$loader.startLoading('users');

                axios.get('/api/users', { params }).then(response => {
                    this.users = response.data.data;

                    this.$loader.stopLoading('users');
                });
            },

            deleteUser(item) {
                axios.delete('/api/users/' + item.id).then(() => {
                    this.users = this.users.filter(({ id }) => id !== item.id);
                });
            }
        }
    }
</script>
