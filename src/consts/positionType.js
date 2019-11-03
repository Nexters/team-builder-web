const positionTypeMap = {
    'DEVELOPER': '개발자',
    'DESIGNER': '디자이너'
}

export function getPositionName(position) {
    return positionTypeMap[position];
}
