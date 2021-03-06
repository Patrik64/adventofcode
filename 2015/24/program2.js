function arrSum(arr) {
    let ret = 0;
    for(let i = 0; i < arr.length; i++)
        ret += arr[i];
    return ret;
}

let input = [
1,
2,
3,
5,
7,
13,
17,
19,
23,
29,
31,
37,
41,
43,
53,
59,
61,
67,
71,
73,
79,
83,
89,
97,
101,
103,
107,
109,
113
];

let sum = arrSum(input);
let quarter = sum / 4;

let currQE = Number.MAX_SAFE_INTEGER;
for(var i = 0; i < 100000; i++) {
    input.sort(function() {return 0.5 - Math.random()});
    let a1 = input[0];
    let a2 = input[1];
    let a3 = input[2];
    let a4 = input[3];

    if(a1+a2+a3+a4 == quarter) {
        let QE = a1*a2*a3*a4;
        if(QE < currQE)
            currQE = QE;
    }
}

console.log(currQE);
