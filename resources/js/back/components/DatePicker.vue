<template>
    <div class="field has-addons">
        <div class="control">
            <span class="button is-static">
                <span class="icon">
                    <icon icon="calendar-alt"></icon>
                </span>
            </span>
        </div>

        <div class="control is-expanded">
            <input
                :id="id"
                ref="picker"
                type="text"
                class="input"
                v-model="newValue"
                :required="required"
            >
        </div>
    </div>
</template>

<script>
    import flatpickr from 'flatpickr';
    require('flatpickr/dist/flatpickr.css');

    export default {
        props: {
            value: {
                default: null
            },

            id: {
                type: String,
                required: true
            },

            required: {
                type: Boolean,
                default: false
            },

            format: {
                type: String,
                default: 'F j, Y - h:i K'
            }
        },

        data() {
            return  {
                flatpickr: null,
                
                newValue: this.value
            }
        },

        watch: {
            value(value) {
                this.newValue = value;

                this.flatpickr.setDate(value, true, 'Y-m-d H:i:S');
            },

            newValue(value) {
                this.$emit('input', value);
            }
        },

        mounted() {
            this.flatpickr = flatpickr(this.$refs.picker, {
                altInput: true,
                enableTime: true,
                altFormat: this.format,
                dateFormat: 'Y-m-d H:i:S'
            });
        }
    }
</script>
