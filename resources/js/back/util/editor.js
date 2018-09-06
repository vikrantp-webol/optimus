import Editor, { styleFormats } from '@optimuscms/editor';
import store from '../store';

let index = styleFormats.findIndex(({ title }) => title == 'Inline Styles');

styleFormats[index].items.push({
    title: 'Button Secondary',
    classes: 'button is-secondary',
    selector: 'a'
});

Vue.use(Editor, {
    store,
    options: {
        apiKey: 'i9k078qcvbqg8d6gffh58fkky46ltc5d8a3rb7igrn5h6q3i',
        style_formats: styleFormats
    }
});
