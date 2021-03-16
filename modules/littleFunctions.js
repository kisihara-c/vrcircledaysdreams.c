

let nextModeByArray = (now,arr) =>{
    let a = arr.indexOf(now);
    a += 1;
    if(a == arr.length){a=0;}
    return arr[a];
  }

module.exports = nextModeByArray;