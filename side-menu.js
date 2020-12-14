import {LitElement, html, css} from "lit-element";

class SideMenu extends LitElement {

    render() {
        return html`
      <nav @side-menu-item-select=${this._handleSelect}>
        <slot></slot>
      </nav>
    `;
    }

    /**
     * Resets all properties and attributes related to the selection to false,
     * at the end selects the one which needs to be selected.
     * Closes the menu if it's in compact mode
     * @param event - the selection event
     * @private
     */
    _handleSelect(event) {
        let targetItem = event.target;

        this._deselectAllItems();

        targetItem.selected = true;
        this.selectedValue = targetItem.label;
    }

    _deselectAllItems() {
        this.items.forEach(element => {
            if (this.compact) {
                element.expanded = false;
            }
            element.selected = false;
            element.hasChildren() ? element.removeAttribute('hasSelectedChild') : undefined;
        });
    }

    static get properties() {
        return {
            items: {type: Array},
            selectedValue: {type: String, reflect: true},
            compact: {type: Boolean, reflect: true}
        };
    }

    constructor() {
        super();
        this.compact = false;
    }

    firstUpdated(_changedProperties) {
        this.items = [...this.querySelectorAll("side-menu-item")];
    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "compact") {
                this.items.forEach(item => (item.compact = this.compact));
                let evt = new CustomEvent("side-menu-compact-change", {
                    bubbles: true,
                    cancelable: true
                });
                this.dispatchEvent(evt);
            }
        });
    }

    static get styles() {
        return css`
      nav {
        padding: 0;
      }

      :host {
        
        list-style: none;
        width: 100%;
        position: relative;
      }

      :host([compact]) {
        width: auto;
      }
    `;
    }
}

customElements.define("side-menu", SideMenu);
