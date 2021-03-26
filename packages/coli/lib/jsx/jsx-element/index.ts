import { Element } from "../../elements/element.base";
import { _ELEMENT_JSX } from "../../_internal/constants/elements-name";
export class JSXElement extends Element {
  constructor() {
    super(_ELEMENT_JSX);
  }

  openingElement: any;
  closingElement: any;
  children: any[];
}
