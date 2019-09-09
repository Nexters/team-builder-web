import {GET, PUT} from './index';

export function getSession({sessionNumber}) {
    return GET(`apis/sessions/${sessionNumber}`);
}

export function putSession({sessionNumber, body}) {
    return PUT(`apis/sessions/${sessionNumber}`, body);
}
