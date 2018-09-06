<template>
    <ul>
        <o-sub-nav-item
            :to="{ name: 'posts.index' }"
        >Manage news</o-sub-nav-item>

        <o-sub-nav-item
            :to="{ name: 'posts.create' }"
        >Add news article</o-sub-nav-item>

        <li class="is-divider"></li>

        <o-sub-nav-item
            :to="{ name: 'posts.tags.index' }"
        >Manage categories</o-sub-nav-item>

        <o-sub-nav-item
            :to="{ name: 'posts.tags.create' }"
        >Add category</o-sub-nav-item>
    </ul>
</template>
