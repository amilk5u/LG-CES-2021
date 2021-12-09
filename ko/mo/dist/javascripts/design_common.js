"use strict";
var winW;
var winH;
var esStep = "Expo.ease";
var $window = $(window);
var winSc;
var $html = $("html");
var htmlH;
var $header = $("#header");

$window.load(function () {
    htmlH = $("body").outerHeight(true);
    winSc = $(this).scrollTop();
    $window.on("resize", function () {
        winW = $(this).width();
        winH = $(this).height();
    });
    $(this).trigger("resize");
    $(window).scroll(function () {
        winSc = $(this).scrollTop();
    });
});
detail();
videoGallery();


//
// $(document).ready(function(){
//     $(document).bind('keydown',function(e){
//         if ( e.keyCode == 123 /* F12 */) {
//             e.preventDefault();
//             e.returnValue = false;
//         }
//     });
// });
// document.onmousedown=disableclick;
// status="Right click is not available.";
//
// function disableclick(event){
//     if (event.button==2) {
//         alert(status);
//         return false;
//     }
// }
//

"use strict";
function detail(){

    /*211208 start*/
    // Header Toggle Button
    var $header = $("#header");
    var TVContainer = $(".tv_container"),
        TVGnbBtn = $header.find(".gnb_btn"),
        TVGnbList = $header.find(".gnb_list"),
        TVMenuCloseBtn = $header.find(".close_btn"),
        TVDim = $("#wrap").find(".dim");

    TVGnbBtn.on("click",function(){
        if (TVGnbList.hasClass("active") ) {
            GnbMenuNone();
        } else {
            TweenMax.to(TVDim, .5, { opacity:1, display:"block"})
            TweenMax.to(TVGnbList, .5, { opacity:1, display:"block", left:0 })
            TVGnbList.addClass("active");
            $(".main_container").addClass("on");
        }
    });
    TVMenuCloseBtn.on("click",function(){
        GnbMenuNone();
    });
    TVDim.on("click",function(){
        GnbMenuNone();
    });
    function GnbMenuNone () {
        TVGnbList.removeClass("active");
        $(".main_container").removeClass("on");
        TweenMax.to(TVDim, .5, { opacity:0, display:"none"})
        TweenMax.to(TVGnbList, .5, { opacity:0, display:"none", left:"-100vw" })
    }
    /*211208 end*/


    setTimeout(function () {
        $(".gnb_list > li").eq(0).find("a").trigger("click");
    }, 200);

    //model title 제어
    $(".main_title").find("a").on("click",function(){
        $(".art90_color_btn_wrap").css("display","none");
        /*211209 start*/
        $(".model_size_btn").css("display","flex");
        /*211209 end*/
        $(".main_title").find("a").removeClass("main_title_active");
        $(this).addClass("main_title_active");
        $(".sub_title").css("display","none");
        $(this).parent().find(".sub_title").css("display","block");
        $(this).parent().find(".sub_title").children().first().trigger("click");
        //각 maintitle 클릭했을 때 filter한 첫번째 모델 클릭되도록
        $(this).parent().find($(".subtitle_btn_select")).eq(0).trigger("click");
    });


    //model subtitle 제어
    var $hashSub = $(".hash_sub button");
    var $hashUsp = $(".hash_usp button");
    var $subTitleBtn = $(".sub_title_btn");

    var $description = $(".description");
    var $description_wrap = $(".description_wrap");
    var $description_sub = $(".description_sub");
    var $description_rear = $(".description_rear");
    var $model_subtitle = $(".model_subtitle");

    /*model name*/
    var selectModel;
    $subTitleBtn.on("click",function(){
        /*211208 start*/
        $window.scrollTop(0);
        GnbMenuNone();
        /*211208 end*/
        selectModel = $(this).children().text();
        $subTitleBtn.removeClass("subtitle_active");
        $(this).addClass("subtitle_active");

        //change model_info
        $(".model_title").html(models[selectModel]["title"]);
        $(".model_size").text(models[selectModel]["size"][0]);

        $model_subtitle.text(selectModel);
        $(".without_stand_num").text(models[selectModel]["dimension"][models[selectModel]["size"][0] + "\""][0]);
        $(".with_stand_num").text(models[selectModel]["dimension"][models[selectModel]["size"][0] + "\""][1]);
        $(".with_stand_num_rear").text(models[selectModel]["dimension"][models[selectModel]["size"][0] + "\""][2]);

        var $modelSubtitleText = $model_subtitle.text();

        console.log(selectModel, models[selectModel]["title"], models[selectModel]["size"][0]);
        //dimension without stand 값이 비어있을 때
        if(models[$modelSubtitleText]["dimension"][Object.keys(models[$modelSubtitleText]["dimension"])[0]][0] === ""){
            $description_wrap.children().first().css("display","none");
        }
        if(models[$modelSubtitleText]["dimension"][Object.keys(models[$modelSubtitleText]["dimension"])[0]][1] === ""){
            $description_sub.css("display","none");
        }
        if(models[$modelSubtitleText]["dimension"][Object.keys(models[$modelSubtitleText]["dimension"])[0]][2] === ""){
            $description_rear.css("display","none");
        }
        if(models[$modelSubtitleText]["dimension"][Object.keys(models[$modelSubtitleText]["dimension"])[0]][0] !== "" && models[$modelSubtitleText]["dimension"][Object.keys(models[$modelSubtitleText]["dimension"])[0]][1] !== ""){
            $description.css("display","block");
        }
        if(models[$modelSubtitleText]["dimension"][Object.keys(models[$modelSubtitleText]["dimension"])[0]][0] !== ""
        && models[$modelSubtitleText]["dimension"][Object.keys(models[$modelSubtitleText]["dimension"])[0]][1] !== ""
        && models[$modelSubtitleText]["dimension"][Object.keys(models[$modelSubtitleText]["dimension"])[0]][2] !== ""){
            $description.css("display","block");
        }

        $(".goto3d_img").attr("src",models[selectModel]["img"][models[selectModel]["size"][0] + "\""]);

        //첫번째 사이즈 관련 webgl 화면 출력
        if(window.changeItemType != null) {
            window.changeItemType(models[selectModel]["webgl"][models[selectModel]["size"][0] + "\""]);
        }

        var $modelSizeBtn = $(".model_size_btn");
        var sizetagNum;
        $modelSizeBtn.html("");
        for(sizetagNum = 0; sizetagNum < models[selectModel]["sizetag"].length; sizetagNum++){
            $modelSizeBtn.append(models[selectModel]["sizetag"][sizetagNum]);
        }

        $hashSub.css("display","none");

        var hashSubNum;
        for(hashSubNum = 0; hashSubNum < $hashSub.length; hashSubNum++){
            if($hashSub.eq(hashSubNum).hasClass(selectModel) === true){
                $hashSub.eq(hashSubNum).css("display","block");
            }
        }

        var hashUspNum;
        $hashUsp.parent().css("display","none");
        for(hashUspNum = 0; hashUspNum < $hashUsp.length; hashUspNum++){
            if($hashUsp.eq(hashUspNum).hasClass(selectModel) === true){
                $hashUsp.eq(hashUspNum).css("display","block");
                $hashUsp.eq(hashUspNum).parent().css("display","block");
            }
        }
        handleModelSize();
    });

    //UHD UQ90
    var $UQ90_btn = $(".UQ90_btn");
    var $a7_Gen5_4K_UQ90 = $("#a7_gen5_4K_UQ90");
    var $a5_Gen5_4K_UQ90_55 = $("#a5_gen5_4K_UQ90_55");
    var $eco02 = $("#eco_02");

    $UQ90_btn.on("click",function(){
        $(this).addClass("uq90_active");
        if($UQ90_btn.hasClass("uq90_active") === true){
            $(".UQ90_55_btn").on("click",function(){
                //55size
                $a7_Gen5_4K_UQ90.addClass("UQ90");
                $a5_Gen5_4K_UQ90_55.removeClass("UQ90");
                $a7_Gen5_4K_UQ90.parent().css("display","none");
                $a7_Gen5_4K_UQ90.css("display","none");
                $a5_Gen5_4K_UQ90_55.parent().css("display","inline-block");
                $a5_Gen5_4K_UQ90_55.css("display","inline-block");
                $eco02.css("display","none");
                $eco02.parent().css("display","none");
            })
            //86size
            $(".UQ90_86_btn").on("click",function(){
                $a7_Gen5_4K_UQ90.removeClass("UQ90");
                $a5_Gen5_4K_UQ90_55.addClass("UQ90");
                $a7_Gen5_4K_UQ90.parent().css("display","inline-block");
                $a7_Gen5_4K_UQ90.css("display","inline-block");
                $a5_Gen5_4K_UQ90_55.parent().css("display","none");
                $a5_Gen5_4K_UQ90_55.css("display","none");
                $eco02.css("display","inline-block");
                $eco02.parent().css("display","inline-block");
            })
        }
        $(this).removeClass("uq90_active");
    });

    var hashTagName;
    var $hash_popup = $(".hash_popup");

    //hash button active
    var $popupWindow = $(".popup_window");
    $hashSub.on("click",function(){
        var hashTagName = $(this).attr("id");
        var popupWindowNum;

        $popupWindow.css("display","none");
        for(popupWindowNum = 0; popupWindowNum < $popupWindow.length; popupWindowNum++){
            if($popupWindow.eq(popupWindowNum).hasClass(hashTagName) === true){
                $popupWindow.eq(popupWindowNum).css("display","inline-block");
            }
        }
        $hashSub.removeClass("hash_btn_active");
        $(this).addClass("hash_btn_active");
        $(".hash_popup").css("display","block");
    });

    $hashUsp.on("click",function(){
        /*211209 start*/
        TVGnbBtn.css({ display:"none", opacity:0 });
        $(".main_container").addClass("on");
        $header.css("position","absolute");
        $window.scrollTop(0);
        /*211209 end*/
        
        hashTagName = $(this).attr("id");
        if(hashTagName === "spotify_hifi" || hashTagName === "virtual_dolby_atmos" || hashTagName === "wireless_subwoofer") return false;

        $popupWindow.css("display","none");
        var popupWindowNum;
        for(popupWindowNum = 0; popupWindowNum < $popupWindow.length; popupWindowNum++){
            if($popupWindow.eq(popupWindowNum).hasClass(hashTagName) === true){
                $popupWindow.eq(popupWindowNum).css("display","inline-block");
                $popupWindow.eq(popupWindowNum).children().eq(0).css("display","block");
            }
        }

        /*211209 start*/
       /* if($("."+ hashTagName).find("> div").eq(0).find(".popup_video").length){
            $("."+ hashTagName).find("> div").eq(0).find(".popup_video")[0].load();
        }*/
        /*211209 start*/

        $hashUsp.removeClass("hash_btn_active");
        $(this).addClass("hash_btn_active");
        $hash_popup.css("display","block");
        //popup mainUSP 이름 변경
        $(".popup_main_usp").text($(this).text());

        var popupSubUspWrapNum;
        var $popupSubUspBtn = $(".popup_sub_usp_wrap button");
        var subUspListNum = keyfeatures[$(this).attr("id")];
        var usp_video = $hash_popup.find("."+ hashTagName).find(".hash_info_wrap").find("video");

        //main USP 누르면 그에 해당하는 subUSP 팝업 뜨도록
        $popupSubUspBtn.css("display","inline-block");

        for(popupSubUspWrapNum = 0; popupSubUspWrapNum < subUspListNum.length; popupSubUspWrapNum++){
            $popupSubUspBtn.eq(popupSubUspWrapNum).text(subUspListNum[popupSubUspWrapNum]);
            if(subUspListNum[popupSubUspWrapNum] === ""){
                $popupSubUspBtn.eq(popupSubUspWrapNum).css("display","none");
            }
        }
    });

    var _popup_sub_usp_index = 0;
    //hash tag popup 닫힐 때
    $(".popup_close_btn").on("click",function(){
        /*211209 start*/
        TVGnbBtn.css({ display:"block", opacity:1 });
        $(".main_container").removeClass("on");
        $header.css("position","fixed");
        /*211209 end*/


        /*if($hash_popup.find("."+ hashTagName).find(".hash_info_wrap").eq(_popup_sub_usp_index).find(".popup_video").length){
            $hash_popup.find("."+ hashTagName).find(".hash_info_wrap").eq(_popup_sub_usp_index).find(".popup_video")[0].pause();
        }*/
        $(".hash_popup").css("display","none");
        $hashInfoWrap.css("display","none");
        $(".popup_sub_usp").removeClass("active");
        $(".popup_sub_usp_wrap").children().eq(0).addClass("active");
    });

    var compareOpen = true;
    $(".hash_sub_btn").on("click",function(){
        if(compareOpen === true){
            $(".hash_sub").css("display","inline-block");
        }
        else if(compareOpen === false){
            $(".hash_sub").css("display","none");
        }
        compareOpen = !compareOpen;
    });


    //hash tag sub usp popup btn click active
    var $hashInfoWrap = $(".hash_info_wrap");
    $(".popup_sub_usp").on("click",function(){
        _popup_sub_usp_index = $(this).index();
        $(".popup_sub_usp").removeClass("active");
        $(this).addClass("active");
        $hashInfoWrap.css("display","none");
        $hash_popup.find("."+ hashTagName).find(".hash_info_wrap").eq(_popup_sub_usp_index).css("display","block");
        $hash_popup.find("."+ hashTagName).find(".hash_info_wrap").eq(_popup_sub_usp_index).find("iframe").attr("src",$hash_popup.find("."+ hashTagName).find(".hash_info_wrap").eq(_popup_sub_usp_index).find("iframe").attr("src"));
        /*if($hash_popup.find("."+ hashTagName).find(".hash_info_wrap").eq(_popup_sub_usp_index).find("video").length){
            $hash_popup.find("."+ hashTagName).find(".hash_info_wrap").eq(_popup_sub_usp_index).find("video")[0].play();
        }*/
    });


    function handleModelSize() {
        var $modelSizeBtn = $(".model_size_btn").find("button");
        $modelSizeBtn.on("click",function(){
            if(!$(this).hasClass("model_size_btn_inactive")){
                $modelSizeBtn.removeClass("model_size_btn_active");
                $(this).addClass("model_size_btn_active");
            } else {
                return;
            }

            //change title
            var _modelSizeBtnTextOnlyNum = Number($(this).text().replace(/[^0-9]/g,'')); // 99" ->99
            var _modelSizeBtnText = $(this).text();
            //ART90, AV 특이사항들
            if(window.location.pathname === "/front/av"){
                $(".model_size").text("");
            }
            else if(window.location.pathname === "/front/oled" && _modelSizeBtnTextOnlyNum === 0){
                $(".model_size").text("65");
            }
            else if(window.location.pathname === "/front/oled" && _modelSizeBtnTextOnlyNum !== 0){
                $(".model_size").text(_modelSizeBtnTextOnlyNum);
            }

            //change 3D url img
            var $modelSubtitleText = $(".model_subtitle").text();
            $(".goto3d_img").attr("src",models[$modelSubtitleText]["img"][_modelSizeBtnText]);
            $(".without_stand_num").text(models[$modelSubtitleText]["dimension"][_modelSizeBtnText][0]);
            $(".with_stand_num").text(models[$modelSubtitleText]["dimension"][_modelSizeBtnText][1]);

            //3d name call
            if(window.changeItemType != null) {
                window.changeItemType(models[$modelSubtitleText]["webgl"][_modelSizeBtnText]);
            }
        });
    }

    //ART90
    $(".lifestyle_btn").on("click",function(){
        $(".art90_color_btn_wrap").css("display","inline-block");
        $(".model_size_btn").css("display", "none")
    })
    $(".art10_btn").on("click",function(){
        $(".model_size_btn").css("display","block");
    })
    $(".art90_btn").on("click",function(){
        $(".model_size_btn").css("display","block");
    })

    //ART90 3g img change
    $(".art90_beige_btn").on("click",function(){
        $(".goto3d_img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/lifestyle/ART90.jpg")
        $(".art90_color_btn_wrap button").removeClass("model_size_btn_active");
        $(this).addClass("model_size_btn_active");
    })
    $(".art90_green_btn").on("click",function(){
        $(".goto3d_img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/lifestyle/ART90_Green.jpg")
        $(".art90_color_btn_wrap button").removeClass("model_size_btn_active");
        $(this).addClass("model_size_btn_active");
    })
    $(".art90_redwood_btn").on("click",function(){
        $(".goto3d_img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/lifestyle/ART90_Red.jpg")
        $(".art90_color_btn_wrap button").removeClass("model_size_btn_active");
        $(this).addClass("model_size_btn_active");
    })

    //model filter(checkbox)
    var arrCheckbox = [];
    var $checkConfirm = $(".check_confirm");
    var $filterApplyBtn = $(".filter_apply_btn");
    var $Checkbox = $("input[type=checkbox]");

    $("#checkAll").on("click",function(){
        if ($("#checkAll").is(':checked')) {
            $Checkbox.prop("checked", true);
            $Checkbox.addClass("checkIdx");
        } else {
            $Checkbox.prop("checked", false);
            if($Checkbox.hasClass("checkIdx") === true){
                $Checkbox.removeClass("checkIdx");
            }
        }
    });

    //checkbox checked -> add 'checkIdx' class
    $checkConfirm.on("click",function(){
        if($(this).hasClass("checkIdx") === true){
            $(this).removeClass("checkIdx");
        }
        else if($(this).hasClass("checkIdx") === false){
            $(this).addClass("checkIdx");
        }
    });

    //add 'checkIdx' class -> pull out id
    $filterApplyBtn.on("click",function(){
        //apply클릭 시 subtitle_btn_select 클래스 없애기
        $(".gnb_list").find(".sub_title").children().removeClass("subtitle_btn_select");

        arrCheckbox = [];

        var checkIdxNum;
        var $checkIdx = $(".checkIdx");

        for(checkIdxNum = 0; checkIdxNum < $checkIdx.length; checkIdxNum++){
            var idx = $checkIdx[checkIdxNum].id;
            arrCheckbox.push(idx);
        }
        //arrCheckbox remove Allcheck element
        if($("#checkAll").hasClass("checkIdx") === true){
            arrCheckbox.shift();
        }
        matchingFilterToMain(arrCheckbox);
        $(".filter_container").css("display","none");
        $(".filter_header").css("display","none");
    });

    function matchingFilterToMain(value){
        var subtitleBtnNum, valueNum;

        $subTitleBtn.css("display","none");
        for(subtitleBtnNum = 0; subtitleBtnNum < $subTitleBtn.length; subtitleBtnNum++){
            for(valueNum = 0; valueNum < value.length; valueNum++){
                if($subTitleBtn.eq(subtitleBtnNum).children().text() === value[valueNum]){
                    $subTitleBtn.eq(subtitleBtnNum).addClass("subtitle_btn_select");
                    $subTitleBtn.eq(subtitleBtnNum).css("display","inline-block");
                    $subTitleBtn.eq(subtitleBtnNum).parent().parent().css("display","inline-block");
                }
            }
            //first active subtitle
            if($subTitleBtn.eq(subtitleBtnNum).children().text() === value[0]){
                $subTitleBtn.eq(subtitleBtnNum).removeClass("subtitle_btn_select");
                $subTitleBtn.eq(subtitleBtnNum).addClass("subtitle_active");
                $subTitleBtn.eq(subtitleBtnNum).children().trigger("click");
                $subTitleBtn.eq(subtitleBtnNum).parent().parent().find("a").trigger("click");
                $subTitleBtn.eq(subtitleBtnNum).parent().parent().find("a").addClass("main_title_active");
            }
        }

        //first model 3d img
        $(".goto3d_img").attr("src",models[value[0]]["img"][Object.keys(models[value[0]]["img"])[0]]);

        //apply 눌렀을 때 filter main title에서 첫번째 클릭 안했을 때
        for(subtitleBtnNum = 0; subtitleBtnNum < $subTitleBtn.length; subtitleBtnNum++){
            if($subTitleBtn.eq(subtitleBtnNum).find("button").text() === arrCheckbox[0]){
                $subTitleBtn.eq(subtitleBtnNum).addClass("subtitle_btn_select");
                $subTitleBtn.eq(subtitleBtnNum).trigger("click");
            }
        }
    }

    //3d 팝업
    var $webglWrap = $(".webgl_wrap");
    var $modelFilter = $("#modelFilter");

    $(".btn_3D").click(function(){
        /*211209 start*/
        TVGnbBtn.css({opacity:0, display:"none"});
        $(".webgl_close_btn").css({opacity:1, display:"block"});
        /*211209 end*/
        $webglWrap.css({display:"block"});
    });
    $(".webgl_close_btn").click(function(){
        $webglWrap.css({display:"none"});
        /*211209 start*/
        TVGnbBtn.css({opacity:1, display:"block"});
        $(".webgl_close_btn").css({opacity:0, display:"none"});
        /*211209 end*/
    });
    $modelFilter.click(function (){
        $(".filter_header, .filter_container").css({display:"block"})
        //main화면 내부 filter btn 누를 시 maintitle 초기화
        $(".main_title").css("display","none");
    });

    //simulate 팝업
    var $btnSimulate = $(".btn_simulate"),
        $simulatorPopup = $(".simulator_popup"),
        $simulatorCloseBtn = $(".simulator_close_btn");

    //팝업 컨트롤
    var $simulatorBg = $simulatorPopup.find(".simulator_bg"),
        $interiorBoxLi = $simulatorPopup.find(".interior_box li"),
        $interiorBoxBtn = $interiorBoxLi.find("button"),

        $installationBoxBtn = $simulatorPopup.find(".installation_box button"),
        $infillOnOffBtn = $simulatorPopup.find(".infill_on_off button"),
        $controllerWrap = $simulatorPopup.find(".controller_wrap"),
        $controllerCloseBtn = $simulatorPopup.find(".controller_close_btn");

    $btnSimulate.click(function () {
        TweenMax.to($simulatorPopup, .3, {opacity:1, display:"block"});
        /*211209 start*/
        $simulatorCloseBtn.css({opacity:1, display:"block"});
        TVGnbBtn.css({opacity:0, display:"none"});
        /*211209 end*/
    });


    //simulator 팝업 닫기
    //닫을 때 active된 요소 전부 초기화
    $simulatorCloseBtn.click(function () {
        TweenMax.to($simulatorPopup, .3, {opacity:0, display:"none"});
        /*211209 start*/
        $simulatorCloseBtn.css({opacity:0, display:"none"});
        TVGnbBtn.css({opacity:1, display:"block"});
        /*211209 end*/
    });

    //interior box 클릭
    $interiorBoxBtn.click(function () {
        var _this = $(this),
            _index = _this.index();
        $interiorBoxBtn.removeClass("active");
        _this.addClass("active");
    });

    //Installation 클릭
    $installationBoxBtn.click(function () {
        var _this = $(this),
            _index = _this.index();
        $installationBoxBtn.removeClass("active");
        _this.addClass("active");
    });

    //infill button 클릭
    $infillOnOffBtn.click(function () {
        var _this = $(this);
        if(!$infillOnOffBtn.hasClass("active")){
            $infillOnOffBtn.addClass("active");
        } else {
            $infillOnOffBtn.removeClass("active");
        }
    });

    $controllerCloseBtn.click(function () {
        var _this = $(this);
        if(!_this.hasClass("active")){
            _this.addClass("active");
            TweenMax.to($controllerWrap, .3, {width:0});
        } else {
            _this.removeClass("active");
            TweenMax.to($controllerWrap, .3, {width:325});
        }
    });



    //intro
    $(".confidentiality_popup_close_btn").on("click",function(){
        $(".confidentiality_popup_wrap").css("display","none");
    })

    //product profile
    $(".member_login_popup_close_btn").on("click",function(){
        $(".member_login_popup_wrap").css("display","none");
    })
    $(".product_profile_btn").on("click",function(){
        $(".member_login_popup_wrap").css("display","inline-block");
    })

    $(".tab_oled").on("click",function(){
        $(this).addClass("active");
        $(".tab_lcd").removeClass("active");
        $(".lcd_img_container").css("display","none");
        $(".oled_img_container").css("display","block");
    })
    $(".tab_lcd").on("click",function(){
        $(this).addClass("active");
        $(".tab_oled").removeClass("active");
        $(".lcd_img_container").css("display","block");
        $(".oled_img_container").css("display","none");
    })

    var $productProfileContents = $(".product_profile_contents");
    var $oledImgWrap = $(".oled_img_wrap .detail_contents");
    var $lcdImgWrap = $(".lcd_img_wrap .detail_contents");

    //product profile _ OLED
    $productProfileContents.find(".oled_img_container").find(".oled_next_btn").on("click",function(){
        $oledImgWrap.eq(1).css("display","block");
        $oledImgWrap.eq(0).css("display","none");
        $(".oled_next_btn").find("img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/product_profile/next_btn_inactive.png");
        $(".oled_prev_btn").find("img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/product_profile/prev_btn_active.png");
    })
    $productProfileContents.find(".oled_prev_btn").on("click",function(){
        $oledImgWrap.eq(0).css("display","block");
        $oledImgWrap.eq(1).css("display","none");
        $(".oled_next_btn").find("img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/product_profile/next_btn_active.png");
        $(".oled_prev_btn").find("img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/product_profile/prev_btn_inactive.png");
    })

    //product profile _ LCD
    var temp = 0;
    $productProfileContents.find(".lcd_img_container").find(".lcd_next_btn").on("click",function(){
        temp++;
        if(temp === 1){
            $lcdImgWrap.css("display","none");
            $lcdImgWrap.eq(1).css("display","block");
        }
        if(temp === 2){
            $lcdImgWrap.css("display","none");
            $lcdImgWrap.eq(2).css("display","block");
            $(".lcd_next_btn").find("img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/product_profile/next_btn_inactive.png");
            $(".lcd_prev_btn").find("img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/product_profile/prev_btn_active.png");
        }
        if(temp > 2){ temp = 2; }
    })
    $productProfileContents.find(".lcd_img_container").find(".lcd_prev_btn").on("click",function(){
        temp--;
        if(temp === 0){
            $lcdImgWrap.css("display","none");
            $lcdImgWrap.eq(0).css("display","block");
            $(".lcd_next_btn").find("img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/product_profile/next_btn_active.png");
            $(".lcd_prev_btn").find("img").attr("src","https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/product_profile/prev_btn_inactive.png");
        }
        if(temp === 1){
            $lcdImgWrap.css("display","none");
            $lcdImgWrap.eq(1).css("display","block");
        }
        if(temp < 0){ temp = 0; }
    })
}
var keyfeatures = {
    //4개 씩으로 맞춰야함 없으면 ""로 빈 값
    //r1
    "selflit": ["Infinite Contrast","100% Color Fidelity","100% Color Volume","Eye Comfort Display"],
    "a9_gen5_4K": ["AI Picture Pro","Dynamic Tone Mapping Pro","AI Sound Pro 7.1.2",""],
    "thinQ_AI": ["Google Assistant","Amazon Alexa","Apple Airplay","Home Kit"],
    "trueCinema": ["Dolby Vision IQ & Dolby Atmos","HDR 10 Pro","FILMMAKER MODE",""],
    "ultimate_gameplay": ["NVIDIA G-SYNC","FreeSync Premium","STADIA & GEFORCE NOW","Game Dashboard & Optimizer"],
    "rollable_design": ["Full/Line/Zero view","","",""],
    "eco_01": ["Composite Fiber","Eco Packaging","",""],

    //z2
    "selflit8K" :["REAL 8K (7,680 x 4,320)", "Infinite Contrast", "100% Color Fidelity", "Eye Comfort Display"],
    "a9_gen5_8K": ["AI Picture Pro","Dynamic Tone Mapping Pro","AI Sound Pro 7.1.2","AI 8K Upscaling"],
    //r1의 thinQ_AI
    //r1의 trueCinema
    //r1의 ultimate_gameplay
    //r1의 eco_01

    //g2
    "selflit_evo_G2": ["OLED evo (G series)", "Infinite Contrast","100% Color Fidelity","Eye Comfort Display"],
    //r1의 a9_gen5_4K
    //r1의 thinQ_AI
    //r1의 trueCinema
    //r1의 ultimate_gameplay
    "gallery_design": ["Gallery Design","Narrow Bezel","",""],
    //r1의 eco_01

    //c2
    "selflit_evo_C2": ["OLED evo (C series)", "Infinite Contrast","100% Color Fidelity","Eye Comfort Display"],
    //r1의 a9_gen5_4K
    //r1의 thinQ_AI
    //r1의 trueCinema
    //r1의 ultimate_gameplay
    "refined_design": ["Narrow Bezel","","",""],
    //r1의 eco_01

    //b2
    //r1의 selflit
    "a7_gen5_4K": ["AI Picture Pro","AI Sound Pro 5.1.2","",""],
    //r1의 thinQ_AI
    //r1의 trueCinema
    //r1의 ultimate_gameplay
    "eco_02": ["Eco Packaging","","",""],

    //a2
    //r1의 selflit
    //b2의 a7_gen5_4K
    //r1의 thinQ_AI
    //r1의 trueCinema
    //r1의 ultimate_gameplay
    //b2의 eco_02

    //qned99
    "quantumDot": ["Extreme Dimming Technology 9X","100% Color Volume","100% Color Consistency","Ultra Contrast"],
    //z2의 a9_gen5_8K
    //r1의 thinQ_AI
    //r1의 trueCinema
    "powerful_gameplay": ["STADIA & GEFORCE NOW","Game Dashboard & Optimizer","",""],
    //b2의 eco_02

    //qned95
    //qned99의 quantumDot
    //z2의 a9_gen5_8K
    //r1의 thinQ_AI
    //r1의 trueCinema
    //qned99의 powerful_gameplay
    //b2의 eco_02

    //qned90
    "quantumDot_90": ["Extreme Dimming Technology 4X","100% Color Volume","100% Color Consistency","Ultra Contrast"],
    //b2의 a7_gen5_4K

    "quantumDot_85": ["Extreme Dimming Technology","100% Color Volume","100% Color Consistency","Ultra Contrast"],
    "quantumDot_80": ["Advanced Dimming Technology","100% Color Volume","100% Color Consistency",""],

    "pureColors_80": ["Advanced Dimming Technology","NanoCell Technology","100% Color Consistency",""],
    "pureColors_75": ["NanoCell Technology","100% Color Consistency","",""],
    "real4K": ["REAL 4K UHD","","",""],
    "a7_gen5_4K_UQ90": ["AI Picture Pro","AI Sound Pro 5.1.2","",""],
    "a5_gen5_4K_UQ90_55": ["AI Brightness Control","AI Sound Pro 5.1.2","",""],

    "a5_gen5_4K": ["AI Brightness Control","AI Sound Pro 5.1.2","",""],
    "a5_gen5_4K_UQ75": ["AI Brightness Control","AI Sound","",""],
    "homeCinema": ["HDR 10 Pro","FILMMAKER MODE","",""],
    "ultimate_gameplay_A2": ["STADIA & GEFORCE NOW","Game Dashboard & Optimizer","",""],
    "advanced_gameplay": ["FreeSync Premium","STADIA & GEFORCE NOW","Game Dashboard & Optimizer", ""],

    "full_line_view": ["","","",""],
    "sound_80w": ["","","",""],
    "selective_textile_colors": ["","","",""],
    "rotate_tilt_swivel": ["","","",""],
    "wireless_battery": ["","","",""],
    "wheels_5": ["","","",""],
    "nfc_mirroring": ["","","",""],
    "touch_screen": ["","","",""],
    "remote_controller": ["","","",""],
    "swivel": ["","","",""],

    //AV
    "immersive_810w": ["","","",""],
    "plug_wireless": ["","","",""],
    "enhanced_anc" : ["","","",""],
    "uv_nano_charging_case" : ["","","",""],
    "sleek_fit" : ["","","",""],
    "wireless_charging" : ["","","",""],
    "authentic_360_omnidirectional_sound" : ["","","",""],
    "inch_525_glass_fiber_woofer" : ["","","",""],
    "inch_1_titanium_horn_tweeter" : ["","","",""],
    "dj_effects" : ["","","",""],
    "gaming_sound_3d_gp9" : ["","","",""],
    "gaming_sound_3d_gp3" : ["","","",""],
    "dts_headphone_x_gp9" : ["","","",""],
    "dts_headphone_x_gp3" : ["","","",""],
    "hi_fi_quad_dac" : ["","","",""],
    "customizable_precision_eq_sound_gp9" : ["","","",""],
    "customizable_precision_eq_sound_gp3" : ["","","",""],
    "built_in_mic_clear_voice" : ["","","",""]
}


