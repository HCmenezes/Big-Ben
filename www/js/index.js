
function search_book() {
    let input = document.getElementById('src').value
    input = input.toLowerCase();
    let books = document.getElementsByClassName('buttom');

    for (i = 0; i < books.length; i++) {
        if (!books[i].innerHTML.toLowerCase().includes(input)) {
            books[i].style.display = "none";
        }
        else {
            books[i].style.display = "list-item";
        }
    }
}