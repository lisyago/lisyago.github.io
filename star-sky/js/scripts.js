window.onload = function(){
	const $d = document;

    function createStars(n) {
        let height = window.innerHeight,
            width = window.innerWidth,
            stars = [],
            star,
            i;

            for (i = 0; i <= n ; i++) {
                stars[i] =  $d.createElement("span");
                star = stars[i];
                $d.body.appendChild(star);
                star.innerHTML = "&nbsp;";
                star.className = 'star' + ' ' + 'star' + i;
                if (i%2 > 0) {star.className += ' change_opacity'};
                if (i%3 == 0) {star.className += ' change_color'};

                star.style.opacity = Math.random();
                star.style.top = Math.random()*height + 'px';
                star.style.left = Math.random()*width + 'px';
            }
        let button = $d.getElementById("btn_reload");
            if(!button) {return}
            else {button.addEventListener("click", reload)} 
    }
    createStars(75);
    
    function reload() {
        $d.querySelectorAll("span.star").forEach(e => e.remove());
        createStars(75);
    }

    window.addEventListener("resize", reload());
};


