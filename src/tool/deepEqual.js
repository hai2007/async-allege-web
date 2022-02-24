import { isObject } from '@hai2007/tool/type';
let isEqual = (val1, val2) => {
    if (isObject(val1) && isObject(val2)) {

        for (let key1 in val1) {
            if (!isEqual(val1[key1], val2[key1])) {
                return false;
            }
        }

        for (let key2 in val2) {
            if (!isEqual(val1[key2], val2[key2])) {
                return false;
            }
        }

    } else {
        return val1 == val2;
    }

    return true;
};

export default function (val1, val2) {
    return isEqual(val1, val2);
};