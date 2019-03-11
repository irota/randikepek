function MailStream($) {

    var self = this;

    this.inGetArea = false;
    this.oldMessagesGet = false;
    this.lastText = '';
    this.attachedImgID = '';
    this.attachedImgClickAllow = true;
    this.draftL = null;
    this.noScrollList = false;
    this.noScrollListT = null;
    this.lastDraft = $('#MailStreamReplyOpener').val();
    this.lastDraftID = '';
    this.lastDocHeight = 0;
    this.lastSHeight = 0;
    this.scollPosBefFocus = false;
    this.isIOS = $('body').hasClass('ios');

    this.statusCTimer = null;
    this.statusReq = false;
    this.bubbleMsg = new Array();
    this.bubbleOn = false;

    this.init = function () {

        this.bindTestOpener();
        this.bindSMSOpener();
        this.bindMessageSend();

        this.bindAttach();

        this.bindDraftListener();

        this.autoGrow();
        this.closeHead();

        this.bindOpen();
        this.bindClose();
        this.attachbtnclose();
        if ($(".levelezes_adatlaprol").attr('data-auto-open') == "1") {
            this.showBubbleMsg();
        }

        this.bindResizeListener();
    }

    this.bindOpen = function () {

        $('.mail-bubble, .js-mailPureOpener').click(function (e) {

            $('.villam_sticky').hide();

            /*
            e.preventDefault();
            $('.js-pureLetterWrite').show();
            self.setTextareaH();
            $('.js-pureLetterWrite').hide();
            $('.js-pureLetterWrite').addClass('slide-top').show();
            return;
           */
            if (!$(this).parent().attr('href')) {
                e.preventDefault();
                if (!$(this).parent().hasClass('js-writeDisabled')) {
                    $('.js-pureLetterWrite').show();
                    self.setTextareaH();
                    $('.js-pureLetterWrite').hide();
                    $('.js-pureLetterWrite').addClass('slide-top').show();
                }
            }
        });

    }

    this.bindClose = function () {

        $('.js-pureLetterWrite .level-write-close').click(function (e) {
            e.preventDefault();
            $('.js-pureLetterWrite').removeClass('slide-top').hide();
            setTimeout(function(){
                self.resetWrapperHeight();
                $('.villam_sticky').show();
            },100);
        });

    }


    this.closeHead = function () {


        $$('.head-back a').addEvent('click', function (e) {
            if ($$('.levelfolyam-17-teszt')[0].getStyle('opacity') == '1') {
                e.stop();
                $('.levelfolyam-17-write').toggle();
                $('.levelfolyam-17-cont').hide();
                $('.levelfolyam-17-head').show();
                $('.levelfolyam-17-teszt').css('opacity', '0');
                setTimeout(function () {
                    $('.levelfolyam-17-teszt').hide();
                    $('.header').toggle();
                    $('.content').toggle();
                    $('.footer-wrapper').toggle();
                }, 1);
            }
        });


    }

    this.autoGrow = function () {

        $('#MailStreamReplyOpener').keyup(function () {
            self.setTextareaH();
            self.setWrapperHeight();
        });

    }

    this.setTextareaH = function (param) {
        $('#MailStreamReplyOpener').css('height', 40);
        var ss = $('#MailStreamReplyOpener')[0].scrollHeight;
        var ch = $('#MailStreamReplyOpener').height();
        if (ch < ss) {
            $('#MailStreamReplyOpener').css('height', ss + 2);
        }
    }

    this.resetWrapperHeight = function(){
        if(window.innerWidth < 640 && $('.dev-touch').length){
            $('.awrapper').css('height', window.innerHeight);
        }
    }

    this.setWrapperHeight = function(){

        if(window.innerWidth < 640 && $('.dev-touch').length){
            $('.awrapper').css('height', window.innerHeight - $('.levelfolyam-17-write').outerHeight());
        }
        //var info = window.innerHeight + ' - ' + document.documentElement.clientHeight + ' - ' + window.screen.height;
        //$('#MailStreamReplyOpener').html( info + ' - ' + $.now());
    }

    this.bindResizeListener = function(){
        $(window).resize(function(){
            self.setWrapperHeight();
        });
    }

    this.bindDraftListener = function () {


        $('#MailStreamReplyOpener').focus(function () {

            self.setWrapperHeight();

            if ($('.js-attchBack:visible').length) {
                $('.js-attchBack').click();
            }

            self.scollPosBefFocus = true;

            if (self.draftL) {
                return;
            }

            self.draftL = setInterval(function () {
                self.checkDraft();
            }, 1000 * 10);

        });

        var st = null;

        //self.resetWrapperHeight(); //Ezt most kivettem, hĂĄtha segĂ­t Gyurinak
        $('#MailStreamReplyOpener').focusout(function (e, param) {

            self.resetWrapperHeight();

            clearTimeout(st);
            st = setTimeout(function () {
                self.scollPosBefFocus = false;
                //self.setTextareaH(param);
            }, 100);
        });
        /**/
    }

    this.checkDraft = function () {

        var actDraft = $('#MailStreamReplyOpener').val();

        if (actDraft == self.lastDraft) {
            return;
        }

        self.lastDraft = actDraft;

        $('.draft-saving').fadeIn();

        $.ajax({
            'url': $('#MailStreamReplyOpener').data('draft-url'),
            'method': 'post',
            'data': {
                'postdata': {
                    'action': 'savedraft',
                    'replyto': $('[name="replyto"]').val(),
                    'userid': $('#HirfolyamUserID').val(),
                    'data': JSON.stringify({
                        'maildraftid': self.lastDraftID,
                        'csatolas': self.attachedImgID,
                        'mailszoveg': actDraft
                    })
                }
            }
        }).done(function (resp) {

            resp = jQuery.parseJSON(resp.replace('for(;;);', ''));
            self.lastDraftID = resp.maildraftid;

            setTimeout(function () {
                $('.draft-saving').hide();
                $('.draft-saved').fadeIn().delay(2000).fadeOut();
            }, 1000);
        }).fail(function () {
            $('.draft-saving').hide();
            $('.draft-saved').fadeIn().delay(2000).fadeOut();
        });

    }

    this.bindAttach = function () {

        $('.js-attachImg').click(function () {
            //$('.level-write-text, .level-write-action').hide();
            $('.js-attachImg').css('display','none');
            $('.js-attchBack').css('display','block');
            $('.level-write-attach, .js-openKeyboard').css('display','block');
        });

        $('.js-attchBack').click(function () {
            $('.level-write-attach, .js-openKeyboard, .js-attchBack').css('display','none');
            $('.level-write-text, .level-write-action, .js-attachImg').css('display','block');
        });

        $('.js-openKeyboard').click(function () {
            $('.level-write-attach, .js-openKeyboard').css('display');
            $('.js-attachImg').css('display','block');
        });

        $('.js-aImg').click(function (e) {
            e.preventDefault();

            if (!self.attachedImgClickAllow) {
                return;
            }

            $('.js-aImgCont img').attr('src', $(this).find('img').attr('src').replace('_t','_480x480'));

            self.attachedImgID = $(this).data('id');

            $('.level-write-attach, .js-openKeyboard, .js-attchBack').css('display','none');
            $('.level-write-text, .level-write-action, .js-aImgCont').css('display','block');

        });

        $('.js-aImgCont').click(function (e) {
            e.preventDefault();
            self.removeAttach();
        });


        this.bindSlider();
        //this.bindDragPhoto();

    }

    this.bindDragPhoto = function () {

        if ($('.js-aImg').length < 3) {
            return;
        }

        $('.level-write-attach').show();
        var boxW = $('.dragUl li').outerWidth(true) + parseInt($('.dragUl li').css('margin-right'));
        var tWidth = $('.dragUl li').length * boxW;
        $('.level-write-attach').hide();

        var contWidth = $('.attach-images').width();

        $('.dragUlCont').css({
            "width": tWidth + (tWidth - contWidth) + 'px',
            "position": 'relative',
            'left': (tWidth - contWidth) * -1
        });
        $('.dragUl').css({
            "width": tWidth + 'px',
            'left': (tWidth - contWidth)

        });

        $(".attach-images ul").draggable({
            scroll: false,
            start: function (event, ui) {
                self.attachedImgClickAllow = false;
            },
            stop: function (event, ui) {
                $('.js-aImg').stop(true, true);
                setTimeout(function () {
                    self.attachedImgClickAllow = true;
                }, 100);
            },
            containment: "parent"
        });

    }

    this.bindSlider = function () {

        this.slideNum = $('.dragUl li').length;
        this.slideWidth = $('.dragUl li').outerWidth(true);
        this.slideContWidth = $('.dragUlCont').width();
        $('.dragUl').css('width', this.slideWidth * this.slideNum);


        if (self.slideWidth * self.slideNum < 5 * this.slideWidth) {
            $('.attach-images .dragUI-left,.attach-images .dragUI-right').hide();
            return;
        }

        $('.attach-images .dragUI-left').click(function (e) {
            e.preventDefault();

            if (parseInt($(".dragUl").css('margin-left')) >= 0) {
                return;
            }

            if (self.animRun) {
                return;
            }
            self.animRun = true;

            $(".dragUl").animate({
                'margin-left': '+=' + self.slideWidth
            }, 300, function () {
                self.animRun = false;
            });

        });
        $('.attach-images .dragUI-right').click(function (e) {
            e.preventDefault();
            self.slideContWidth = $('.dragUlCont').width();

            if (parseInt($(".dragUl").css('margin-left')) <= (self.slideWidth * self.slideNum - self.slideContWidth) * -1) {
                return;
            }

            if (self.animRun) {
                return;
            }
            self.animRun = true;

            $(".dragUl").animate({
                'margin-left': '-=' + self.slideWidth
            }, 300, function () {
                self.animRun = false;
            });
        });

    }

    this.removeAttach = function () {
        self.attachedImgID = '';
        $('.js-aImgCont').hide();
        $('.js-attachImg').show();
    }

    this.bindTestOpener = function () {

        $('.level-write-action .js-teszt').click(function () {

            $.ajax({
                'url': $(this).data('url'),
                'data': {
                    'postdata': {
                        'userid': $('#HirfolyamUserID').val(),
                    },
                    'method': 'post'
                },
            }).done(function (resp) {
                resp = jQuery.parseJSON(resp.replace('for(;;);', ''));

                $('.levelfolyam-17-head').hide();

                $('.levelfolyam-17-teszt').html(resp.result).css('opacity', '1');
                self.bindKeyForm();
            });

            self.showTestResult();
        });

        $('body').on('click', '.level-cont-text .js-teszt', function (e) {
            e.preventDefault();

            $.ajax({
                'url': $(this).data('url'),
                'data': {
                    'kod': $(this).data('kod'),
                    'felado': $(this).data('felado'),
                    'cimzett': $(this).data('cimzett')
                },
                'method': 'post'
            }).done(function (resp) {
                resp = jQuery.parseJSON(resp.replace('for(;;);', ''));
                $('.levelfolyam-17-head').hide();
                $('.levelfolyam-17-teszt').html(resp.result).css('opacity', '1');
                self.bindKeyForm();
            });

            self.showTestResult();
        });

        $('body').on('click', '#MailStreamTesztClose', function (e) {

            var showBubble = typeof (e.originalEvent) == "undefined" ? 1 : 0;

            $('.levelfolyam-17-write').show();
            $('.levelfolyam-17-cont').hide();
            $('.levelfolyam-17-head').show();
            $('.levelfolyam-17-teszt').css('opacity', '0');

            //$('.header').toggle();
            //$('.content').toggle();
            //$('.footer-wrapper').toggle();

            setTimeout(function () {
                $('.levelfolyam-17-teszt').hide();
                $("html, body").scrollTop(0);
                if (showBubble) {
                    self.showBubbleMsg();
                }
            }, 100);
        });

    }

    this.showTestResult = function () {

        $('.levelfolyam-17-write').show();
        $('.levelfolyam-17-cont').hide();
        $('.levelfolyam-17-teszt').show();

        //$('.header').toggle();
        //$('.content').toggle();
        //$('.footer-wrapper').toggle();

        $('.levelfolyam-17-teszt').animate({
            'scrollTop': 0
        }, 300);
        /* */
    }

    this.injectTestResult = function (resp) {

        return;

        if (resp) {

            var $html = $(resp);

            if ($("[level-kod='" + $html.attr('level-kod') + "']").length) {
                $("[level-kod='" + $html.attr('level-kod') + "']").html($html.html());
            } else {
                if ($('.js-writing').length) {
                    $('.js-writing').prepend($html);
                } else {
                    $('.levelfolyam-17-cont').append($html);
                }
            }

        }

    }

    this.bindSMSOpener = function () {

        $('.level-write-action .js-sms').click(function () {
            $('.levelfolyam-17-write').toggle();
            $('.levelfolyam-17-cont').toggle();
            $('.levelfolyam-17-sms').toggle();

            //$('.header').toggle();
            //$('.content').toggle();
            //$('.footer-wrapper').toggle();


            if ($('.levelfolyam-17-sms:visible').length) {
                CmooMailStreamI.smsOpen();
            }
        });

        $('#MailStreamSmsClose').on('click', function () {
            $('.levelfolyam-17-write').toggle();
            $('.levelfolyam-17-cont').hide();
            $('.levelfolyam-17-sms').toggle();

            //$('.header').toggle();
            //$('.content').toggle();
            //$('.footer-wrapper').toggle();

            CmooMailStreamI.smsClose();
        });

    }

    this.bindKeyForm = function () {

        $('.js-keyForm').click(function () {
            self.sendKeyForm();
        });
        $('.retest .ujkerdesek').click(function () {
            self.getNewTestForm(this);
        });

        $('#MailStreamTesztLayer input[type="radio"]').change(function () {
            if ($('#MailStreamTesztLayer input[type="radio"]:checked').length) {
                $('.js-keyForm').attr('disabled', false);
            } else {
                $('.js-keyForm').attr('disabled', true);
            }
        });

    }

    this.getNewTestForm = function (link) {

        $.ajax({
            'url': $(link).data('url'),
            'data': {
                'postdata': {
                    'userid': $('#HirfolyamUserID').val(),
                },
            },
            'method': 'post'
        }).done(function (resp) {
            resp = jQuery.parseJSON(resp.replace('for(;;);', ''));

            //$('.levelfolyam-17-head').hide();

            $('.levelfolyam-17-teszt').html(resp.result).show().css('opacity', '1');
            self.bindKeyForm();

            self.showTestResult();


            new CmooLayerGeneric($$("[rel=kulcsaszivhezreszletek]")[0]);
        });

    }

    this.sendKeyForm = function () {

        $.ajax({
            'url': $('.js-keyForm').data('url'),
            'data': {
                'postdata': {
                    'userid': $('#HirfolyamUserID').val(),
                    'data': $('#MailStreamTesztLayer')[0].toQueryString()
                }
            },
            method: 'post'
        }).done(function (resp) {

            resp = jQuery.parseJSON(resp.replace('for(;;);', ''));
            if (resp.error) {
                var cel = new CmooErrorLayer();
                cel.pop(resp.error);
            } else if (resp.result) {
                if (resp.msg) {
                    var cel = new CmooErrorLayer();
                    cel.pop(resp.msg);

                    $("#RandiRendszeruzi a").click(function () {
                        cel.close();
                        $("#MailStreamTesztClose").click();
                    });
                }
                $('.levelfolyam-17-teszt').html(resp.result);

                if (resp.teszt_letter) {
                    self.injectTestResult(resp.teszt_letter);
                }

                $("html, body").animate({
                    scrollTop: 0
                }, 600, function () {

                });
            }

        });


    }

    this.bindMessageSend = function () {

        if ($('#MailStreamReplyOpener').data('noefi-url')) {
            $('#MailStreamReplyOpener').click(function () {
                document.location.href = $('#MailStreamReplyOpener').data('noefi-url');
            });
            return;
        }

        $('#MailStreamReplyOpener').keyup(function (e) {

            if (false && e.keyCode == 13) {
                $('.js-sendMessageBtn').click();
                e.preventDefault();
            } else {

                var actText = $('#MailStreamReplyOpener').val().trim();

                self.lastText = actText;

                self.checkSendBtn();
            }
        });
        self.checkSendBtn();

        $('.js-sendMessageBtn').click(function () {
            var deleteMessageAfterSendFlag = true;
            if (!$('#MailStreamReplyOpener').val().trim().length) {
                $('.write-some').stop(true).fadeIn().delay(1000).fadeOut();
                return;
            }

            $.ajax({
                'url': $(this).data('target-url'),
                'method': 'post',
                'data': {
                    'postdata': {
                        'action': 'sendmail',
                        'replyto': $('[name="replyto"]').val(),
                        'userid': $('#HirfolyamUserID').val(),
                        'data': JSON.stringify({
                            'maildraftid': self.lastDraftID,
                            'csatolas': self.attachedImgID,
                            'mailszoveg': $('#MailStreamReplyOpener').val()
                        })
                    }
                },
            }).done(function (resp) {
                resp = resp.replace('for(;;);', '');
                resp = jQuery.parseJSON(resp);
                if(resp.nezarjabealeveliroformot == 1){
                    deleteMessageAfterSendFlag = false;
                }
                self.lastDraft = '';
                self.lastDraftID = '';
                self.removeAttach();

                if ($('.js-writing').length) {
                    $('.js-writing').before($(resp.last_message).hide());
                } else {
                    $('.levelfolyam-17-cont').append($(resp.last_message).hide());
                }
                $('.level-cont').fadeIn();

                if(deleteMessageAfterSendFlag){
                    $('#MailStreamReplyOpener').val('');
                }
                self.checkSendBtn();

                if (resp.msg) {
                    var cel = new CmooErrorLayer();
                    cel.pop(resp.msg);
                }

                self.attachedImgID = '';

                self.showBubbleMsg();
            }).fail(function () {

                self.lastDraft = '';
                self.lastDraftID = '';
                self.removeAttach();

                $('#MailStreamReplyOpener').val('');
                self.checkSendBtn();

                self.attachedImgID = '';
            });

        });

        $('#MailStreamReplyOpener').focus(function () {
            $('.levelfolyam-17-write').addClass('active');
            $('body').addClass('wr-active');
        });
        $('.levelfolyam-17-write').focusout(function () {
            $('.levelfolyam-17-write').removeClass('active');
            $('body').removeClass('wr-active');
        });

    }

    this.checkSendBtn = function () {

        if(!$('#MailStreamReplyOpener').length){
            return;
        }

        if ($('#MailStreamReplyOpener').val().trim().length) {
            $('.level-write-action').addClass('active');
        } else {
            $('.level-write-action').removeClass('active');
        }
    }

    this.showBubbleMsg = function () {

        if (this.bubbleOn) {
            return false;
        }

        this.bubbleOn = true;

        $(".levelezes_adatlaprol").fadeIn();
        setTimeout(function () {
            $(".levelezes_adatlaprol").fadeOut();
            self.bubbleOn = false;
        }, 3000);
    }

    this.attachbtnclose = function (e) {
        $(".js-attach-close").removeAttr("href");
        $(".js-attach-close").click(function (e) {
            e.preventDefault();
            $(".js-attchBack").click();
        });
    }

    this.init();
}

var MailStreamI;
jQuery(document).ready(function ($) {
    MailStreamI = new MailStream($); //BetĂśltĂŠs utĂĄn
    $(".js-open-mail").click(function(){
        $(".mail-bubble").click();
    });
});
