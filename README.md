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
<script src="OverWatch.js"></script>
<script>
let watcher = OverWatch('company'); 
watcher.data.company = { name: 'W3 Eden', logo: 'https://w3eden.com/wp-content/uploads/2021/07/w3edeng-logo-fav.png', faqs: [{title: 'FAQ 1'}, {title: 'FAQ 2'}] }; 
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
watcher.data.company.faqs = [{title: 'FAQ 1'}, {title: 'FAQ 2'}, {title: 'FAQ 3'}];
</script>
```

### output:
<img src='https://w3eden.com/wp-content/uploads/2021/07/w3edeng-logo-fav.png' style="width:120px" />
Welcome to W3 Eden, Inc.

* FAQ 1
* FAQ 2
* FAQ 3
