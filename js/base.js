/* eslint-disable immutable/no-this */
/* eslint-disable max-classes-per-file */
/*
const staticTemplateFactory = ({ template }) => {
  const templ = document.createElement('template');
  templ.innerHTML = template;
  const comp = class extends HTMLElement {
    constructor() {
      super();
      this._sr = this.attachShadow({ mode: 'open' });
      this._sr.appendChild(templ.content.cloneNode(true));
    }

    connectedCallback() {
      const x = this._sr.querySelector('#title');
      x.innerText = this.getAttribute('title');
    }
  };
  return comp;
};
*/

const propTemplateFactory = ({
  props,
  template,
  onConnected = ()=>{},
  onPropChange,
}) => {
  const templ = document.createElement('template');
  // eslint-disable-next-line immutable/no-mutation
  templ.innerHTML = template;
  const comp = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({
        mode: 'open',
      });
      this.shadowRoot.appendChild(templ.content.cloneNode(true));
      // eslint-disable-next-line
      this._props = {};
    }

    connectedCallback() {
      Object.keys(props).forEach(prop => {
        // eslint-disable-next-line
        this._props[prop] = props[prop].default;
        const x = this.getAttribute(prop);
        if (x !== null) {
          // eslint-disable-next-line
          this._props[prop] = x;
        }
      });
      if (onPropChange) {
        this.addEventListener('propChange', (x)=>onPropChange(x.detail, this));
      }
      onConnected(this);
    }
  };
  Object.keys(props).forEach(prop => {
    Object.defineProperty(comp.prototype, prop, {
      set(x) {
        // eslint-disable-next-line
        this._props[prop] = x;
        this.dispatchEvent(new CustomEvent('propChange', {
          detail: { name: prop, value: x },
        }));
      },
      get() {
        // eslint-disable-next-line no-underscore-dangle
        return this._props[prop];
      },
    });
  });
  return comp;
};

const simpleTitleComp = {
  onConnected: (self) => {
    // eslint-disable-next-line
    self.shadowRoot.getElementById('title').innerText = self.title;
  },
  onPropChange: (e, self) => {
    console.log(e);
    // eslint-disable-next-line
    self.shadowRoot.getElementById('title').innerText = e.value;  
  },
  props: {
    title: {
      default: 'salam',
    },
  },
};

const main = ()=>{
  customElements.define('sub-box-item', propTemplateFactory({
    ...simpleTitleComp,
    template: `
    <style>
    :host{
      display:table-row;
    }
    .td{
      display:table-cell;
      vertical-align: middle;
    }
  
  .subbox {
    border-color: #000000;
    background-color: #F8F8F8;
    border-style: solid;
    border-width: 3px;
    padding: 2px;
    margin-top: 2px;
    width:100%;
  }
    </style>
    <div class="td" id="title">
    </div>
    <div class="td subbox">
    <slot></slot>
    </div>
    `,
  }));
  customElements.define('box-item', propTemplateFactory({
    ...simpleTitleComp,
    template: `
    <style>
    :host{
      background-color: #FFFFFF;
      border-style: solid;
      border-width:       2px;
      padding: 5px;
      margin-top: 5px;
      display: block;  
    }
    h2 {
      background-color:  #CEC;
      margin-top:        0;
    }
    </style>
    <h2 id="title"></h2>
    <slot></slot>
    `,
  }));
};

// eslint-disable-next-line toplevel/no-toplevel-side-effect
main();
