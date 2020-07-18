String.prototype.setIdentity = function (str, font, behind) {
    // 脱敏部分具体的字符串长度
    let len = str.length - font - behind;
    let temp = '';
    for (let i = 0; i < len; i++) {
        temp += '*'
    }
    return str.substr(0, font) + temp + str.substr(str.length - behind)
}