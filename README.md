# OverWatch
Simple interactive stateful javascript template engine ( ~ 1 KB )


## usage:

### html:
```html
<div id="company">
<img o-attr="src" w-val="company.logo" style="width:120px" />
Welcome to {company.name}
  <ul>
    <loop :for="company.faqs" :each="faq">
      <li>:faq.title</li>
    </loop>
  </ul>
</div>
```

### js:

```html
<script src="overwatch.js"></script>
<script>
let watcher = OverWatch('company'); 
watcher.company = { name: 'W3 Eden', logo: 'https://w3eden.com/wp-content/uploads/2021/07/w3edeng-logo-fav.png', faqs: [{title: 'FAQ 1'}, {title: 'FAQ 2'}] }; 
</script>
```

### output:
<img src='https://w3eden.com/wp-content/uploads/2021/07/w3edeng-logo-fav.png' style="width:120px" />
Welcome to W3 Eden

* FAQ 1
* FAQ 2


### on update data:
```html
<script>
watcher.company.faqs = [{title: 'FAQ 1'}, {title: 'FAQ 2'}, {title: 'FAQ 3'}];
</script>
```

### output:
<img src='https://w3eden.com/wp-content/uploads/2021/07/w3edeng-logo-fav.png' style="width:120px" />
Welcome to W3 Eden, Inc.

* FAQ 1
* FAQ 2
* FAQ 3

Demo:
https://codepen.io/codename065/pen/GRBKzNa

<iframe height="375" style="width: 100%;" scrolling="no" title="OverWatch" src="https://codepen.io/codename065/embed/GRBKzNa?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/codename065/pen/GRBKzNa">
  OverWatch</a> by Shahnur Alam (<a href="https://codepen.io/codename065">@codename065</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
