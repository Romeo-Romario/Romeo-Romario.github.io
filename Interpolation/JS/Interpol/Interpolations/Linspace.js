export function linspace(start, end, num) {
    const step = (end - start) / (num - 1);
    return Array.from({ length: num }, (_, i) => start + step * i);
}


export function arr_count(func, X){
    return X.map(func);
}


