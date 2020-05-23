$('li').click(function() {
    $(this).toggleClass("completed");
})

$('ul li span').click(function(event) {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    })
    event.stopPropagation();
})