let count = 10
let num =Math.floor(Math.random()*100);

console.log(num);

function guess(){
    const getcounterElement = document.querySelector('.count')
    var guess= document.getElementById("inp").value
    const show_message = document.getElementById('message')
    const card = document.querySelector('.flip-card-inner')
    const text = document.querySelector('.text')


    // console.log(num)
    if(count > 0){
        count =count-1;
        getcounterElement.innerHTML=count;

    }
    if (guess==num){
        console.log(card)
        text.innerHTML=`yaaahhhh you won it!!!😎`
        card.style.transform ="rotateY(180deg)"
        
    }
    else if(count==0){
        text.innerHTML = "game over😢"
        card.style.transform = "rotateY(180deg)"


    }else{
        show_message.innerHTML = `oops you guess wrong ${guess}`
    }
};