export const TFN = {
    /* can remove these if not used
    'linear': function(k) { return k },
    'ease-in': function(k, e = 1.675) {
        return Math.pow(k, e)
    },
    'ease-out': function(k, e = 1.675) {
        return 1 - Math.pow(1 - k, e)
    },
    'ease-in-out': function(k) {
        return .5*(Math.sin((k - .5)*Math.PI) + 1)
    }, */
    'bounce-out': function(k, a = 2.75, b = 1.5) {
        return 1 - Math.pow(1 - k, a)*Math.abs(Math.cos(Math.pow(k, b)*(n + .5)*Math.PI))
    }
}
