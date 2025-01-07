"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', () => {
        const postId = button.dataset.postId;

        const params = {
            method: "POST",
            body: 'postId=' + postId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        fetch('/like', params)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(response => {
                console.log(response.message);
                button.textContent = `いいね (${parseInt(button.textContent.match(/\d+/)) + 1})`;
            });
    });
});

document.querySelectorAll('.edit-comment-button').forEach(button => {
    button.addEventListener('click', () => {
        const commentId = button.dataset.commentId;
        const newContent = prompt("新しいコメント内容を入力してください:");

        const params = {
            method: "POST",
            body: 'commentId=' + commentId + '&newContent=' + encodeURIComponent(newContent),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        fetch('/edit-comment', params)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(response => {
                console.log(response.message);
                document.querySelector(`#comment-${commentId}`).textContent = newContent;
            });
    });
});

document.querySelector('#notify').addEventListener('click', () => {
    const message = document.querySelector('#notificationMessage').value;

    const params = {
        method: "POST",
        body: 'message=' + encodeURIComponent(message),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch('/notify', params)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then(response => {
            console.log(response.message);
            document.querySelector('#notificationMessage').value = "";
        });
});
