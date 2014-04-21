### jQuery.emoticon ###

简单有趣的 bbcode-styled 表情插件

### Usage ###

```html
<!-- for watch -->
<div id="list_to_watch">
    <div class="tweet">bla bla bla...</div>
    <div class="tweet">bla bla bla...</div>
</div>

<!-- (optional) input -->
<textarea id="reply"></textarea>
```

```javascript
$.emoticonize({
    watch: $('#list_to_wach .tweet'),
    input: $('#reply')
});
```