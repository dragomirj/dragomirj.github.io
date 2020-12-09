/* DRAGOMIR JOVANOVIC 232/18 </ 28.10.20 */
function __convertToMinutes(_data) {
    var q = _data.split(':');
    return q[0] * 60 + q[1] * 1;
}

let jd = new Date();

//OSTAVI OVDE ZBOG MENJANJA U KONZOLI!
let __sunrise = __convertToMinutes("06:52");
let __sunset = __convertToMinutes("16:03");
let __timer = 5000;
let __stop = 0;
let __debug = 0;

//HELP ZA DEBUG
function help() {
    console.log(`__sunrise = ${__sunrise} | __sunset = ${__sunset} | __timer = ${__timer} | __debug = ${__debug} | __stop = ${__stop}`);
    console.log('__convertToMinutes() | __createDateTime()')
}

function __createTime() {
    let hh = ("0" + jd.getHours()).slice(-2);
    let mm = ("0" + jd.getMinutes()).slice(-2);
    return `${hh}:${mm}`;
}

function __createDate() {
    let dd = jd.getDate();
    let mm = jd.getMonth();
    let yy = jd.getFullYear();
    return `${dd}/${mm}/${yy}`;
}

function __getClientData() {
    return `${window.innerWidth}x${window.innerHeight}`;
}

function __createDateTime() {
    document.getElementById("date").innerHTML = `${__createTime()} ${__createDate()} (${__getClientData()})`;
}

function __openWindow(__url, __self) {
    window.open(__url, __self, "left=113,top=31,width=551,height=731");
}

function __checkMode() {
    __createDateTime();
    if (__stop == 1) {
        return
    } //Dodatni stop
    
    __createDateTime();
    let __current = __convertToMinutes(__createTime());

    if (__debug == 1) {
        console.log(`F: __checkMode() se trenutno izvrsava! (TIMER: ${__timer})`);
    }

    if (__sunrise <= __current && __current <= __sunset) {
        if (__debug == 1) {
            console.log("Prelazi web sajt u DNEVNI REŽIM!");
        }

        $(document).ready(function () {
            //DNEVNI REZIM </DJDJDJDJDJ
            $("html, body, .gridContainer").css("background-color", "#ebf5ed");
            $("#modeCurrent").html("<p>Trenutno <b>IMA</b> dnevnog svetla napolju!</p>");
            $("#sun").removeClass("hidden");
            $("#moon").addClass("hidden");
        });
    } else {

        if (__debug == 1) {
            console.log("Prelazi web sajt u NOĆNI REŽIM!");
        }

        $(document).ready(function () {
            //NOCNI REZIM </DJDJDJDJDJ
            $("html, body, .gridContainer").css("background-color", "#b19cd9");
            $("#modeCurrent").html("<p>Trenutno <b>NEMA</b> dnevnog svetla napolju!</p>");
            $("#moon").removeClass("hidden");
            $("#sun").addClass("hidden");
        });
    }
}

$(document).ready(function () {
    $(".modeIcon").click(function () {
        $("#modeMenu").toggle("fast");
        $("#modeMenu").css("display", "flex");
        $("span").css("display", "inline")
    });

    $("#arrow").click(function () {
        $("#modeMenu").hide(1000);
    });
});

//Izvrsavaj sve dok nije stopirano azuriranje theme!
if (__stop == 0) {
    setInterval(__checkMode, __timer);
    setInterval(__createDateTime, 1000);
}