var models = {
    //TV Object
    "R1" : {
        "title": "LG SIGNATURE",
        "size": ["65"],
        "dimension": {
            "65\"": ["Full View: 1,592 x 1,276 x 266", "Zero View: 1,592 x 450 x 266",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active\">65\"</button>"
        ],
        "img": {
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/R1_65.jpg"
        },
        "webgl": {
            "65\"": "65r1"
        }
    },
    "Z2" : {
        "title": "LG SIGNATURE",
        "size": ["88", "77"],
        "dimension": {
            "88\"": ["1,961 x 1,120 x 49.9(Without stand)", "1,961 x 1,456 x 281(With stand)",""],
            "77\"": ["1,717 x 984 x 32.2(Without stand)", "1,717 x 1,044 x 323(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active\">88\"</button>",
            "<button type=\"button\">77\"</button>"
        ],
        "img": {
            "88\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/Z2_88.jpg",
            "77\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/Z2_77.jpg"
        },
        "webgl": {
            "88\"": "88z2",
            "77\"": "77z2"
        }
    },
    "G2" : {
        "title": "OLED evo",
        "size": ["83", "97", "77", "65", "55"],
        "dimension": {
            "97\"": ["1,847 x 1,052 x 28(Without stand)", "1,847 x 1,115 x 321(With stand)",""],
            "83\"": ["1,847 x 1,052 x 28(Without stand)", "1,847 x 1,115 x 321(With stand)",""],
            "77\"": ["1,851 x 1,055 x 52.3(Without stand)", "1,851 x 1,222 x 279(With stand)",""],
            "65\"": ["1,441 x 826 x 24.3(Without stand)", "1,441 x 878 x 245(With stand)",""],
            "55\"": ["1,851 x 1,033 x 54.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">97\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">83\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">77\"</button>",
            "<button type=\"button\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">55\"</button>"
        ],
        "img": {
            "83\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/G2_83.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/G2_65.jpg"
        },
        "webgl": {
            "97\"": "83g2",
            "83\"": "83g2",
            "77\"": "83g2",
            "65\"": "65g2",
            "55\"": "83g2"
        }
    },
    "C2" : {
        "title" : "OLED evo",
        "size" : ["83", "77", "65", "55", "48", "42"],
        "dimension" : {
            "83\"": ["1,851 x 1,062 x 55.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""],
            "77\"": ["1,851 x 1,055 x 52.3(Without stand)", "1,851 x 1,222 x 279(With stand)",""],
            "65\"": ["1,441 x 827 x 44.9(Without stand)", "1,441 x 878 x 215(With stand)",""],
            "55\"": ["1,851 x 1,033 x 54.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""],
            "48\"": ["1,071 x 618 x 47(Without stand)", "1,071 x 650 x 251(With stand)",""],
            "42\"": ["932 x 540 x 40.9(Without stand)", "932 x 577 x 170(With stand)",""]
        },
        "sizetag" : [
            "<button type=\"button\" class=\"model_size_btn_active\">83\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">77\"</button>",
            "<button type=\"button\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">55\"</button>",
            "<button type=\"button\">48\"</button>",
            "<button type=\"button\">42\"</button>"
        ],
        "img" : {
            "83\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/C2_83.jpg",
            "77\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/C2_77.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/C2_65.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/C2_55.jpg",
            "48\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/C2_48.jpg",
            "42\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/C2_42.jpg"
        },
        "webgl" : {
            "83\"": "83c2",
            "77\"": "83c2",
            "65\"": "65c2",
            "55\"": "83c2",
            "48\"": "48c2",
            "42\"": "42c2"
        }
    },
    "B2" : {
        "title": "OLED",
        "size": ["65", "77", "55"],
        "dimension": {
            "77\"": ["1,851 x 1,055 x 52.3(Without stand)", "1,851 x 1,222 x 279(With stand)",""],
            "65\"": ["1,449 x 830 x 46.9(Without stand)", "1,449 x 869 x 246(With stand)",""],
            "55\"": ["1,851 x 1,033 x 54.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">77\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">55\"</button>"
        ],
        "img": {
            "77\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/B2_77.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/B2_65.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/B2_55.jpg"
        },
        "webgl": {
            "77\"": "65b2",
            "65\"": "65b2",
            "55\"": "65b2"
        }
    },
    "A2" : {
        "title": "OLED",
        "size": ["65", "77", "55", "48"],
        "dimension": {
            "77\"": ["1,851 x 1,055 x 52.3(Without stand)", "1,851 x 1,222 x 279(With stand)",""],
            "65\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "55\"": ["1,851 x 1,033 x 54.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""],
            "48\"": ["1,851 x 1,012 x 55.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">77\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">55\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">48\"</button>"
        ],
        "img": {
            "77\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/A2_77.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/A2_65.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/A2_55.jpg",
            "48\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/oled/A2_48.jpg"
        },
        "webgl": {
            "77\"": "65a2",
            "65\"": "65a2",
            "55\"": "65a2",
            "48\"": "65a2"
        }
    },
    "QNED99" : {
        "title": "QNED MiniLED",
        "size": ["86", "75", "65"],
        "dimension": {
            "86\"": ["1,918 x 1,097 x 30.5(Without stand)", "1,918 x 1,161 x 358(With stand)",""],
            "75\"": ["1,665 x 958 x 29.5(Without stand)", "1Pole: 1,665 x 1,032 x 405\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,665 x 1,022 x 359",""],
            "65\"": ["1,665 x 958 x 29.5(Without stand)", "1Pole: 1,665 x 1,032 x 405\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,665 x 1,022 x 359",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active\">86\"</button>",
            "<button type=\"button\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">65\"</button>"
        ],
        "img": {
            "86\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/86QNED99.jpg",
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/75QNED99.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/A2_55.jpg"
        },
        "webgl": {
            "86\"": "86qned99",
            "75\"": "75qned99",
            "65\"": "86qned99"
        }
    },
    "QNED95" : {
        "title": "QNED MiniLED",
        "size": ["75", "65"],
        "dimension": {
            "75\"": ["1,665 x 958 x 29.5(Without stand)", "1Pole: 1,665 x 1,032 x 405\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,665 x 1,022 x 359",""],
            "65\"": ["1,665 x 958 x 29.5(Without stand)", "1Pole: 1,665 x 1,032 x 405\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,665 x 1,022 x 359",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">65\"</button>"
        ],
        "img": {
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/75QNED95.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/75QNED95.jpg"
        },
        "webgl": {
            "75\"": "75qned95",
            "65\"": "75qned95"
        }
    },
    "QNED90" : {
        "title": "QNED MiniLED",
        "size": ["86", "75", "65"],
        "dimension": {
            "86\"": ["1,917 x 1,097 x 30.5(Without stand)", "1,918 x 1,162 x 358(With stand)",""],
            "75\"": ["1,665 x 958 x 29.5(Without stand)", "1Pole: 1,665 x 1032 x 405\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,665 x 1,022 x 359",""],
            "65\"": ["1,665 x 958 x 29.5(Without stand)", "1Pole: 1,665 x 1032 x 405\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,665 x 1,022 x 359",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active\">86\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">65\"</button>"
        ],
        "img": {
            "86\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/86QNED90.jpg",
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/75QNED90.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/A2_55.jpg"
        },
        "webgl": {
            "86\"": "86qned90",
            "75\"": "86qned90",
            "65\"": "86qned90"
        }
    },
    "QNED85" : {
        "title": "QNED MiniLED",
        "size": ["75", "86", "65", "55"],
        "dimension": {
            "86\"": ["1,673 x 963 x 44.9(Without stand)", "1,673 x 1,029 x 359(With stand)",""],
            "75\"": ["1,673 x 963 x 44.9(Without stand)", "1,673 x 1,029 x 359(With stand)",""],
            "65\"": ["1,673 x 963 x 44.9(Without stand)", "1,673 x 1,029 x 359(With stand)",""],
            "55\"": ["1,673 x 963 x 44.9(Without stand)", "1,673 x 1,029 x 359(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">86\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">55\"</button>"
        ],
        "img": {
            "86\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/75QNED85.jpg",
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/75QNED85.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/A2_55.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/A2_55.jpg"
        },
        "webgl": {
            "86\"": "75qned85",
            "75\"": "75qned85",
            "65\"": "75qned85",
            "55\"": "75qned85"
        }
    },
    "QNED80" : {
        "title": "QNED",
        "size": ["75", "86", "65", "55"],
        "dimension": {
            "86\"": ["1,675 x 964 x 44.5(Without stand)", "1,675 x 1,029 x 359(With stand)",""],
            "75\"": ["1,675 x 964 x 44.5(Without stand)", "1,675 x 1,029 x 359(With stand)",""],
            "65\"": ["1,675 x 964 x 44.5(Without stand)", "1,675 x 1,029 x 359(With stand)",""],
            "55\"": ["1,675 x 964 x 44.5(Without stand)", "1,675 x 1,029 x 359(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">86\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">55\"</button>"
        ],
        "img": {
            "86\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/A2_65.jpg",
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/75QNED80.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/A2_55.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/qned/A2_55.jpg"
        },
        "webgl": {
            "86\"": "75qned80",
            "75\"": "75qned80",
            "65\"": "75qned80",
            "55\"": "75qned80"
        }
    },
    "NANO80" : {
        "title": "NanoCell",
        "size": ["65", "75", "55", "50"],
        "dimension": {
            "75\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""],
            "65\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""],
            "55\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""],
            "50\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">55\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">50\"</button>"
        ],
        "img": {
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_65.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/65nano80.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_65.jpg",
            "50\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_65.jpg"
        },
        "webgl": {
            "75\"": "65nano80",
            "65\"": "65nano80",
            "55\"": "65nano80",
            "50\"": "65nano80"
        }
    },
    "NANO75" : {
        "title": "NanoCell",
        "size": ["65", "86", "75", "70", "55", "50", "43"],
        "dimension": {
            "86\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""],
            "75\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""],
            "70\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""],
            "65\"": ["1,454 x 838 x 58.4(Without stand)", "1,454 x 900 x 271(With stand)",""],
            "55\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""],
            "50\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""],
            "43\"": ["1,452 x 839 x 44.3(Without stand)", "1,452 x 906 x 295(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">86\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">70\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">55\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">50\"</button>"
            // "<button type=\"button\" class=\"model_size_btn_inactive\">43\"</button>"
        ],
        "img": {
            "86\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_65.jpg",
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_55.jpg",
            "70\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_55.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/65nano75.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_65.jpg",
            "50\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_65.jpg",
            "43\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/nano/A2_65.jpg"
        },
        "webgl": {
            "86\"": "65nano75",
            "75\"": "65nano75",
            "70\"": "65nano75",
            "65\"": "65nano75",
            "55\"": "65nano75",
            "50\"": "65nano75",
            "43\"": "65nano75"
        }
    },
    "UQ90" : {
        "title": "UHD",
        "size": ["86", "75", "70", "65", "55", "50", "43"],
        "dimension": {
            "86\"": ["1,927 x 1,104 x 59.9(Without stand)", "1Pole: 1,927 x 1,178 x 425\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,927 x 1,170 x 361",""],
            "75\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "70\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "65\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "55\"": ["1,235 x 715 x 57.5(Without stand)", "1Pole: 1,235 x 787 x 260\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,235 x 772 x 232",""],
            "50\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "43\"": ["1,851 x 1,033 x 54.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active UQ90_86_btn\">86\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">70\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">60\"</button>",
            "<button type=\"button\" class=\"UQ90_55_btn\">55\"</button>"
            /*"<button type=\"button\" class=\"model_size_btn_inactive\">50\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">43\"</button>"*/
        ],
        "img": {
            "86\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/86UQ90.jpg",
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "70\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "60\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/55UQ90.jpg",
            "50\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_55.jpg",
            "43\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_55.jpg"
        },
        "webgl": {
            "86\"": "86uq90",
            "75\"": "55uq90",
            "70\"": "55uq90",
            "65\"": "55uq90",
            "60\"": "55uq90",
            "55\"": "55uq90",
            "50\"": "55uq90",
            "43\"": "55uq90"
        }
    },
    "UQ80" : {
        "title": "UHD",
        "size": ["55", "75", "70", "65", "60", "50", "43"],
        "dimension": {
            "75\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "70\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "65\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "60\"": ["1,235 x 715 x 57.5(Without stand)", "1Pole: 1,235 x 787 x 260\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,235 x 772 x 232",""],
            "55\"": ["1,235 x 715 x 57.5(Without stand)", "1Pole: 1,235 x 787 x 260\u00A0\u00A0\u00A0\u00A0\u00A0\u00A02Pole: 1,235 x 772 x 232",""],
            "50\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "43\"": ["1,851 x 1,033 x 54.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">70\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">60\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">55\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">50\"</button>"
            /*"<button type=\"button\" class=\"model_size_btn_inactive\">43\"</button>"*/
        ],
        "img": {
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "70\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "60\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/55UQ80.jpg",
            "50\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_55.jpg",
            "43\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_55.jpg"
        },
        "webgl": {
            "75\"": "55uq80",
            "70\"": "55uq80",
            "65\"": "55uq80",
            "60\"": "55uq80",
            "55\"": "55uq80",
            "50\"": "55uq80",
            "43\"": "55uq80"
        }
    },
    "UQ75" : {
        "title": "UHD",
        "size": ["55", "75", "70", "65", "50", "43"],
        "dimension": {
            "75\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "70\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "65\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "55\"": ["1,244 x 726 x 87.1(Without stand)", "1,244 x 786 x 231(With stand)",""],
            "50\"": ["1,449 x 832 x 45.9(Without stand)", "1,449 x 896 x 235(With stand)",""],
            "43\"": ["1,851 x 1,033 x 54.3(Without stand)", "1,851 x 1,092 x 279(With stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_inactive\">75\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">70\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">65\"</button>",
            "<button type=\"button\" class=\"model_size_btn_active\">55\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">50\"</button>",
            "<button type=\"button\" class=\"model_size_btn_inactive\">43\"</button>"
        ],
        "img": {
            "75\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "70\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_65.jpg",
            "55\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/55UQ75.jpg",
            "50\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_55.jpg",
            "43\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/uhd/A2_55.jpg"
        },
        "webgl": {
            "75\"": "55uq75",
            "70\"": "55uq75",
            "65\"": "55uq75",
            "55\"": "55uq75",
            "50\"": "55uq75",
            "43\"": "55uq75"
        }
    },
    "ART90" : {
        "title": "<img src='./images/main/logo/lg_objet_logo.jpg'>",
        "size": ["65"],
        "dimension": {
            "65\"": ["1,462 x 1,568 x 52.8", "",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active art90_size_btn\">65\"</button><br>"
        ],
        "img": {
            "65\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/lifestyle/ART90.jpg"
        },
        "webgl": {
            "65\"": "65art90"
        }
    },
    "ART10" : {
        "title": "<img src='./images/main/logo/lg_stanby_me.jpg'>",
        "size": ["27"],
        "dimension": {
            "27\"": ["Vertical mode: 361 x 621(Head)\u00A0\u00A0\u00A0\u00A01,195~1,395(Stand)", "Horizontal mode: 621 x 361(Head)\u00A0\u00A0\u00A0\u00A01,065~1,265(Stand)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active\">27\"</button>"
        ],
        "img": {
            "27\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/lifestyle/ART10.jpg"
        },
        "webgl": {
            "27\"": "27art10"
        }
    },



    //AV
    "S95QR" : {
        "title": "Sound Bar",
        "size": [""],
        "dimension": {
            "\"": ["1,200 x 63 x 135(Main Body)", "221 x 390 x 312.8(Woofer)", "100 x 140 x 100(Rear Speaker)"]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S95QR.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S95QR.jpg"
        },
        "webgl": {
            "\"": "s95qr"
        }
    },
    "S80QR" : {
        "title": "Sound Bar",
        "size": [""],
        "dimension": {
            "\"": ["1,000 x 63 x 135(Main Body)", "221 x 390 x 312.8(Woofer)", "100 x 140 x 100(Rear Speaker)"]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S80QY.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S80QY.jpg"
        },
        "webgl": {
            "\"": "s80qy"
        }
    },
    "S75Q" : {
        "title": "Sound Bar",
        "size": [""],
        "dimension": {
            "\"": ["890 x 65 x 119(Main Body)", "180 x 394 x 290(Woofer)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>",
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S75Q.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S75Q.jpg"
        },
        "webgl": {
            "\"": "s75q"
        }
    },
    "S65Q" : {
        "title": "Sound Bar",
        "size": [""],
        "dimension": {
            "\"": ["1,000 x 63 x 135(Main Body)", "180 x 394 x 290(Woofer)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>",
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S65Q.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S65Q.jpg"
        },
        "webgl": {
            "\"": "s65q"
        }
    },
    "S40Q" : {
        "title": "Sound Bar",
        "size": [""],
        "dimension": {
            "\"": ["760 x 63 x 90(Main Body)", "171 x 390 x 261(Woofer)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S40Q.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S40Q.jpg"
        },
        "webgl": {
            "\"": "s40q"
        }
    },
    "S60Q" : {
        "title": "Sound Bar",
        "size": [""],
        "dimension": {
            "\"": ["760 x 63 x 90(Main Body)", "171 x 390 x 261(Woofer)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S60Q.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/S60Q.jpg"
        },
        "webgl": {
            "\"": "s60q"
        }
    },
    "SH7Q" : {
        "title": "Sound Bar",
        "size": [""],
        "dimension": {
            "\"": ["1,200 x 97 x 141(Main Body)", "171 x 390 x 261(Woofer)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/SH7Q.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/SH7Q.jpg"
        },
        "webgl": {
            "\"": "sh7q"
        }
    },
    "G1" : {
        "title": "Sound Bar",
        "size": [""],
        "dimension": {
            "\"": ["1,225 x 150 x 32.5(Main Body)", "180 x 394 x 290(Woofer)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/G1.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/G1.jpg"
        },
        "webgl": {
            "\"": "g1"
        }
    },
    "QP5" : {
        "title": "Sound Bar – Éclair",
        "size": [""],
        "dimension": {
            "\"": ["296 x 59.9 x 126(Main Body)", "388 x 291 x 185(Woofer)",""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_white\">White</button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_beige\">Beige</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/QP5-2.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/QP5-2.jpg",
            "White": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/QP5-1.jpg",
            "Beige": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/QP5-3.jpg"
        },
        "webgl": {
            "\"": "qp5"
        }
    },
    "WTP3" : {
        "title": "WOWCAST",
        "size": [""],
        "dimension": {
            "\"": ["85 x 13 x 65", "", ""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/WTP3.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/WTP3.jpg"
        },
        "webgl": {
            "\"": "wpt3"
        }
    },
    "RP4" : {
        "title": "XBOOM 360",
        "size": [""],
        "dimension": {
            "\"": ["249 x 513 x 249", "", ""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_beige\">Beige</button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_burgundy\">Burgundy</button><br>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_charcoal_black\">Charcoal Black</button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_peacock_green\">Peacock Green</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/RP4-4.jpg",
            "Beige": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/RP4-4.jpg",
            "Burgundy": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/RP4-3.jpg",
            "Charcoal Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/RP4-2.jpg",
            "Peacock Green": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/RP4.jpg"
        },
        "webgl": {
            "\"": "rp4"
        }
    },
    "GP9" : {
        "title": "UltraGear Gaming Speaker",
        "size": [""],
        "dimension": {
            "\"": ["376 x 106.8 x 82.9", "", ""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/GP9.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/GP9.jpg"
        },
        "webgl": {
            "\"": "gp9"
        }
    },
    "GP3" : {
        "title": "UltraGear Gaming Speaker",
        "size": [""],
        "dimension": {
            "\"": ["330 x 93 x 71", "", ""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_black\">Black</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/GP3.jpg",
            "Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/GP3.jpg"
        },
        "webgl": {
            "\"": "gp3"
        }
    },
    "FP9" : {
        "title": "TONE Free",
        "size": [""],
        "dimension": {
            "\"": ["21.2 x 28.3 x 23.2(Earbuds)", "54.5 x 54.5 x 30(Cradle)", ""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_charcoal_black\">Charcoal Black</button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_haze_gold\">Haze Gold</button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_pearl_white\">Pearl White</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/FP9-2.jpg",
            "Charcoal Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/FP9-2.jpg",
            "Haze Gold": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/FP9-3.jpg",
            "Pearl White": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/FP9-1.jpg"
        },
        "webgl": {
            "\"": "fp9"
        }
    },
    "FP8" : {
        "title": "TONE Free",
        "size": [""],
        "dimension": {
            "\"": ["21.2 x 28.3 x 23.2(Earbuds)", "54.5 x 54.5 x 30(Cradle)", ""]
        },
        "sizetag": [
            "<button type=\"button\" class=\"model_size_btn_active av_size_none\"></button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_charcoal_black\">Charcoal Black</button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_haze_gold\">Haze Gold</button>",
            "<button type=\"button\" class=\"model_size_btn_active av_size_btn av_pearl_white\">Pearl White</button>"
        ],
        "img": {
            "\"": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/FP8-2.jpg",
            "Charcoal Black": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/FP8-2.jpg",
            "Haze Gold": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/FP8-3.jpg",
            "Pearl White": "https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/images/main/infill/av/FP8-1.jpg"
        },
        "webgl": {
            "\"": "fp8"
        }
    }
}
function videoGallery(){
    var $tvFirstVideo = $("#tv_first_video");
    var $avFirstVideo = $("#av_first_video");
    var $videoListTap = $(".product_profile_contents .tab");
    var $videoIframe = $(".video_iframe");
    var $tabTVContents = $(".tab_tv_contents");
    var $tabAVContents = $(".tab_av_contents");
    var $tabTV = $(".tab_tv");
    var $tabAV = $(".tab_av");

    var pptNum = $tvFirstVideo.find(".title_01").text();
    var pptTitle = $tvFirstVideo.find(".title_02").text();

    //url parameter 값에 대한 active
    if(window.location.search === "?param=tv"){
        $tabTV.addClass("active");
    }
    if(window.location.search === "?param=av"){
        $tabAV.addClass("active");
        $(".tab_av_contents").css("z-index","1");
    }

    $tabTV.on("click",function(){
        $tabTVContents.css("display","block");
        $tabAVContents.css("display","none");
        $videoListTap.find("button").removeClass("active");
        $videoListTap.find(".tab_tv").addClass("active");
        $videoIframe.attr("src",iframeArrTV[0]);
        $tvFirstVideo.addClass("active");
        $selectVideo.find(".title_01").text(pptNum);
        $selectVideo.find(".title_02").text(pptTitle);
    });
    $tabAV.on("click",function(){
        $tabTVContents.css("display","block");
        $tabAVContents.css("display","none");
        $videoListTap.find("button").removeClass("active");
        $videoListTap.find(".tab_av").addClass("active");
        $videoIframe.attr("src",iframeArrAV[0]);
        $avFirstVideo.addClass("active");
        $selectVideo.find(".title_01").text(pptNum);
        $selectVideo.find(".title_02").text(pptTitle);
    });

    var $selectVideo = $(".select_video");
    var $tabContents = $(".tab_contents");
    var $tabContentsList = $tabContents.find("li");
    var $tabTVContentsList = $tabTVContents.find("li");
    var $tabAVContentsList = $tabAVContents.find("li");
    var iframeArrTV = [
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/618654481?quality=1080p",
        "https://docs.google.com/presentation/d/e/2PACX-1vTtwMnI6YN_ixqGuN0_jdiV1_vFyc4o3WwZzOqpwHuBMldmlzN9KRAa9sdt5gD37ESGHqK_y_w-i-i4/embed?start=false&loop=false&delayms=3000",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470069126?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469655775?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/495674227?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/502002998?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/502947980?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469650847?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469654323?quality=4K",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469651492?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469654865?quality=4K",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469652039?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469653342?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469653911?quality=4K",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469652355?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469654270?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469653805?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/469652864?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470863551?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/497188847?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470069339?quality=1080p"
    ];
    var iframeArrAV = [
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/477443517?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470056648?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470057367?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470058262?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470058747?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470059355?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470064434?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470108668?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470064536?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/470064682?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/477903252?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/491494774?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/491494890?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/495685701?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/491495082?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/495955401?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/495955473?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/495955876?quality=1080p",
        "https://player.vimeo.com/https://d1wl83prm6u37g.cloudfront.net/lgvirtualstudio-2021/video/495954905?quality=1080p"
    ];

    var slideIframeTV = [
        "https://docs.google.com/presentation/d/e/2PACX-1vTtwMnI6YN_ixqGuN0_jdiV1_vFyc4o3WwZzOqpwHuBMldmlzN9KRAa9sdt5gD37ESGHqK_y_w-i-i4/embed?start=false&loop=false&delayms=3000",
        "https://docs.google.com/presentation/d/e/2PACX-1vTtwMnI6YN_ixqGuN0_jdiV1_vFyc4o3WwZzOqpwHuBMldmlzN9KRAa9sdt5gD37ESGHqK_y_w-i-i4/embed?start=false&loop=false&delayms=3000",
        "https://docs.google.com/presentation/d/e/2PACX-1vTtwMnI6YN_ixqGuN0_jdiV1_vFyc4o3WwZzOqpwHuBMldmlzN9KRAa9sdt5gD37ESGHqK_y_w-i-i4/embed?start=false&loop=false&delayms=3000"
    ];
    var slideIframeAV = [
        "https://docs.google.com/presentation/d/e/2PACX-1vTtwMnI6YN_ixqGuN0_jdiV1_vFyc4o3WwZzOqpwHuBMldmlzN9KRAa9sdt5gD37ESGHqK_y_w-i-i4/embed?start=false&loop=false&delayms=3000",
        "https://docs.google.com/presentation/d/e/2PACX-1vTtwMnI6YN_ixqGuN0_jdiV1_vFyc4o3WwZzOqpwHuBMldmlzN9KRAa9sdt5gD37ESGHqK_y_w-i-i4/embed?start=false&loop=false&delayms=3000",
        "https://docs.google.com/presentation/d/e/2PACX-1vTtwMnI6YN_ixqGuN0_jdiV1_vFyc4o3WwZzOqpwHuBMldmlzN9KRAa9sdt5gD37ESGHqK_y_w-i-i4/embed?start=false&loop=false&delayms=3000"
    ];

    $tabContents.find("li").on("click",function(){
        var pptNum = $(this).find(".title_01").text();
        var pptTitle = $(this).find(".title_02").text();
        $selectVideo.find(".title_01").text(pptNum);
        $selectVideo.find(".title_02").text(pptTitle);
    })

    var $tabAVContentsListIndex;
    var $slideShowWrapIframe = $(".slide_show_wrap iframe");
    var $slideShowBtn = $(".slide_show_btn");
    var $slideShowPopup = $(".slide_show_popup");

    $tabAVContentsList.on("click",function(){
        $tabAVContentsListIndex = $tabAVContentsList.index(this);
        $videoIframe.attr("src",iframeArrAV[$tabAVContentsListIndex]);
        if($(".tab_av").hasClass("active")){
            $slideShowWrapIframe.attr("src", slideIframeAV[$tabAVContentsListIndex]);
        }
    })

    var $tabTVContentsListIndex;
    $tabTVContentsList.on("click",function(){
        $tabTVContentsListIndex = $tabTVContentsList.index(this);
        $videoIframe.attr("src",iframeArrTV[$tabTVContentsListIndex]);
        if($(".tab_tv").hasClass("active")){
            $slideShowWrapIframe.attr("src", slideIframeTV[$tabTVContentsListIndex]);
        }

        if($tabTVContentsListIndex === 0){
            $slideShowBtn.css({display:"block"});
        } else {
            $slideShowBtn.css({display:"none"});
        }
    })

    $tabContentsList.on("click",function(){
        $tabContentsList.removeClass("active");
        $(this).addClass("active");
    })

    $slideShowBtn.on("click",function(){
        $slideShowPopup.css("display","block");
    })
    $(".close_btn").on("click",function(){
        $slideShowPopup.css("display","none");
    })
}
