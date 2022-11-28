const micon = document.querySelector(".micon");
const menuItems = document.querySelector(".stealthmenu");
let mopening = false;

micon.addEventListener('click', () => {
    if (mopening) {
        menuItems.style.display = "block"; mopening = false;
    }
    else {
        menuItems.style.display = "none"; mopening = true;
    }
});

let left = "RUB";
let right = "USD";
let valueRight = 0.0;
let valueLeft = 0.0;

fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right}`)
    .then(response => { return response.json() })
    .then(data => {
        valueRight = data.rates[right];
        valueLeft = 1 / valueRight;
        courseLeft.value = `1 ${left} = ${parseFloat(valueRight)} ${right}`;
        courseRight.value = `1 ${right} = ${parseFloat(valueLeft)} ${left}`;
    })
    .catch(err => {
        alert("ERROR " + err)
    });

function color() {
    leftbuttons.forEach(item => {
        let id = item.id;
        if (item.innerHTML == left) {
            document.getElementById(id).style.backgroundColor = "#833AE0";
            document.getElementById(id).style.color = "white";
        }
        else {
            document.getElementById(id).style.backgroundColor = "white";
            document.getElementById(id).style.color = "gray";
        }
    });
    rightbuttons.forEach(item => {
        let id = item.id;
        if (item.innerHTML == right) {
            document.getElementById(id).style.backgroundColor = "#833AE0";
            document.getElementById(id).style.color = "white";
        }
        else {
            document.getElementById(id).style.backgroundColor = "white";
            document.getElementById(id).style.color = "gray";
        }
    });
}

document.addEventListener('click', (event) => {
    let res = "";
    if (event.target.className == "buttonsleft") {
        left = event.target.innerHTML;
    }
    else if (event.target.className == "buttonsright") {
        right = event.target.innerHTML;
    }
    color();
    fetch(`https://api.exchangerate.host/latest?base=${left}&symbols=${right}`)
        .then(response => { return response.json() })
        .then(data => {
            valueRight = data.rates[right];
            valueLeft = 1 / valueRight;
            courseLeft.value = `1 ${left} = ${parseFloat(valueRight)} ${right}`;
            courseRight.value = `1 ${right} = ${parseFloat(valueLeft)} ${left}`;
            if (event.target.className == "buttonsright") {
                if (leftsum.value.length == 0) { rightsum.value = ""; }
                else { rightsum.value = parseFloat((leftsum.value * valueRight)); }
            }
            else if (event.target.className == "buttonsleft") {
                if (rightsum.value.length == 0) { leftsum.value = ""; }
                else { leftsum.value = parseFloat((rightsum.value * valueLeft)); }
            }
        })
        .catch(err => {
            alert("ERROR " + err)
        });
});

const courseLeft = document.querySelector(".leftrate");
const courseRight = document.querySelector(".rightrate");
const leftbuttons = document.querySelectorAll(".buttonsleft");
const rightbuttons = document.querySelectorAll(".buttonsright");
const leftSideBtns = document.querySelector(".valutesright");
const leftsum = document.querySelector(".valueleft");
const rightsum = document.querySelector(".valueright");
let sumL = "";
let sumR = "";


leftsum.addEventListener('keyup', (event) => {
    if (event.key.charCodeAt() != 65) {
        if (leftsum.value.length == 0) { rightsum.value = ""; }
        let point = false;
        let arr = "";
        res = leftsum.value;
        res = res.split("");
        res.forEach(item => {
            if ((item.charCodeAt() >= 48 && item.charCodeAt() <= 57) || (item.charCodeAt() == 44 || item.charCodeAt() == 46)) {
                if (item.charCodeAt() == 44 || item.charCodeAt() == 46) {
                    if (!point) {
                        if (leftsum.value.length == 1) { leftsum.value = ""; }
                        arr += ".";
                        point = true;
                    }
                }
                else {
                    arr += item;
                }
                sumL = parseFloat(arr);
                leftsum.value = arr;
                rightsum.value = parseFloat((sumL * valueRight));
                if (leftsum.value[0] == 0 && leftsum.value.split(".")[0].length == 2) { leftsum.value = leftsum.value.split("").pop().toString() }
            }
            else if (res.length == 1) { leftsum.value = ""; }
        });
    }

});

color();

rightsum.addEventListener('keyup', (event) => {
    if (event.key.charCodeAt() != 65) {
        if (rightsum.value.length == 0) { leftsum.value = ""; }
        let arr = "";
        let point = false;
        res = rightsum.value;
        res = res.split("");
        res.forEach(item => {
            if ((item.charCodeAt() >= 48 && item.charCodeAt() <= 57) || (item.charCodeAt() == 44 || item.charCodeAt() == 46)) {
                if (item.charCodeAt() == 44 || item.charCodeAt() == 46) {
                    if (!point) {
                        if (rightsum.value.length == 0) { leftsum.value = ""; }
                        arr += ".";
                        point = true;
                    }
                }
                else {
                    arr += item;
                }
                sumR = parseFloat(arr);
                rightsum.value = arr;
                leftsum.value = parseFloat((sumR * valueLeft));
                if (rightsum.value[0] == 0 && rightsum.value.split(".")[0].length == 2) { rightsum.value = rightsum.value.split("").pop().toString() }
            }
            else if (rightsum.value.length == 1) { rightsum.value = ""; }
        });
    }
});