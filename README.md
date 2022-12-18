# OverWatch
Simple interactive stateful jsvascript template engine


usage:

html:
<div id="company">Hello {company.name}</div>

js:

let ow = new OverWatch('company');
ow.data.company = { name: 'W3 Eden' }

output:
Hello W3 Eden

on update data:
ow.data.company = { name: 'W3 Eden, Inc.' }

output:
Hello W3 Eden, Inc.
