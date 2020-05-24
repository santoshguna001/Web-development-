$('ul').on('click', 'li', function() {
    $(this).toggleClass("completed");
})

$('ul').on('click', 'li span', function(event) {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    })
    event.stopPropagation();
})

$("input[type='text']").on('keypress', function(event) {
    if (event.which === 13) {
        var toDoText = $(this).val();
        $('ul').append("<li><span><i class='fa fa-trash'></i></span> " + toDoText + "</li > ")
        $(this).val("");
    }
})

$('.fa-plus').click(function() {
    $('input[type="text"]').fadeToggle();
})