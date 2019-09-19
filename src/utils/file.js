export function getFileName(url) {
    return url.substring(url.lastIndexOf('/')+1);
}