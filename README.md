# OverWatch
Simple interactive stateful javascript template engine


## usage:

### html:
```html
<div id="company">
Hello {company.name}
  <ul>
    <loop :for="company.faqs" :each="faq">
      <li>{faq.title}</li>
    </loop>
  </ul>
</div>
```

### js:

```
<script src="OverWatch.js"></script>
<script>
let watcher = new OverWatch('company'); 
watcher.data.company = { name: 'W3 Eden', faqs: [{title: 'FAQ 1'}, {title: 'FAQ 2'}] } 
</script>
```

### output:

Hello W3 Eden
* FAQ 1
* FAQ 2


### on update data:
```
<script>
watcher.data.company = { name: 'W3 Eden, Inc.', faqs: [{title: 'FAQ 1'}, {title: 'FAQ 2'}, {title: 'FAQ 3'}] }
</script>
```

### output:

Hello W3 Eden, Inc.

* FAQ 1
* FAQ 2
* FAQ 3
