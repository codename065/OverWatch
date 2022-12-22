/*
Ⓒ copyright: Shahnur Alam ( https://github.com/codename065/ )
*/
const OverWatch = (ID) => {
        const area = document.getElementById(ID);
        const buffer_html = area.innerHTML.replaceAll(/{(.+)}/ig, "<data name='$1'>{$1}</data>");
        area.innerHTML = buffer_html;
        let _loops = [];
        let looped_sections = document.querySelectorAll(`#${ID} loop`);
        for (const [key, loop] of Object.entries(looped_sections)) {
            let _for = loop.getAttribute(":for");
            let _each = loop.getAttribute(":each");
            _loops[_for] = {_for: _for, _each: _each, _repeat: loop.innerHTML, _loop: loop};
            loop.innerHTML = '';
        }
        console.log('_loops', _loops);

        let parent = [];        
        let flat_data = [];
        let key = '';

        const handler = {

            set(target, prop, value) {
                key = parent.join('.') + `.${prop}`;                
                parent = [];
                if (typeof value === 'object') {
                    value = new Proxy(value, handler);                  
                    process(key, value);
                }
                Reflect.set(target, prop, value);
                interpret(key, value);
            },

            get(target, prop, receiver) {
                parent.push(prop);
                return Reflect.get(target, prop);
            }

        };

        const interpret = (key, value) => {
            document.querySelectorAll(`#${ID} data[name='${key}']`).forEach(elm => {
                elm.innerHTML = value;
            });
        };

        const valueof = (data_source, index) => {
            let value = data_source;
            index = index.split('.');
            index.forEach(prop => {
                value = Reflect.get(data_source, prop);
            });           
            return value;
        }

        const process = (name, obj) => {
            console.log('Processed ' + name, obj);
            if (_loops[name]) {
                let loop = _loops[name];
                let _for = obj;
                let _html = '';
                let index = 0;
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
