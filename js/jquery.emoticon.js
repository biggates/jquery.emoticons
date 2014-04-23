/**
 * jQuery.emoticon
 * @author biggates 
 */
;(function($){
    var emoticons = {
        qq: {
            prefix: 'QQ',
            names: '微笑,撇嘴,色,发呆,得意,流泪,害羞,闭嘴,睡,大哭,尴尬,发怒,调皮,呲牙,惊讶,难过,酷,冷汗,抓狂,吐,偷笑,愉快,白眼,傲慢,饥饿,困,惊恐,流汗,憨笑,悠闲,奋斗,咒骂,疑问,嘘,晕,疯了,衰,骷髅,敲打,再见,擦汗,抠鼻,鼓掌,糗大了,坏笑,左哼哼,右哼哼,哈欠,鄙视,委屈,快哭了,阴险,亲亲,吓,可怜,菜刀,西瓜,啤酒,篮球,乒乓,咖啡,饭,猪头,玫瑰,凋谢,嘴唇,爱心,心碎,蛋糕,闪电,炸弹,刀,足球,瓢虫,便便,月亮,太阳,礼物,拥抱,强,弱,握手,胜利,抱拳,勾引,拳头,差劲,爱你,NO,OK,爱情,飞吻,跳跳,发抖,怄火,转圈,磕头,回头,跳绳,挥手,激动,街舞,献吻,左太极,右太极'.split(','),
            image: 'qq.png',
            base: '../images/',
            total: 105,
            width: 29,
            height: 29,
            rows: 5,
            columns: 15
        },
        emoji: {
            prefix: 'emoji',
            names: '笑脸,开心,大笑,热情,眨眼,色,接吻,亲吻,脸红,露齿笑,满意,戏弄,吐舌,无语,得意,汗,失望,低落,呸,焦虑,担心,震惊,悔恨,眼泪,哭,破涕为笑,晕,恐惧,心烦,生气,睡觉,生病,恶魔,外星人,心,心碎,丘比特,闪烁,星星,叹号,问号,睡着,水滴,音乐,火,便便,强,弱,拳头,胜利,上,下,右,左,第一,强壮,吻,热恋,男孩,女孩,女士,男士,天使,骷髅,红唇,太阳,下雨,多云,雪人,月亮,闪电,海浪,猫,小狗,老鼠,仓鼠,兔子,狗,青蛙,老虎,考拉,熊,猪,牛,野猪,猴子,马,蛇,鸽子,鸡,企鹅,毛虫,章鱼,鱼,鲸鱼,海豚,玫瑰,花,棕榈树,仙人掌,礼盒,南瓜灯,鬼魂,圣诞老人,圣诞树,礼物,铃,庆祝,气球,CD,相机,录像机,电脑,电视,电话,解锁,锁,钥匙,成交,灯泡,邮箱,浴缸,钱,炸弹,手枪,药丸,橄榄球,篮球,足球,棒球,高尔夫,奖杯,入侵者,唱歌,吉他,比基尼,皇冠,雨伞,手提包,口红,戒指,钻石,咖啡,啤酒,干杯,鸡尾酒,汉堡,薯条,意面,寿司,面条,煎蛋,冰激凌,蛋糕,苹果,飞机,火箭,自行车,高铁,警告,旗,男人,女人,O,X,版权,注册商标,商标'.split(','),
            image: 'emoji.png',
            base: '../images/',
            total: 168,
            width: 29,
            height: 29,
            rows: 12,
            columns: 15
        },
        xueqiu: {
            prefix: '雪球',
            names: '笑,大笑,鼓鼓掌,俏皮,加油,赚大了,牛,怒了,哭泣,亏大了,困顿,好失望,滴汗,为什么,跪了,摊手,不屑,好逊,关灯吃面,呵呵傻逼,割肉,卖身,吐血,可怜,害羞,抠鼻,囧,好困惑,想一下,傲,不说了,围观,很赞,不赞,赞成,干杯,心心,心碎了,献花花,一坨屎,满仓,空仓,复盘,抄底,能力圈,看空,看多,加仓,减仓,买入,卖出,毛估估,成交,护城河'.split(','),
            image: 'xueqiu.png',
            base: '../images/',
            total: 54,
            width: 28,
            height: 26,
            rows: 6,
            columns: 9
        }
    };

    var defaultOptions = {
        watch: null,
        replace: null,
        input: null,
        emoticons: emoticons
    };
    
    /**
     * Handles browser differences
     * @param $toWatch $() elements to watch
     */
    var createWatchFunction = function($toWatch, replacement){
        // Firefox & Chrome
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        if(MutationObserver){
            var observer = new MutationObserver(function(mutations){
                mutations.forEach(function(mutation){
                    for(var i = 0; i < mutation.addedNodes.length; i++){
                        callFunction(mutation.addedNodes.item(i), replacement);
                    }
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
     * @param replacement {emoticonNames: eset} the applied map
     */
    var callFunction = function(newElement, replacement){
        var $elem = $(newElement);
        if($elem.data('emoticonized')) {
            return;
        } else {
        
            var text = $elem.html();
            // replacement happens here

            text = text.replace(/\[(.+)\]/g, function(_notUsed, content){
                if( replacement[content] ){
                    return '<div class="emoticon em_' + replacement[content] + ' em_' + content + '" title="' + content + '"></div>';
                } else {
                    return content;
                }
            });
            
            $elem.html(text).data('emoticonized', true);
        }
    };
    
    /*
    *  createCSSClass()
    *  http://www.happycode.info
    */
    function createCSSClass(selector, style) {
        if(typeof(style) !== 'string') {
            var t = '';
            for(name in style) {
                t += name + ': ' + style[name] + ';';
            }
            
            style = t;
        }
        // console.log('createCssClass()', selector, style);
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
                    try{
                        if (media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
                            styleSheet = document.styleSheets[i];
                        }
                    } catch (err){
                        // Firefox sometimes throws exception "Permission denied to access property 'mediaText'"
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
            /*
            for (i = 0; i < styleSheet.rules.length; i++) {
                if (styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                    styleSheet.rules[i].style.cssText = style;
                    return;
                }
            }
            */
     
            styleSheet.addRule(selector, style);
        } else if (mediaType == "object") {
            /*
            for (i = 0; i < styleSheet.cssRules.length; i++) {
                if (styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
                    styleSheet.cssRules[i].style.cssText = style;
                    return;
                }
            }
            */
     
            styleSheet.insertRule(selector + "{" + style + "}", 0);
        }
    }
    
    $.emoticonize = function(options){
        var opts = $.extend(true, {}, {emoticons: emoticons}, options);
    
        // create a map of valid emoticons
        var replacement = {};
        
        // create style classes
        for(i in opts.emoticons) {
            var eset = opts.emoticons[i];
            var currentRow = 0;
            var currentColumn = 0;
            
            createCSSClass('.emoticon.em_' + eset.prefix, {
                display: 'inline-block',
                width: eset.width + 'px',
                height: eset.height + 'px',
                'line-height': eset.height + 'px',
                'background-image': 'url("' + eset.base + eset.image + '")'
            });
            
            for(var j = 0; j < eset.total; j++) {
                var name = eset.names[j];
                var className = eset.prefix + name + '表情';
                replacement[className] = eset.prefix;
                if(currentColumn >= eset.columns){
                    currentColumn = 0;
                    currentRow ++;
                }
                createCSSClass('.emoticon.em_' + className, {
                    'background-position': '' + -currentColumn * eset.width + 'px ' + -currentRow * eset.height + 'px'
                });
                
                currentColumn ++;
            }
        }
        
        // apply immediately once
        $(opts.watch).children(opts.replace).each(function(){
            callFunction($(this), replacement);
        });
    
        return $(opts.watch).each(function(){
            createWatchFunction($(this), replacement);
        });
    };
})(jQuery); 