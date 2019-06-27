import { PolymerElement, html } from '@polymer/polymer';

class DemoCustomElements extends PolymerElement {
    constructor() {
        super();

        this.addEventListener('danmakuplaystate-changed', () => {
            if (this.danmakuplaystate === 'paused') {
                const items = this.querySelectorAll('danmaku-item');
                for (let i = 0; i < items.length; i++) {
                    items[i].danmakuplaystate = 'paused';
                }
            } else if (this.danmakuplaystate === 'running') {
                const items = this.querySelectorAll('danmaku-item');
                for (let i = 0; i < items.length; i++) {
                    items[i].danmakuplaystate = 'running';
                }
            }
        });
    }

    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                    position: relative;
                }
            </style>
            <slot></slot>
        `;
    }

    static get properties () {
        return {
            danmakuplaystate: {
                type: String,
                notify: true,
                value: 'running',
            },
            danmakuduration: {
                type: Number,
                value: 4000,
            },
            danmakudelay: {
                type: Number,
                value: 0,
            },
            allowOverlap: {
                type: Boolean,
                value: false,
            },
            area: {
                type: Number,
                value: 100,
            },
        };
    }

    attributeChangedCallback (q) {
        super.attributeChangedCallback();
        console.log('attributeChangedCallback');
    }
}

customElements.define('danmaku-list', DemoCustomElements);