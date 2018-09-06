<template>
    <div ref="dropdown" class="dropdown is-primary" :class="{ 'is-active': isActive }">
        <div class="dropdown-trigger" @click="isActive = ! isActive">
            <slot name="button" class="button is-primary">
                <span>Dropdown</span>
                
                <span class="icon is-small">
                    <i class="fa fa-angle-down"></i>
                </span>
            </slot>
        </div>
        
        <div class="dropdown-menu" @click="isActive = false">
            <div class="is-scrollable">
                <div class="dropdown-content">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false
            }
        },

        created() {
            ['click','touchstart'].forEach(event => {
                document.addEventListener(event, this.close);
            });
        },

        destroyed() {
            ['click','touchstart'].forEach(event => {
                document.removeEventListener(event, this.close);
            });
        },

        methods: {
            close(event) {
                if (
                    (this.$refs.dropdown !== event.target)
                    && ! this.$refs.dropdown.contains(event.target)
                ) {
                    this.isActive = false;
                }
            }
        }
    }
</script>
