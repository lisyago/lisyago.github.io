let $j = jQuery;

function buildListElement(...problemElements){

    //problemElements = [index, header, title, text, solution]

    let problemID = problemElements[0];

     $j('.problem-list').append('<li class="problem" id = "' + problemID + '"></li>')

     $j(`#${problemID}`).append('<h2 class="problem-header">' + problemElements[1] + 
     '<span class="btn_expand" id="btn_expand_' + problemID + '"></span></h2>' +
     '<h3 class="problem-titel">' + problemElements[2] + '</h3>' + 
     '<p class="problem-text">' + problemElements[3] + '</p>' +
     '<button class="btn_answer" id="btn_' + problemID + '">Answer</button>' +
     '<div class="problem-solution" id="problem-solution-' + problemID + '"></div>')

    buildBtnExtra();

    function buildBtnExtra() {
        let btnExtra = $j(`#btn_expand_${problemID}`);

        //console.log(btnExtra);

        btnExtra.html('+').click(function() {
            let btn = $j(this);
            btn.toggleClass('btn-collapse');
            if(btn.hasClass('btn-collapse')){
                btn.html('-');
            }
            else{
                btn.html('+');
            }
            toggleElements($j(this))
        })
     }
     
    $j(".btn_answer").click(function() {
        showAnswer($j(this));
    })
    
    $j(`#problem-solution-${problemElements[0]}`).html((problemElements[4])?problemElements[4]:'The solution is not found yet...');
   

    let showAnswer = (el) => {
        let tg = $j(`#${el.parents("li").attr('id')}`),
            answer = tg.find(".problem-solution ");
        answer.show(600);
        $j(el).hide();
    }
}

let toggleElements =  (el) => {
    let tg = $j(`#${el.parents("li").attr('id')}`),
        text = tg.find(".problem-text"),
        button = tg.find(".btn_answer"),
        answer = tg.find(".problem-solution ");

    el.siblings().toggle();
    text.slideToggle();  
    if (answer.css("display") == "none") { button.toggle() };      
    answer.hide(600);
}

