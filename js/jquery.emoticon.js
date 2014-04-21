/**
 * jQuery.emoticon
 * @author biggates 
 */
;(function($){
    var emoticons = {
        qq: {
            prefix: 'QQ',
            names: '΢Ц,Ʋ��,ɫ,����,����,����,����,����,˯,���,����,��ŭ,��Ƥ,����,����,�ѹ�,��,�亹,ץ��,��,͵Ц,���,����,����,����,��,����,����,��Ц,����,�ܶ�,����,����,��,��,����,˥,����,�ô�,�ټ�,����,�ٱ�,����,�ܴ���,��Ц,��ߺ�,�Һߺ�,��Ƿ,����,ί��,�����,����,����,��,����,�˵�,����,ơ��,����,ƹ��,����,��,��ͷ,õ��,��л,�촽,����,����,����,����,ը��,��,����,ư��,���,����,̫��,����,ӵ��,ǿ,��,����,ʤ��,��ȭ,����,ȭͷ,�,����,NO,OK,����,����,����,����,���,תȦ,��ͷ,��ͷ,����,����,����,����,����,��̫��,��̫��'.split(),
            image: 'qq.png',
            total: 105,
            width: 29,
            height: 29,
            rows: 5,
            columns: 15
        },
        emoji: {
            prefix: 'emoji',
            names: 'Ц��,����,��Ц,����,գ��,ɫ,����,����,����,¶��Ц,����,ϷŪ,����,����,����,��,ʧ��,����,��,����,����,��,�ں�,����,��,����ΪЦ,��,�־�,�ķ�,����,˯��,����,��ħ,������,��,����,�����,��˸,����,̾��,�ʺ�,˯��,ˮ��,����,��,���,ǿ,��,ȭͷ,ʤ��,��,��,��,��,��һ,ǿ׳,��,����,�к�,Ů��,Ůʿ,��ʿ,��ʹ,����,�촽,̫��,����,����,ѩ��,����,����,����,è,С��,����,����,����,��,����,�ϻ�,����,��,��,ţ,Ұ��,����,��,��,����,��,���,ë��,����,��,����,����,õ��,��,�����,������,���,�Ϲϵ�,���,ʥ������,ʥ����,����,��,��ף,����,CD,���,¼���,����,����,�绰,����,��,Կ��,�ɽ�,����,����,ԡ��,Ǯ,ը��,��ǹ,ҩ��,�����,����,����,����,�߶���,����,������,����,����,�Ȼ���,�ʹ�,��ɡ,�����,�ں�,��ָ,��ʯ,����,ơ��,�ɱ�,��β��,����,����,����,��˾,����,�嵰,������,����,ƻ��,�ɻ�,���,���г�,����,����,��,����,Ů��,O,X,��Ȩ,ע���̱�,�̱�'.split(),
            image: 'emoji.png',
            total: 168,
            width: 29,
            height: 29,
            rows: 12,
            columns: 15
        }
    };

    var defaultOptions = {
        watch: null,
        input: null,
        emoticons: emoticons
    };
    
    /**
     * Handles browser differences
     * @param $toWatch $() elements to watch
     */
    var createWatchFunction = function($toWatch, replacementArray){
        // Firefox & Chrome
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        if(MutationObserver){
            var observer = new MutationObserver(function(mutations){
                mutations.forEach(function(mutation){
                    callFunction(mutation, replacementArray);
                });
            });
            
            $toWatch.each(function(idx, elem){
                observer.observe(elem, {childList: true});
            });
            
        } else {
            // fallback to setTimeout()
            
        }
        
    };
    
    /**
     * This is the actual 'replace' function
     * @param newElement the observed new inserted dom element
     * @param replacementArray [emoticonNames] the applied array
     */
    var callFunction = function(newElement, replacementArray){
        var $elem = $(newElement);
        if($elem.data('emoticonized')) {
            return;
        } else {
        
            var text = $elem.text();
            // replacement happens here
            for(idx : replacementArray){
                name = replacementArray[idx];
                text = text.replace('[' + name + ']', '<span class="emoticon em_' + name + '"></span>');
                text = text.replace(/\[.+\]/g, function(content){
                    // TODO check whether content is in replacementArray
                    if(content){
                        return '<span class="emoticon em_' + content + '" title="' + content + '"></span>';
                    } else {
                        return content;
                    }
                });
            }
            $elem.text(text).data('emoticonized', true);
        }
    };
    
    /*
    *  createCSSClass()
    *  http://www.happycode.info
    */
    function createCSSClass(selector, style) {
        if(typeof(style) !== 'string') {
            style = JSON.stringify(style);
        }
        console.log('createCssClass()', selector, style);
        if (!document.styleSheets) {
            return;
        }
     
        if (document.getElementsByTagName("head").length == 0) {
            return;
        }
     
        var stylesheet;
        var mediaType;
        if (document.styleSheets.length > 0) {
            for (i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].disabled) {
                    continue;
                }
                var media = document.styleSheets[i].media;
                mediaType = typeof media;
     
                if (mediaType == "string") {
                    if (media == "" || (media.indexOf("screen") != -1)) {
                        styleSheet = document.styleSheets[i];
                    }
                } else if (mediaType == "object") {
                    if (media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
                        styleSheet = document.styleSheets[i];
                    }
                }
     
                if (typeof styleSheet != "undefined") {
                    break;
                }
            }
        }
     
        if (typeof styleSheet == "undefined") {
            var styleSheetElement = document.createElement("style");
            styleSheetElement.type = "text/css";
     
            document.getElementsByTagName("head")[0].appendChild(styleSheetElement);
     
            for (i = 0; i < document.styleSheets.length; i++) {
                if (document.styleSheets[i].disabled) {
                    continue;
                }
                styleSheet = document.styleSheets[i];
            }
     
            var media = styleSheet.media;
            mediaType = typeof media;
        }
     
        if (mediaType == "string") {
            for (i = 0; i < styleSheet.rules.length; i++) {
                if (styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                    styleSheet.rules[i].style.cssText = style;
                    return;
                }
            }
     
            styleSheet.addRule(selector, style);
        } else if (mediaType == "object") {
            for (i = 0; i < styleSheet.cssRules.length; i++) {
                if (styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                    styleSheet.cssRules[i].style.cssText = style;
                    return;
                }
            }
     
            styleSheet.insertRule(selector + "{" + style + "}", 0);
        }
    }
    
    $.fn.emoticonize = function(options){
        var opts = $.extend(true, {}, emoticons, options);
    
        // TOOD create a table of valid emoticons
        var replacementArray = [];
        
        // create style classes
        for(i : options.emoticons) {
            var eset = options.emoticons[i];
            var currentRow = 0;
            var currentColumn = 0;
            for(int j = 0; j < eset.total; j++){
                var name = eset.names[j];
                var className = eset.prefix + '����' + name;
                replacementArray.push(className);
                if(currentColumn >= eset.columns){
                    currentColumn = 0;
                    currentRow ++;
                }
                createCSSClass('.emoticon.em_' + className, {
                    width: eset.width + 'px',
                    height: eset.height + 'px',
                    background-image: 'url("' + eset.image + '")',
                    background-position: '' + currentColumn * eset.width + 'px ' + currentRow * eset.height + 'px'
                });
            }
        }
    
        return $.each(function(){
            var $container = options.watch || $(this);
            createWatchFunction($container, replacementArray);
        });
    };
})(jQuery); 