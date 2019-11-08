import {GET, POST, PUT, DELETE} from '@/api/index';

export function getIdeas() {
    return GET('apis/ideas');
}

export function getIdea(ideaId) {
    return GET(`apis/ideas/${ideaId}`);
}

export function createNewIdea(newIdea) {
    return POST('/apis/ideas', {
        content: newIdea.content,
        file: newIdea.file,
        sessionId: newIdea.sessionId,
        tags: newIdea.tags,
        title: newIdea.title,
        type: newIdea.type,
    })
}

export function modifyIdea(idea) {
    return PUT(`/apis/ideas/${idea.ideaId}`, {
        content: idea.content,
        file: idea.file,
        sessionId: idea.sessionId,
        tags: idea.tags,
        title: idea.title,
        type: idea.type,
    })
}

export function setFavorite(ideaId) {
  return POST('/apis/favorites', {
    ideaId: ideaId
  })
}

export function deleteFavorite(ideaId) {
  return DELETE(`/apis/favorites/${ideaId}`)
}

export function updateIdea(idea) {
  return PUT(`/apis/ideas/${idea.ideaId}`, {
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
  return DELETE(`/apis/ideas/${ideaId}`);
}

export function putVoteIdea({ideaIds}) {
    return PUT(`/apis/ideas/vote?ideaIds=${ideaIds}`);
}
