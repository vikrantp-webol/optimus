import { config } from '@optimuscms/editor';
import store from '../store';

config.onBeforeDestroy = function() {
    store.dispatch('mediaManager/clearPickerMedia', this.id);
};

config.file_picker_types = 'image';
config.file_picker_callback = function(callback) {
    store.dispatch('mediaManager/setPickerMedia', {
        pickerId: this.id,
        media: [],
    });

    store.dispatch('mediaManager/open', {
        pickerId: this.id,
        limit: 1,
        acceptedExtensions: store.getters['mediaManager/imageExtensions'],
    });

    store.watch(state => {
        return state.mediaManager.selectedMedia[this.id];
    }, selectedMedia => {
        if (selectedMedia.length) {
            let image = selectedMedia[0];

            callback(image.url, {
                alt: image.name,
            });
        }
    }, { deep: true });
};

export default config;
