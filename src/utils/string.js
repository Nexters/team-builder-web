String.format = function () {
    let s = arguments[0];
    for (let i = 0; i < arguments.length - 1; i += 1) {
        let reg = new RegExp('\\{' + i + '\\}', 'gm');
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};
