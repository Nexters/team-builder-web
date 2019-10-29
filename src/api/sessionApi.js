import {GET, POST, PUT, DELETE} from './index';

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

export function getLatestSession() {
  return GET(`apis/sessions/latest`);
}

export function createSession(newSessionData) {
    return POST(`apis/sessions`, {
        ...newSessionData
    })
}

export function deleteSession({sessionNumber}) {
    return DELETE(`apis/sessions/${sessionNumber}`);
}
