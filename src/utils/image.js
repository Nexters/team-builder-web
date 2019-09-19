export function getImgUrl(filename) {
    const images = require.context('../assets/img/', false, /\.png$/)
    return images('./' + filename + ".png")
}