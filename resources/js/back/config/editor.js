import { config } from '@optimuscms/editor';

let editorConfig = config.defaults();

editorConfig.file_picker_types = 'image';
editorConfig.file_picker_callback = callback => {
    Vue.mediaManager.open({
        limit: 1,
        accept: Vue.mediaManager.imageExtensions()
    });

    Vue.mediaManager.onMediaSelected(mediaIds => {
        let image = Vue.mediaManager.getActiveMedia(mediaIds[0]);

        callback(image.url, {
            alt: image.name
        });
    });
};

export default editorConfig;
