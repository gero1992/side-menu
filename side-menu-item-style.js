import { css } from "lit-element";

export const sideMenuItemStyle = css`
  :host {
    --item-padding: 1rem;
    --item-content-padding: 1rem;
    --icon-height: 2rem;
    --icon-width: 2rem;
    --item-selected-color: rgba(235, 89, 5, 0.1);
    --item-color-active: rgba(26, 26, 26, 0.2);
    --item-color-hover: rgba(26, 26, 26, 0.1);
    --item-border-radius: 5px;

    --item-text-color: hsla(214, 40%, 16%, 0.94);
    --item-icon-color: hsla(214, 45%, 20%, 0.5);
    --item-selected-color-text: rgb(235, 89, 5);
    --font-family: "Segoe Ui";
    --item-font-size: 1rem;
    --sub-item-font-size: 0.85rem;
    
    --overlay-box-shadow: 0 2px 4px -1px hsla(214, 53%, 23%, 0.16), 0 3px 12px -1px hsla(214, 50%, 22%, 0.26);
    --overlay-background-color: white;
    
    --spacing: 4px;

    font-family: var(--font-family);
    display: flex;
    overflow: hidden;
    flex-direction: column;
    border-radius: var(--item-border-radius);
  }

  #itemLink {
    align-items: center;
    font-size: var(--item-font-size);
    font-weight: 600;
    height: var(--icon-height);
    transition: background-color 200ms;
    padding: var(--item-padding);
    cursor: pointer;
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    overflow: hidden;
    text-decoration: none;
  }

  #itemLink:hover {
    background-color: var(--item-color-hover);
  }

  #itemLink:active {
    background-color: var(--item-color-active);
  }

  #content {
    padding-left: var(--item-content-padding);
    flex: 1;
  }

  :host([compact]) #content {
      padding-left: 0;
      display: none;
  }

  :host([selected]) #itemLink{
    background-color: var(--item-selected-color);
    color: var(--item-selected-color-text);
  }

  :host([selected]) slot[name="icon"]::slotted(*) {
    color: var(--item-selected-color-text);
  }

  :host(:not([selected])) #itemLink{
    color: var(--item-text-color);
  }

  :host([expanded]){
    background-color: var(--item-selected-color);
  }
  
  :host([hasSelectedChild]){
    background-color: var(--item-selected-color);
  }

  :host span {
    cursor: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
  }

  slot[name="icon"]::slotted(*) {
    flex-shrink: 0;
    color: var(--item-icon-color);
    height: var(--icon-height);
    width: var(--icon-width);
    pointer-events: none;
  }

  #collapse-button {
    float: right; 
  }

  :host([compact]) #itemLink[level]:not([level="0"]) {
      padding: calc( var(--item-padding) / 2);
  }

  :host(:not([compact])) #itemLink[level]:not([level="0"]) {
    padding-left: calc(var(--icon-width) + var(--item-content-padding));
  }

  #itemLink[level]:not([level="0"]) #content {
    display: block;
    visibility: visible;
    width: auto;
    font-weight: 500;
    font-size: var(--sub-item-font-size)
  }

 #overlay {
    display: block;
    left: 101%;
    min-width: 200px;
    padding: 4px 2px;
    background-color: var(--overlay-background-color);
    background-image: var(--overlay-background-image, none);
    box-shadow: var(--overlay-box-shadow);
    border: 1px solid var(--overlay-background-color);
    border-left: 0;
    border-radius: 0 3px 3px 0;
    position: absolute;
    z-index: 1;
    animation: pop 200ms forwards;
  }
  
  @keyframes pop{
      0% {
        transform: translateX(-5px);
        opacity: 0.5;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
  }
`;
