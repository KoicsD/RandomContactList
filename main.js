/**
 * Created by KoicsD on 2016.06.06..
 */
(function (app) {
    window.addEventListener('load', onLoad);
    app.fetchData = fetchData;

    var headForm;
    var numberInput;
    var sortingInput;
    var submitButton;

    function onLoad(event) {
        headForm = document.querySelector('#head-form');
        numberInput = document.querySelector('#inpAmount');
        sortingInput = document.querySelector('#selSorting');
        submitButton = document.querySelector('#head-form input[type="submit"]');
        headForm.addEventListener('submit', onSubmit);
        onSubmit(event);
    }

    function onSubmit(event) {
        var amount = parseInt(numberInput.value);
        var sorter = sortingInput.options[sortingInput.selectedIndex].value;
        if (isNaN(amount) || amount < 0 || amount > 1000) {
            alert('The given number is invalid!\nRange allowed: 0 <= number <= 1000');
            return false;
        }
        fetchData(amount, sorter);
        return false;
    }

    function fetchData(amount, sorter) {
        if (typeof(amount) !== "number")
            throw new TypeError('Type of parameter \'number\' must be \'number\'');
        var url = 'http://www.filltext.com/?rows=' + amount.toString() +
            '&firstName={firstName}' +
            '&lastName={lastName}' +
            '&city={city}' +
            '&address={streetAddress}' +
            '&email={email}' +
            '&phone={phone|format}';
        var request = new XMLHttpRequest();
        request.onreadystatechange = function (event) { handleRequest(event.target, sorter); };
        request.open('GET', url, true);
        request.send();
        console.log('HTTP-GET-request sent to:\n' + url);
    }

    function handleRequest(req, sorter) {
        if (req.readyState !== 4)
            return;
        if (req.status !== 200) {
            console.log('HTTP-GET-request failed with code: ' + req.status);
            return;
        }
        console.log('HTTP-GET-request successful.');
        console.log('Parsing...');
        try {
            parseResponse(req.responseText, sorter);
            console.log('HTTP-response parsed successfully.');
        }
        catch (err) {
            console.log('An error occurred while parsing HTTP-response:\n' +
                ((!!err.stack && !!err.message) ?
                    (err.message + '\n' + err.stack) : err.toString()));
        }
    }

    function parseResponse(strResp, sorter) {
        var parsedResp = JSON.parse(strResp);
        Array.prototype.sort.call(parsedResp, function (left, right) {
            if (left[sorter] > right[sorter])
                return 1;
            if (left[sorter] < right[sorter])
                return -1;
            return 0;
        });
        var cards = document.createElement('section');
        Array.prototype.forEach.call(parsedResp, function (obj) {
            cards.appendChild(createCard(
                obj.firstName,
                obj.lastName,
                obj.city,
                obj.address,
                obj.email,
                obj.phone
            ));
        });
        document.querySelector('#card-area').innerHTML = cards.innerHTML;
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