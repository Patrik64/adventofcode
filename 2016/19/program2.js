var input = 3001330;
var arr = [];

for(var k = 0; k < input; k++)
    arr.push(1);

while(arr.length > 1)
{
    var n = Math.floor(arr.length/2); 
    arr.splice(n, 1); 
    var x = arr.shift();
    arr.push(x);
}

console.log(arr[0]+1);