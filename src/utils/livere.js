export function loadLivere({ideaId}) {
    const livereEl = document.getElementById('lv-container');
    if (livereEl) {
        const livereWrapEl = document.getElementById('livere-wrap');
        livereWrapEl.removeChild(livereEl);

        const newEl = document.createElement('div');
        newEl.setAttribute('id', 'lv-container');
        newEl.setAttribute('data-id', 'city');
        newEl.setAttribute('data-uid', 'MTAyMC81MDYyMS8yNzEwNA==');

        livereWrapEl.appendChild(newEl);
    }

    window.livereOptions = {
        refer: `idea-${ideaId}`,
    };
    (function (d, s) {
        var j, e = d.getElementsByTagName(s)[0];

        if (typeof LivereTower === 'function') {
            return;
        }

        j = d.createElement(s);
        j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
        j.async = true;

        e.parentNode.insertBefore(j, e);
    })(document, 'script');
}
