var line1 = [3,1]
var line2 = [6,5,1]
var n = parseInt(line1[0])
var x = parseInt(line1[1])
var real_x = x - 1
var nums = line2.map((num)=>{
    return parseInt(num)
})
var min = Math.min.apply(null,nums)
var rest = 0
j = real_x
// while (nums[j] > 0) {
//     nums[j]--
//     rest++
//     j--
//     if (j < 0) {
//         j = j+n
//     }
// }
for (var i = 0; i < nums.length; i++) {
    nums[i] -= min
    rest += min
}

for (var i = real_x; nums[i] >0 ; ) {

    nums[i]--
    rest++
    i--
    if (i < 0) {
        i = i+n
    }
}
nums[i] = rest
console.log(nums.join(' '))