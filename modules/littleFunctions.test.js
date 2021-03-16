const nextModeByArray = require('./littleFunctions.js');

test(`test the function to answer next mode`,()=>{
    expect(nextModeByArray("a",["a","b","c"])).toBe("b");
})