import Editor, { config as editorConfig } from '@optimuscms/editor';

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

Vue.use(Editor, {
    apiKey: 'i9k078qcvbqg8d6gffh58fkky46ltc5d8a3rb7igrn5h6q3i'
});
