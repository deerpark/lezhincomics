/*!
 * jQuery slice v1.0.0
 * Copyright(c) 2017-2017 Kim Yongman <ji9@me.com>
 * MIT Licensed
 */

(function($){
    $.fn.slice = function(options){
        return this.each(function(){

            var settings = $.extend({
                num : 3, // default 3
                className: 'slice',
                restore : false,
                callback : function(){}
            },options);

            var
            children = $(this).children(),
            count = 0,
            temp = [];

            if($(this).find('.'+settings.className).length==0 && settings.restore == false) {
                // slice
                children.each(function(i,el){
                    if(i%settings.num == 0) {
                        temp[count] = $('<div/>',{class:settings.className});
                    }
                    temp[count].append($(this).clone());
                    if((i%settings.num == settings.num-1 && i > 0) || i == children.length-1) {
                        count++;
                    }
                });
                children.remove();
                $(this).append(temp);
                settings.callback();

            } else if(settings.restore==true) {
                // unslice
                $(this).find('.'+settings.className).children().unwrap();
                settings.restore = false;
            }
        });
    }
})(jQuery);

function mediaDetect() {
    var mq = window.matchMedia( '(max-width: 767px)' ),
    w = $(window);
    if (mq.matches) {
        if(!w.data('is-mobile')) {
            w.data('is-mobile', true);
            w.data('is-desktop', false);
            $(function(){
                $('.type-mixed').slice({
                    callback: function(){
                        $.sliderMixed = $('.type-mixed').lightSlider({
                            item: 1,
                            slideMargin: 0,
                            controls: false,
                            loop: true,
                            pager: false
                        });
                        $.sliderDefault = $('.type-default').lightSlider({
                            item: 4,
                            slideMargin: 4,
                            controls: false,
                            pager: false
                        });
                        $.sliderCompact = $('.section-new .type-compact').lightSlider({
                            item: 4,
                            slideMargin: 4,
                            controls: false,
                            pager: false
                        });
                        $.sliderPoster = $('.type-poster').lightSlider({
                            item: 3,
                            slideMargin: 4,
                            controls: false,
                            pager: false
                        });
                    }
                });
            });
        }
        if($.sliderMixed)  {
            $.sliderMixed.refresh();
            $.sliderDefault.refresh();
            $.sliderCompact.refresh();
            $.sliderPoster.refresh();
        }
    } else {
        if(!w.data('is-desktop')) {
            w.data('is-desktop', true);
            w.data('is-mobile', false);
            $(function(){$('.type-mixed').slice({restore:true});});
            if($.sliderMixed)  {
                $.sliderMixed.destroy();
                $.sliderDefault.destroy();
                $.sliderCompact.destroy();
                $.sliderPoster.destroy();
            }
        }
    }
}

$(function(){
    mediaDetect();
});

$(window).on('resize', function(){
    mediaDetect();
});