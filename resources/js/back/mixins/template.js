import { mapActions } from 'vuex';

export default {
    props: {
        contents: {
            type: Array,
            default: () => []
        },

        media: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            form: {}
        }
    },

    watch: {
        form: {
            deep: true,
            handler(form) {
                this.$emit('input', form);
            }
        }
    },

    mounted() {
        this.populateForm();
    },

    methods: {
        ...mapActions({
            clearPickerMedia: 'mediaManager/clearPickerMedia',
        }),

        getMediaIds(collectionName) {
            let media = this.media.filter(({ collection }) => collection === collectionName);
            
            return media.length ? media.map(({ id }) => id) : null;
        },

        getFirstMediaId(collectionName) {
            let media = this.media.find(({ collection }) => collection === collectionName);
        
            return media ? media.id : null;
        },

        getContent(name) {
            let content = this.contents.find(({ key }) => key === name);
        
            return content ? content.value : null;
        }
    }
}
