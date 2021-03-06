let fs = require('fs');
let input = fs.readFileSync('Day14.in', 'utf8');
let arr = input.split('\n');

function parseMask(str) {
    let idx = 0;
    let mask = str.substring(7);
    mask = mask.trim();
    let ret = [];
    for(let i = mask.length-1; i >=0; i--) {
        let ch = mask[i];
        if(ch === 'X')
            ret.push(-1);
        else if(ch === '0')
            ret.push(0);
        else if(ch === '1')
            ret.push(1);
        else {
            console.log('error!');
        }
    }
    return ret;
}

function parseMem(str) {
    let idx = 4;
    let loc = '';
    while(str[idx] !== ']') {
        loc += str[idx];
        idx++;
    }
    loc = loc.trim();
    idx += 3;

    let val = '';
    while(idx < str.length) {
        val += str[idx];
        idx++;
    }
    val = val.trim();
    let ret = { 'loc' : Number(loc), 'val' : Number(val) };
    return ret;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function numTo36(n) {
    let ret =[];
    for(let i = 0; i < 36; i++) { ret.push(0); }
    let bin = n.toString(2);
    bin = reverseString(bin);
    for(let i = bin.length-1; i >=0 ; i--) {
        if(bin[i] === '0')
            ret[i] = 0;
        else
            ret[i] = 1;
    }
    return ret;
}

function arrToDec(arr) {
    let res = 0;
    let power2 = 1;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === 1) {
            res = res + power2;
        }
        power2 = power2 * 2;
    }
    return res;
}

function applyCombination(combinations, pos, power2) {
    let counter = power2;
    for(let i = 0; i < combinations.length; i++) {
        if(counter > 0)
            combinations[i][pos] = 1;
        else
            combinations[i][pos] = 0;
        counter--;
        if(counter < 0 && Math.abs(counter) >= power2)
            counter = power2;
    }
}

function merge(addr, mask) {
    let res = [];
    let variations = 1;
    for(let i = 0; i < addr.length; i++) {
        if(mask[i] === -1) {
            res.push(-1);
            variations = variations * 2;
        }
        else if(mask[i] === 1) {
                res.push(1);
        } else {
            res.push(addr[i]);
        }
    }
    let combinations = [];
    for(let i = 0; i < variations; i++) {
        combinations.push([...res]);
    }
    let power2 = 1;

    for(let i = 0; i < res.length; i++) {
        if(res[i] === -1) {
            applyCombination(combinations, i, power2);
            power2 = power2 * 2;
        }
    }
    return combinations;
}

function applyMemoryInstruction(memory, instruction, currentMask) {
    let addr = numTo36(instruction.loc);
    let combinations = merge(addr, currentMask);
    for(let i = 0; i < combinations.length; i++) {
        let addr = arrToDec(combinations[i])
        memory[addr] = instruction.val;
    }
}

let memory = {};
let currentMask = [];
let inst = {}
for (let i in arr) {
    let line = arr[i];
    if(line.substring(0, 4) === 'mask') {
        currentMask = parseMask(line);
    } else {
        let instruction = parseMem(line);
        applyMemoryInstruction(memory, instruction, currentMask);
    }
}

let sum = 0;
for(let x in memory) {
    sum += memory[x];
}
console.log(sum)
