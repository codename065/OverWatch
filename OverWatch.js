/*
© copyright: Shahnur Alam ( https://github.com/codename065/ )
*/
class OverWatch {     
        constructor (ID)  {            
          this.ID = ID;
          let ow = this;
                           
          this.data = new Proxy({}, {
                set(target, name, value) {
                    target[name] = value;                  
                    if(typeof value === 'string')
                        document.body.innerHTML = document.body.innerHTML.replace(`{${this.ID}.${name}}`, value);
                    if(typeof value === 'object'){
                        ow.process(name, value);
                    } 
                  ow.loops();
                }
            });
        }
        process(name, obj) { 
            for (const [key, value] of Object.entries(obj)) {
              let index = `${name}.${key}`;              
                if(typeof value === 'string') {                    
                    document.getElementById(this.ID).innerHTML = document.getElementById(this.ID).innerHTML.replace(`{${index}}`, value);
                } else if(typeof value === 'object'){
                    this.process(index, value);
                }
            }
        }
  
        loops() {    
          let loops = document.getElementById(this.ID).getElementsByTagName('loop'); 
          for(const [key, loop] of Object.entries(loops)){
            let _for = loop.getAttribute(":for");
            _for = this.valueof(_for);            
            let _each = loop.getAttribute(":each");            
            loop.innerHTML = this.loop(_for, _each, loop.innerHTML);
          } 
          
        }
        loop(_for, _each, _template) {    
          let _html = '';          
          _for.forEach(item => {
            let keys = Object.keys(item);    
            let _processed_html = _template;
            keys.forEach(key => { 
              _processed_html = _processed_html.replace(`{${_each}.${key}}`, item[key]);
            });   
            _html += _processed_html;
          });
          return _html;
        } 
        valueof(index) {
          let value = this.data;
          index = index.split('.');
          index.forEach(prop => {
            value = value[prop];
          });           
          return value;
        }
    }
