class OverWatch {
        constructor (ID)  {
            this.ID = ID;
            let ow = this;
            this.data = new Proxy({}, {
                set(target, name, value) {
                    target[name] = value;
                    if(typeof value === 'string')
                        document.getElementById(this.ID).innerHTML = document.getElementById(this.ID).innerHTML.replace(`{${this.ID}.${name}}`, value);
                    if(typeof value === 'object'){
                        ow.process(name, value);
                    }
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
    }
