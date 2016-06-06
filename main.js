/**
 * Created by KoicsD on 2016.06.06..
 */
(function (app) {
    window.addEventListener('load', function (event) { fetchData(3); });
    
    function fetchData(amount) {
        if (typeof(amount) !== "number")
            throw new TypeError('Type of parameter \'number\' must be \'number\'');
        var url = 'www.filltext.com/?rows=' + amount.toString() +
            '&firstName={firstName}' +
            '&lastName={lastName}' +
            '&city={city}' +
            '&address={streetAddress}' +
            '&email={email}' +
            '&phone={phone}';
        var request = new XMLHttpRequest();
        request.onreadystatechange = function (event) { handleRequest(event.target); };
        request.open('GET', url, true);
        request.send();
        console.log('HTTP-GET-request sent to:\n' + url);
    }

    function handleRequest(req) {
        if (req.readyState !== 4)
            return;
        if (req.status !== 200) {
            console.log('HTTP-GET-request failed with code: ' + req.status);
            return;
        }
        console.log('HTTP-GET-request successful.');
        console.log('Parsing...');
        try {
            parseResponse(req.responseText);
        }
        catch (err) {
            console.log('An error occurred while parsing HTTP-response:\n' +
                (!!err.stack ? err.stack : err.toString()));
        }
        console.log('HTTP-response parsed successfully.')
    }

    function parseResponse(strResp) {
        var parsedResp = JSON.parse(strResp);
        Array.prototype.forEach.call(parsedResp, function (obj, ind, arr) {
            document.querySelector('body').appendChild(createCard(
                obj.firstName,
                obj.lastName,
                obj.city,
                obj.address,
                obj.email,
                obj.phone
            ));
        });
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