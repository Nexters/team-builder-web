import api from './index';
import {getAuthToken} from './LoginAPI';

export function getIdea(ideaId) {
    Object.assign(api.defaults, {headers: {authorization: getAuthToken()}});
    return api.get(`apis/ideas/${ideaId}`);
}

export function createNewIdea(newIdea) {
    Object.assign(api.defaults, {headers: {authorization: getAuthToken()}});
    return api.post('/apis/ideas', {
        content: newIdea.content,
        // file: '',
        sessionId: newIdea.sessionId,
        tags: newIdea.tags,
        title: newIdea.title,
        type: newIdea.type,
    })
}

export function setFavorite(ideaId) {
  Object.assign(api.defaults, {headers: {authorization: getAuthToken()}});
  return api.post('/apis/favorites', {
    ideaId: ideaId
  })
}

export function deleteFavorite(ideaId) {
  Object.assign(api.defaults, {headers: {authorization: getAuthToken()}});
  return api.delete(`/apis/favorites/${ideaId}`)
}

export function updateIdea(idea) {
  Object.assign(api.defaults, {headers: {authorization: getAuthToken()}});
  return api.put(`/apis/ideas/${idea.ideaId}`, {
    content: idea.content,
    file: idea.file,
    selected: true,
    sessionId: idea.sessionId,
    tags: idea.tags,
    title: idea.title,
    type: idea.type
  })
}

export function deleteIdea(ideaId) {
  Object.assign(api.defaults, {headers: {authorization: getAuthToken()}});
  return api.delete(`/apis/ideas/${ideaId}`);
}