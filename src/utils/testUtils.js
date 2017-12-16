export function checkCalls(fn, expected){
    for(let i = 0; i < expected.length; i++){
        expect(fn.mock.calls[i][0]).toEqual(expected[i]);
    }
}