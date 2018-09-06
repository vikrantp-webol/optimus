<template>
    <ul>
        <o-sub-nav-item
            :to="{ name: 'users.index' }"
        >Manage users</o-sub-nav-item>

        <o-sub-nav-item
            :to="{ name: 'users.create' }"
        >Add user</o-sub-nav-item>
    </ul>
</template>
