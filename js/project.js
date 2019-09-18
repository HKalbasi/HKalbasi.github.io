// eslint-disable-next-line no-undef
const projectPage = propTemplateFactory({
  props: {
    title: {
      default: 'پروژه نامعلوم',
    },
    link: {
      default: 'پروژه نامعلوم',
    },
    status: {
      default: 'unknown',
    },
  },
  onConnected: (self) => {
    const vaziat = self.shadowRoot.getElementById('vaziat');
    const labelMap = {
      unknown: 'نامعلوم',
      idea: 'ایده',
      ready: 'آماده',
      indevelop: 'در حال توسعه',
    }
    // eslint-disable-next-line immutable/no-mutation
    vaziat.innerText = labelMap[self.status];
    const root = self.shadowRoot.getElementById('root');
    // eslint-disable-next-line immutable/no-mutation
    root.title = self.title;
    const colorMap = {
      unknown: '#bbb',
      idea: 'BlueViolet',
      ready: 'Green',
      indevelop: 'Gold',
    };
    const vaziatColor = self.shadowRoot.getElementById('vaziat-color');
    vaziatColor.style.backgroundColor = colorMap[self.status];
  },
  template: `
  <style>
  .sub-box {
    border-color: #000000;
    background-color: #F8F8F8;
    border-style: solid;
    border-width: 3px;
    padding: 2px;
    margin-top: 2px;
  }
  .dot {
    height: 1em;
    width: 1em;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }
  </style>
  <box-item id="root" title="پروژه نامعلوم">
    <div class="sub-box">
      وضعیت: 
      <span class="dot" id="vaziat-color"></span>
      <a id="vaziat">نامعلوم</a>
      <br>
      لینک: <slot name="link"></slot>
    </div>
    <br>
    <slot></slot>
  </box-item>
  `,
});

// eslint-disable-next-line toplevel/no-toplevel-side-effect
customElements.define('project-page', projectPage);
