/**
 * Created by KoicsD on 2016.06.06..
 */
(function (app) {
    window.addEventListener('load', function (event) {
        document.querySelector('body').appendChild(createCard(
            'Daniel',
            'Koics',
            'Bucharest',
            '3124XV Bucharest,' +
            'Deep str. 523.',
            'koics.dani@example.com',
            '450780132'
        ));
    });
    
    function fetchData(amount) {
        var url = '';
    }

    function handleRequest(req) {

    }
    
    function createCard(firstName, lastName, city, address, email, phone) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.appendChild(createRow('First name:', firstName));
        card.appendChild(createRow('Last name:', lastName));
        card.appendChild(createRow('City:', city));
        card.appendChild(createRow('Address:', address));
        card.appendChild(createRow('Email:', email));
        card.appendChild(createRow('Phone:', phone));
        return card;
    }

    function createRow(name, value) {
        var row = document.createElement('div');
        row.classList.add('row');
        var lbName = document.createElement('label');
        var spValue = document.createElement('span');
        lbName.innerHTML = name;
        spValue.innerHTML = value;
        row.appendChild(lbName);
        row.appendChild(spValue);
        return row;
    }
}) (window.randomContactList = window.randomContactList || {});