const board=document.querySelector('.board');
const startbtn=document.querySelector('.btn-start');
const over_game=document.querySelector('.over_game')
const start_game=document.querySelector('.start_game')
const modal=document.querySelector('.modal');
const resetbtn=document.querySelector('.btn-restart');
const high_score=document.querySelector('#high-score')
const score=document.querySelector('#score')
const time=document.querySelector('#time')
const bw=30;
const bh=30;
let highscore=localStorage.getItem("highscore")||0;
let scores=0;
let times=`00-00`
high_score.innerText=highscore;
const cols=Math.floor(board.clientWidth/bw);
const rows=Math.floor(board.clientHeight/bh);
let InervalId=null;
let timeinterval=null;
let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
const blocks=[];
let snake=[{x:1,y:0}]
for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
         const block=document.createElement('div');
    block.classList.add("block");
    board.appendChild(block);
    
    blocks[`${i}-${j}`]=block;
    }
   
}
let direction="right";
function render(){
      let head=null;
        blocks[`${food.x}-${food.y}`].classList.add("food");
    if(direction==="left"){
        head={x:snake[0].x,y:snake[0].y-1}
    }else if(direction==="right"){
        head={x:snake[0].x,y:snake[0].y+1}
    }else if(direction==="up"){
         head={x:snake[0].x-1,y:snake[0].y}
    }else if(direction==="down"){
         head={x:snake[0].x+1,y:snake[0].y}
    }
    if (
    head.x < 0 ||
    head.x >= rows ||
    head.y < 0 ||
    head.y >= cols
) {
    clearInterval(InervalId);

    modal.style.display = "flex";
    start_game.style.display = "none";
    over_game.style.display = "flex";

    return;
}
  
     if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
         blocks[`${food.x}-${food.y}`].classList.add("food");
         snake.unshift(head);
       
         scores+=10;
         score.innerText=scores
         if(scores>highscore){
            highscore=scores;
            high_score.innerText = highscore;
            localStorage.setItem("highscore",highscore.toString())
         }
    }
     snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })
        snake.unshift(head);
        snake.pop();
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })
    

}

startbtn.addEventListener("click",()=>{
    modal.style.display="none";
    InervalId=setInterval(()=>{
        render()
    },300)
    timeinterval=setInterval(()=>{
        let [min,sec]=times.split("-").map(Number);
        if(sec==59){
            min+=1;
            sec=0;

        }else{
            sec+=1;
        }
        times=`${min}-${sec}`
        time.innerText=times;
      },1000)
})
resetbtn.addEventListener("click",restartgame)
 function restartgame(){
      blocks[`${food.x}-${food.y}`].classList.remove("food");
      snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
        
    })
    scores=0;
    times=`00-00`
    score.innerText=scores;
    high_score.innerText=highscore;
    time.innerText=times;
    modal.style.display="none";
    snake=[{x:1,y:3}];
     food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
     InervalId= setInterval(()=>{
    render()
},300);

}

addEventListener("keydown",(event)=>{
    if(event.key=="ArrowUp"){
        direction="up"
    }else if(event.key=="ArrowDown"){
        direction="down"
    }else if(event.key=="ArrowLeft"){
        direction="left"
    }else if(event.key=="ArrowRight") {
        direction="right"
    }
})