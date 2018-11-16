var Memory = {};
var monkeys = ["chimp", "chimp", "probiscus", "probiscus", "tamarin", "tamarin", "gibbon", "gibbon", "macaque", "macaque", "squirrel", "squirrel"];
var monkeycardArray = [];
Memory.squares = document.getElementsByClassName("col-sm-3 col-lg-3");
Memory.container = document.getElementById("container-fluid");
var rows = document.getElementsByClassName("row");
var count = 0;
firstGuess = '';
secondGuess = '';
var previousTarget = null;
var delay = 1000;
var win = document.getElementById("win-wrapper");
win.style.display = "none";
var monkeystoFind = 14;
var setIntervalId;

Memory.start = function () {
    Memory.generateDynamicMonkeys(monkeys);
    Memory.shuffleMonkeyArray(monkeycardArray);
    Memory.distributeRandomMonkeys(Memory.squares, monkeycardArray);
};

Memory.generateDynamicMonkeys = function () {
    console.log("GO");
    for (var i = 0; i < monkeys.length; i++) {
        var monkeycard = document.createElement('div');
        monkeycard.dataset.name = monkeys[i];
        var front = document.createElement("div");
        front.classList.add("front");
        front.style.backgroundImage = "url(./monkeypics/crate.jpg)";
        var back = document.createElement('div');
        back.classList.add("back");
        back.style.backgroundImage = "url(./monkeypics/" + monkeys[i] + ".jpg)";
        monkeycard.appendChild(front);
        monkeycard.appendChild(back);
        monkeycard.classList.add("monkeycard");
        monkeycardArray.push(monkeycard);
    }
    Memory.shuffleMonkeyArray = function () {
        var j, x, i;
        for (i = monkeycardArray.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = monkeycardArray[i];
            monkeycardArray[i] = monkeycardArray[j];
            monkeycardArray[j] = x;
        }
        return monkeycardArray;
    }
}
Memory.distributeRandomMonkeys = function (Memorysquares, monkeycardArray) {
    for (var i = 0; i < monkeycardArray.length; i++) {
        Memorysquares[i].appendChild(monkeycardArray[i]);
    }
}
var modalWrapper = document.getElementById("modal-wrapper");
var start = document.getElementById("start-button");
start.addEventListener("click", Start);
var mCounter = 0;
var sCounter = 0;
function Start() {
    setIntervalId = setInterval(function () {
        var m = mCounter;
        var s = sCounter++;
        m = addZero(m);
        s = addZero(s);
        if (s == 59) {
            mCounter++;
            sCounter -= 60;
        }
        document.getElementById("time").innerHTML = m + ":" + s;
    }, 1000);
    modalWrapper.style.display = "none";
    return setIntervalId;
}
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
Memory.container.addEventListener("click", function (event) {
    var clicked = event.target;
    if (clicked === previousTarget || clicked.parentNode.classList.contains('row') || clicked.parentNode.classList.contains("win") || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
        return;
    }
    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        if (firstGuess !== '' && secondGuess !== '') {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(releaseMatch, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
});

var match = function match() {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
        card.classList.add('match');;
        monkeystoFind--;
        if (monkeystoFind > 0) {
            return;
        } else {
            win.style.display = "block";
            clearInterval(setIntervalId);
        }
    });
};
var releaseMatch = function releaseMatch() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
}

var resetGuesses = function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
        card.classList.remove('selected');
    });
};
