import { config } from '@optimuscms/editor';
import store from '@js/store';

let editorConfig = config.defaults();

editorConfig.file_picker_types = 'image';
editorConfig.file_picker_callback = callback => {
    store.dispatch('mediaManager/setPickerMedia', {
        pickerId: 'editor',
        media: []
    });

    store.dispatch('mediaManager/open', {
        pickerId: 'editor',
        limit: 1,
        acceptedExtensions: store.getters['mediaManager/imageExtensions']
    });

    store.watch(state => {
        return state.mediaManager.selectedMedia['editor'];
    }, selectedMedia => {
        if (selectedMedia.length) {
            let image = selectedMedia[0];

            callback(image.url, {
                alt: image.name
            });
        }
    }, { deep: true });
};

export default editorConfig;
