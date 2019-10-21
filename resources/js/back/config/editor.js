import store from '../store';
import { config } from '@optimuscms/editor';
import { imageExtensions } from '@optimuscms/media-manager';

config.onBeforeDestroy = function() {
    store.dispatch('mediaManagerPickers/clearPickerMediaIds', this.id);
};

config.file_picker_types = 'image';
config.file_picker_callback = function(callback) {
    store.dispatch('mediaManagerPickers/setPickerMediaIds', {
        pickerId: this.id,
        mediaIds: [],
    });

    store.dispatch('mediaManager/openMediaManager', {
        limit: 1,
        pickerId: this.id,
        acceptedExtensions: imageExtensions,
    });

    store.watch((state, getters) => {
        return getters['mediaManagerPickers/getPickerMedia'](this.id);
    }, selectedMedia => {
        if (selectedMedia.length) {
            const image = selectedMedia[0];

            callback(image.url, {
                alt: image.alt_text || image.name,
            });
        }
    }, { deep: true });
};

export default config;
