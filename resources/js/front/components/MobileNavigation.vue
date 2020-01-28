<template>
    <div class="mobile-navigation lg:hidden">
        <div
            class="mobile-navigation-background"
            @click="$emit('close')"
        />

        <div class="mobile-navigation-content container px-0 sm:px-4 md:px-8">
            <ul class="mobile-nav">
                <slot />
            </ul>
        </div>
    </div>
</template>
