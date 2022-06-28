let $ = jQuery;

$(document).ready(function(){
    playTicTacToe(1);    
});

function buildGrid(n, game) { //game: tic_tac_toe
//n - number of the grid rows, n = k^2. later add pattern y/n
    let i = n - 1;

    let field = $("div.field"),
        columns = Math.sqrt(n),
        rows = columns;

    if (field){
        field.css({ 'grid-template-columns': 'repeat(' + columns +', 1fr)', 
                    'grid-template-rows': 'repeat(' + rows +', 1fr)' 
                });

        while (i >= 0 ) {
            field.prepend((game == 'tic_tac_toe') ? 
                '<button class="cell" id = "cell' + i + '"></button>' : 
                '<div class="cell" id = "cell' + i + '"></div>'); 
            i--;
        }
    }
     
    else {
        return;
    }
}

function playTicTacToe(players) { //1 or 2
    buildGrid(9, 'tic_tac_toe');

    let player1 = { name: 'Player', score: 0},
        player2 = { name: '', score: 0 }

    
    if (players == 1) {
        player2.name = 'Computer';

        let cell = $(".cell"),
            cells = [],
            cells_empty = [],
            lines = [],
            row0 = [],
            row1 = [],
            row2 = [],
            col0 = [],
            col1 = [],
            col2 = [],
            dia0 = [],
            dia1 = [],


            type_player = (Math.round(Math.random()) > 0 ) ? 'cross' : 'circle', //'cross' or 'circle' is defined randomly
            type_ai = (type_player == 'cross') ? 'circle' : 'cross';

        //crete array of cells/buttons
        cell.each(function(){
            cells.push($(this));
        })

        let scores = $("div.scores");
            
            scores.prepend('<span>' + player1.name + ': <span class="score ' + player1.name + '">' + player1.score + '</span></span>' + '<br/><span>' + player2.name + ': <span class="score ' + player2.name + '">' + player2.score + '</span></span>')


        function gameOver(name) {
            //alert('Game over!');
            name.score += 1;
            cells.forEach(function(item) {
                item.prop('disabled', true);
            })

            setTimeout(() => {
                let restart = confirm('Game is over! New round?', 'Yes!', 'No');
                (restart == true) ? gameRestart(1) : gameRestart(0);
            }, 600)
        }

        function gameRestart(saveScores) {
            cells.forEach(function(item){
                item.prop('disabled', false);
                item.empty();
                item.removeClass('checked cross circle')
            })

            if(!saveScores) {
                console.log('The scores were reset')
                player1.name = '';
                player1.score = 0;
                player2.score = 0;
                player2.name = '';
                resetScores();
            }
            else {
                resetScores();
            }
        }

        function resetScores() {
            let scoreSpan = $("span.score");

            scoreSpan.each(function () {
                $(this).empty();
                $(this).prepend(($(this).hasClass(player1.name)) ? player1.score : player2.score);
            })
        }
    
        
        //define rows 
        const w = cells.length/3; //3, lenght of 1 row or 1 column
        for (let k0 = 0; k0 < w; k0++) {
            row0.push(cells[k0]);
        }
        lines.push(row0);

        for (let k1 = w;  k1 < w*2; k1++) {
            row1.push(cells[k1]);
        }
        lines.push(row1);

        for (let k2 = w*2; k2 < w*3; k2++) {
            row2.push(cells[k2]);
        }
        lines.push(row2);


        //define columns
        for (let c0 = 0; c0 < w*3; c0 += 3) {
            col0.push(cells[c0]);
        }
        lines.push(col0);

        for (let c1 = 1; c1 < w*3; c1 += 3) {
            col1.push(cells[c1]);
        }
        lines.push(col1);

        for (let c2 = 2; c2 < w*3; c2 += 3) {
            col2.push(cells[c2]);
        }
        lines.push(col2);

        //define diagonals
        for (let d0 = 0; d0 < w*3; d0 += 4) {
            dia0.push(cells[d0]);
        }
        lines.push(dia0);
        
        for (let d1 = 2; d1 < w*3-2; d1 += 2) {
            dia1.push(cells[d1]);   
        }   
        lines.push(dia1);
        
        let findFullLine = (type) => {
            let gameIsOver = 0;

            lines.forEach(function (item) {
            let counterAI = 0,
                counterPlayer = 0;
            item.forEach(function (item) {
                if (item.hasClass('checked') && item.hasClass(type_ai)) counterAI++;
                if (item.hasClass('checked') && item.hasClass(type_player)) counterPlayer++;
            })
                if (counterPlayer == 3) {gameOver(player1); gameIsOver = 1;}
                if (counterAI == 3 ){gameOver(player2); gameIsOver = 1;} 
            })

            if(!gameIsOver && type == type_player){checkCell($(checkNextCell()), type_ai)}
        }

        function checkCell(element, type) {
            element.addClass(type).addClass('checked').append('<span class="inner"></span>').prop('disabled', true);
            findFullLine(type);
        }

        function checkNextCell() {
            cells_empty = cells.filter((element) => {
                return (!element.hasClass('checked'));
            })
            let l = cells_empty.length;
            
            if (l == 0) { return }
            else {
                return '#' + cells_empty[Math.round(Math.random())*(cells_empty.length-1)].attr('id');
            };
        }
        
        if (type_player == 'circle') { //check the middle cell if AI has a 'cross'
            checkCell(cells[4], type_ai);
        }

        cell.click(function() {
            checkCell($(this), type_player);
        })
    }
}