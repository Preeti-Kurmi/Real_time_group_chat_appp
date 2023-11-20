

var temp=0;
for(var i=2;i<=100;i++){
    let count =0;
    for(var j=2;j<=i;j++){
        if(i%j==0){
            count++;
        }

    }
    if(count==1){

        temp++;

    }
}
console.log(temp);