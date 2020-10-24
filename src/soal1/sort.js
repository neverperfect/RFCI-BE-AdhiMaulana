function sort(list) {
    var count = 0
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < list.length-1; i++) {
            if (list[i] > list[i+1]) {
                var temp = list[i];
                list[i] = list[i+1];
                list[i+1] = temp;
                swapped = true;
                count+=1;
                console.log("["+list[i]+","+list[i+1]+"] -> "+list);
            }
        }
    } while (swapped);
    console.log("Jumlah swap: "+count);
}
console.log(sort([4, 9, 7, 5, 8, 9, 3]))
