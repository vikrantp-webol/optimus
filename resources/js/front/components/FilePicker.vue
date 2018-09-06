<template>
    <div class="file has-name is-right is-primary">
        <label class="file-label">
            <input
                :id="id"
                ref="file"
                type="file"
                :name="name"
                @change="select"
                class="file-input"
                :required="required"
            >

            <span class="file-cta">
                <span class="file-label">Upload</span>
            </span>

            <span class="file-name">
                {{ fileName }}
            </span>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            required: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                fileName: 'No file selected...'
            }
        },

        methods: {
            select(event) {
                this.fileName = event.target.files[0].name;
            }
        }
    }
</script>
