/*
Ⓒ copyright: Shahnur Alam ( https://github.com/codename065/ )
Version: 1.0.0
*/
const OverWatch = (ID) => {
        const area = document.getElementById(ID);
        const buffer_html = area.innerHTML.replaceAll(/{(.+)}/ig, "<data name='$1'>{$1}</data>");
        area.innerHTML = buffer_html;
        let _loops = []; 
        let _attrs = [];
        let looped_sections = document.querySelectorAll(`#${ID} loop`);
        let attrs = document.querySelectorAll(`#${ID} [o-attr]`);

        for (const [key, elm] of Object.entries(attrs)) {
            let _attr = elm.getAttribute("o-attr");
            let _var = elm.getAttribute('w-val');
            if(!_attrs[_var]) _attrs[_var] = []
            _attrs[_var].push({_attr: _attr, _var: _var, _elm: elm});
        }
        for (const [key, loop] of Object.entries(looped_sections)) {
            let _for = loop.getAttribute(":for");
            let _each = loop.getAttribute(":each");
            _loops[_for] = {_for: _for, _each: _each, _repeat: loop.innerHTML, _loop: loop};
            loop.innerHTML = '';
        }
        //console.log('_loops', _loops);

        let parent = [];
        //let data_source = {};
        let flat_data = [];
        let key = '';

        const handler = {

            set(target, prop, value) {
              //console.log('Called for ', parent);
                key = parent.length > 0 ? parent.join('.') + `.${prop}` : prop;
                //console.log('Called for ', key);
                parent = [];
                if (typeof value === 'object') {
                    value = new Proxy(value, handler);
                    //console.log('key:', key);
                    process(key, value);
                }
                Reflect.set(target, prop, value);
                interpret(key, value);
            },

            get(target, prop, receiver) {
                if(typeof prop === 'string')
                  parent.push(prop);
                return Reflect.get(target, prop);
            }

        };

        const interpret = (key, value) => {
            //console.log('KEY:', key);
            document.querySelectorAll(`#${ID} data[name='${key}']`).forEach(elm => {
                elm.innerHTML = value;
            });
            if(_attrs[key]) {
                let elms = _attrs[key];
                elms.forEach((elm) => {
                    elm._elm.setAttribute(elm._attr, value);
                });
            }
        };

        const valueof = (data_source, index) => {
            let value = data_source;
            index = index.split('.');
            index.forEach(prop => {
                value = Reflect.get(data_source, prop);
            });
            //console.log('vo ', value);
            return value;
        }

        const process = (name, obj) => {
            //console.log('Processed ' + name, obj);
            if (_loops[name]) {
                let loop = _loops[name];
                let _for = obj;
                let _html = '';
                let index = 0;
                //console.log('LOOP:', loop);
                //console.log('_for:', _for);
                try {
                    _for.forEach(item => {
                        let keys = Object.keys(item);
                        let _processed_html = loop._repeat;
                        keys.forEach(key => {
                            _processed_html = `<loop_item key='${name}.${index}.${key}'>` + _processed_html.replace(`:${loop._each}.${key}`, item[key]) + `</loop_item>`;
                        });
                        _html += _processed_html;
                        index++;
                    });
                    loop._loop.innerHTML = _html;
                } catch (e) {

                }
                //console.log(_html)
            }

            for (let [key, value] of Object.entries(obj)) {
                const index = `${name}.${key}`;
                if (typeof value !== 'object') {
                    interpret(index, value);
                } else if (typeof value === 'object') {
                    value = new Proxy(value, handler);
                    process(index, value);
                }
            }
        };

        return new Proxy({}, handler);
    }
