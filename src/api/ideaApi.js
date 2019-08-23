import api from './index';

export function getIdea(ideaId) {

    //TODO: 공통으로 헤더 설정해주거나 state에서 가져와야함
    const token = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAE3OTQvCMAyA4f-Ss4VlH93HTXS3oaLOgyLSrhkU3DraDgTxv9t58pY8vIG8QTsHFZjOm4lsDyvQwkOFGedRVkRJsoJ51iokPFGpQJJM5qRYKhFZoXjHBPaZLHlBcU7L-dJ6cj7Moxjob6OXJ-t28yDJBi7LgNY8l-S4b-pHe6qPgSbjtNdmDLytL3WzP_y4syQ8qXX4DuIISxYVDPMzplWKVYbXW3ve3OHzBToSYkjSAAAA.yWB7l1WJ0Wmdz3c2qGNhJFIE92cmaRqVhkipk49GMYU'
    Object.assign(api.defaults, {headers: {authorization: token}});

    return api.get(`apis/ideas/${ideaId}`);
}

export function createNewIdea(newIdea) {

    //TODO: 공통으로 헤더 설정해주거나 state에서 가져와야함
    const token = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAE3OTQvCMAyA4f-Ss4VlH93HTXS3oaLOgyLSrhkU3DraDgTxv9t58pY8vIG8QTsHFZjOm4lsDyvQwkOFGedRVkRJsoJ51iokPFGpQJJM5qRYKhFZoXjHBPaZLHlBcU7L-dJ6cj7Moxjob6OXJ-t28yDJBi7LgNY8l-S4b-pHe6qPgSbjtNdmDLytL3WzP_y4syQ8qXX4DuIISxYVDPMzplWKVYbXW3ve3OHzBToSYkjSAAAA.yWB7l1WJ0Wmdz3c2qGNhJFIE92cmaRqVhkipk49GMYU'
    Object.assign(api.defaults, {headers: {authorization: token}});

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

  //TODO: 공통으로 헤더 설정해주거나 state에서 가져와야함
  const token = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAE3OTQvCMAyA4f-Ss4VlH93HTXS3oaLOgyLSrhkU3DraDgTxv9t58pY8vIG8QTsHFZjOm4lsDyvQwkOFGedRVkRJsoJ51iokPFGpQJJM5qRYKhFZoXjHBPaZLHlBcU7L-dJ6cj7Moxjob6OXJ-t28yDJBi7LgNY8l-S4b-pHe6qPgSbjtNdmDLytL3WzP_y4syQ8qXX4DuIISxYVDPMzplWKVYbXW3ve3OHzBToSYkjSAAAA.yWB7l1WJ0Wmdz3c2qGNhJFIE92cmaRqVhkipk49GMYU'
  Object.assign(api.defaults, {headers: {authorization: token}});

  return api.post('/apis/favorites', {
    ideaId: ideaId
  })
}

export function deleteFavorite(ideaId) {
  //TODO: 공통으로 헤더 설정해주거나 state에서 가져와야함
  const token = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAE3OTQvCMAyA4f-Ss4VlH93HTXS3oaLOgyLSrhkU3DraDgTxv9t58pY8vIG8QTsHFZjOm4lsDyvQwkOFGedRVkRJsoJ51iokPFGpQJJM5qRYKhFZoXjHBPaZLHlBcU7L-dJ6cj7Moxjob6OXJ-t28yDJBi7LgNY8l-S4b-pHe6qPgSbjtNdmDLytL3WzP_y4syQ8qXX4DuIISxYVDPMzplWKVYbXW3ve3OHzBToSYkjSAAAA.yWB7l1WJ0Wmdz3c2qGNhJFIE92cmaRqVhkipk49GMYU'
  Object.assign(api.defaults, {headers: {authorization: token}});

  return api.delete(`/apis/favorites/${ideaId}`)
}

export function updateIdea(idea) {
  const token = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAE3OTQvCMAyA4f-Ss4VlH93HTXS3oaLOgyLSrhkU3DraDgTxv9t58pY8vIG8QTsHFZjOm4lsDyvQwkOFGedRVkRJsoJ51iokPFGpQJJM5qRYKhFZoXjHBPaZLHlBcU7L-dJ6cj7Moxjob6OXJ-t28yDJBi7LgNY8l-S4b-pHe6qPgSbjtNdmDLytL3WzP_y4syQ8qXX4DuIISxYVDPMzplWKVYbXW3ve3OHzBToSYkjSAAAA.yWB7l1WJ0Wmdz3c2qGNhJFIE92cmaRqVhkipk49GMYU'
  Object.assign(api.defaults, {headers: {authorization: token}});

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
  const token = 'eyJhbGciOiJIUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAE3OTQvCMAyA4f-Ss4VlH93HTXS3oaLOgyLSrhkU3DraDgTxv9t58pY8vIG8QTsHFZjOm4lsDyvQwkOFGedRVkRJsoJ51iokPFGpQJJM5qRYKhFZoXjHBPaZLHlBcU7L-dJ6cj7Moxjob6OXJ-t28yDJBi7LgNY8l-S4b-pHe6qPgSbjtNdmDLytL3WzP_y4syQ8qXX4DuIISxYVDPMzplWKVYbXW3ve3OHzBToSYkjSAAAA.yWB7l1WJ0Wmdz3c2qGNhJFIE92cmaRqVhkipk49GMYU'
  Object.assign(api.defaults, {headers: {authorization: token}});

  return api.delete(`/apis/ideas/${ideaId}`);
}