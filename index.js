alert('для отрисовки кликайте на поле');
const arr =[];
const app = new PIXI.Application();
document.body.appendChild(app.view);
function resize() {
    let dis = Math.min(window.innerHeight, window.innerWidth);  
    app.view.width = dis;
    app.view.height = dis;
  }
    window.onresize = function() {
     resize();
  };

function rectRender(size, count,line) {
    let x           = size;
    let y           = size;
    let widthRect   = size;
    let heightRect  = size;
    let countRect   = 0;
    let lineRect    = line;
    let row         = 1;
    let column      = 0;
 
    function render(line) {
        if(count % lineRect === 0 && countRect < lineRect) {
            const realPath = new PIXI.Graphics();
            app.stage.addChild(realPath);
            realPath.beginFill(0xDE3249);
            realPath.drawRect(x, y, widthRect, heightRect);
            realPath.endFill();   
            arr.push({x,y,column,row});
            x += size*2;
            countRect += 1;
            column += 1;         
        }
        if(count % lineRect === 0 && countRect === lineRect) {
            x = size;
            countRect = 0;
            y += size*2;
            row += 1;
            column = 0;
            return;
        }
        if(count % lineRect !== 0) {
            console.log('Введите четные числа');
        }
    }
    for(let i = 0; i < count; i++) {
        render();     
    }
}

function lineRender(array,coordinates,color) {
    let coordinateLine = [];
    array.forEach((row,column) => {      
        coordinateLine.push(coordinates.filter(items => items.column == column && items.row == row))
    })
    const coordinateLinePX = coordinateLine.map(item => {
       return {x:item[0].x, y:item[0].y};     
    })
    function render() {
        let counter = 0;
        for(let i = 0; i <= coordinateLinePX.length; i++) {           
            let startLineX = coordinateLinePX[counter].x;
            let startLineY = coordinateLinePX[counter].y;
            let endLineX   = coordinateLinePX[counter+1].x;
            let endLineY   = coordinateLinePX[counter+1].y;
            const lines = new PIXI.Graphics();
            lines.lineStyle(10 ,color, 1,);
            lines.moveTo(startLineX,startLineY);   
            lines.lineTo(endLineX,endLineY);       
            lines.closePath();   
            lines.position.x = 30;
            lines.position.y = 30;    
            app.stage.addChild(lines);
            counter += 1;           
        }       
    }
    render()   
}

window.addEventListener('click', () => {
    let line = [];
    let color;
    for(let i=0; i < 6; i++){
        function getRandomInRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }         
          const randomNumber = getRandomInRange(1, 4)
          line.push(randomNumber)
          const colors = [0x008000,0x800000,0xFFFFFF,0x000080,0x00FFFF]
          colors.forEach((items,i)=> {
            if(randomNumber === i) {
                color = colors[i]
            }
          })
    }
    lineRender(line,arr, color)   
})
rectRender(60,24,6) // rectRender(размер сторон квадрата, количество квадратов,количество квадратов в линии)




