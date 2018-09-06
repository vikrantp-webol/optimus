<template>
    <div>
        <div class="tabs is-toggle is-fullwidth is-grey mb-0">
            <ul>
                <li :class="{ 'is-active': isOpen('responsibilities') }" @click="open('responsibilities')">
                    <a>Responsibilities</a>
                </li>

                <li :class="{ 'is-active': isOpen('requirements') }" @click="open('requirements')">
                    <a>Requirements</a>
                </li>
            </ul>
        </div>

        <div class="tabs-content background is-grey-lighter px-4 pt-3 pb-2 mb-4-desktop">
            <div class="content">
                <slot name="responsibilities" v-if="isOpen('responsibilities')"></slot>
                <slot name="requirements" v-if="isOpen('requirements')"></slot>
            </div>
        </div>
    </div>
</template>



<script>
    export default {
        props: {
            responsibilities: String,
            requirements: String
        },

        data() {
            return {
                active: 'responsibilities',
            }
        },

        methods: {
            open(tab) {
                this.active = tab;
            },

            isOpen(tab) {
                return this.active === tab;
            }
        }
    }
</script>
