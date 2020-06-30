console.log('It works');
const chats = document.querySelectorAll(".contact");

init();

function init() {
    setupChatsButtons();
}

function setupChatsButtons() {
    for (var i = 0; i < chats.length; i++) {
        chats[i].addEventListener('click', function() {
            console.log(this.getAttribute('id'));
            document.getElementById("demo").innerHTML = this.getAttribute('id');
        });
    }
}