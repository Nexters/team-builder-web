import {GET, PUT} from './index';

export function getSession({sessionNumber}) {
    return GET(`apis/sessions/${sessionNumber}`);
}

export function putSession({sessionNumber, body}) {
    // Need to refactoring after modify to api

    const headers = {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
    };

    return PUT(`apis/sessions/${sessionNumber}`, body, {'Content-Type': 'application/json'});
}
