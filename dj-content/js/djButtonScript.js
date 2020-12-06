/* DRAGOMIR JOVANOVIC 232/18 </ 30.10.20 */
$(document).ready(function () {
    $("a").hover(function () {
        $(this).css("color", "white");
        $(this).find('.buttonLinks').addClass("buttonLinksHover");
    }, function () {
        $("a").css("color", "black");
        $(".buttonLinks").removeClass("buttonLinksHover");
    });
});
