import { LitElement, html, css } from "lit-element";
import { sideMenuItemStyle } from "./side-menu-item-style.js";
import {ifDefined} from 'lit-html/directives/if-defined';
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-tooltip";

export class SideMenuItem extends LitElement {
    render() {
        return html`
      ${this._itemLinkTemplate()} ${this._tooltipTemplate()}
      ${this._childrenTemplate()}
    `;
    }

    _itemLinkTemplate() {
        return html`
      <a id="itemLink" 
        level=${this._getLevel} 
        href=${this.href || '#!'}
        @click="${(e) => this._onClick(e)}"
        target=${ifDefined(this.target)}>
        <slot class="icon" name="icon"></slot>
        <div id ="content"
           <span>${this.label}</span>
        </div>
      </a>
      `;
    }

    _tooltipTemplate() {
        return html`
      ${this._getLevel === 0 && this.compact
            ? html`
            <paper-tooltip for="itemLink" position="right">
              ${this.label}
            </paper-tooltip>
          `
            : undefined}
    `;
    }

    _childrenTemplate() {
        return html`
      ${this.expanded
            ? html`
            ${this.compact
                ? html`
                  <div id="overlay"><slot></slot></div>
                `
                : html`
                  <slot></slot>
                `}
          `
            : undefined}
    `;
    }

    static get properties() {
        return {
            selected: { type: Boolean, reflect: true },

            label: { type: String, reflect: true },

            expanded: { type: Boolean, reflect: true },

            compact: { type: Boolean, reflect: true },

            href: { type: String, reflect: true },

            target: { type: String, reflect: true }
        };
    }

    constructor() {
        super();
        this.selected = false;
        this.expanded = false;
    }

    firstUpdated(changedProperties) {
        if (!this.hasChildren()) {
            return;
        }
        this.collapseExpandIcon = document.createElement("iron-icon");

        this.collapseExpandIcon.id = "collapse-button";
        this.shadowRoot
            .getElementById("content")
            .appendChild(this.collapseExpandIcon);

        this._boundOutsideClickListener = this._outsideClickListener.bind(this);
    }

    updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            if (propName === "compact") {
                this._onCompactChanged();
            }

            if (propName === "expanded") {
                this._onExpandedChanged();
            }

            if (propName === "selected"){
                if (oldValue === this.selected){
                    return;
                }

                if (this.selected) {
                    this._changeSelectedState(true);
                    this._markParentWithSelectedChild();
                }
            }
        });
    }

    _onCompactChanged() {
        this.expanded = false;

        if (this.collapseExpandIcon == null) {
            return;
        }

        if (!this.compact) {
            this.collapseExpandIcon["icon"] = "expand-more";
        } else {
            this.collapseExpandIcon["icon"] = "chevron-right";
        }
    }

    _onExpandedChanged() {
        if (this.collapseExpandIcon == null) {
            return;
        }

        if (this.expanded) {
            this._onHandleExpanded();
        } else {
            this._onHandleCollapsed();
        }
    }

    _onHandleExpanded() {
        if (!this.compact) {
            this.collapseExpandIcon["icon"] = "expand-less";
        } else {
            this.collapseExpandIcon["icon"] = "chevron-left";
            document.addEventListener("click", this._boundOutsideClickListener, true);
        }
    }

    _onHandleCollapsed() {
        if (!this.compact) {
            this.collapseExpandIcon["icon"] = "expand-more";
        } else {
            this.collapseExpandIcon["icon"] = "chevron-right";
            document.removeEventListener(
                "click",
                this._boundOutsideClickListener,
                true
            );
        }
    }

    _onClick(e) {
        if (!this.hasChildren()) {
            this.selected = true;
        } else {
            this.expanded = !this.expanded;
            //Don't go anywhere
            e.preventDefault();
        }
    }

    _outsideClickListener(event) {
        const eventPath = event.composedPath();

        if (eventPath.indexOf(this) < 0) {
            this.expanded = false;
        }
    }

    _changeSelectedState(selected, sourceEvent) {
        this.selected = selected;
        //Fire event to the side-menu, that an item is selected
        let evt = new CustomEvent("side-menu-item-select", {
            bubbles: true,
            cancelable: true,
            detail: { sourceEvent: sourceEvent }
        });
        this.dispatchEvent(evt);
    }

    hasChildren() {
        return !!this.querySelector("side-menu-item");
    }

    /**
     * Finds all parent items and adds an attribute that it has a child which is selected
     *
     */
    _markParentWithSelectedChild() {
        let element = this.parentElement;
        while (element instanceof SideMenuItem) {
            element.setAttribute('hasSelectedChild', true);
            element = element.parentElement;
        }
    }

    get _getLevel() {
        let level = 0;
        let element = this.parentElement;
        while (element instanceof SideMenuItem) {
            level++;
            element = element.parentElement;
        }
        return level;
    }

    static get styles() {
        return css`
      ${sideMenuItemStyle}
    `;
    }
}

customElements.define("side-menu-item", SideMenuItem);
