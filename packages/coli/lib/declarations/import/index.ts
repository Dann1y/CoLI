import { _DECLARATION_IMPORT } from "../../_internal/constants/declarations-name";
import { _SPEFICIER_DEFAULT_IMPORT } from "../../_internal/constants/specifiers-name";
import { Declaration } from "../declaration.base";
import { ImportDefaultSpecifier } from "./import-default.specifier";
import { BaseImportSpecifier } from "./import-specifier.base";

export * from "./import-specifier.base";
export * from "./import.specifier";
export * from "./import-default.specifier";

export class ImportDeclaration extends Declaration {
  /**
   * import specifiers; both default and imports
   */
  specifiers: BaseImportSpecifier[];

  /**
   * source of the import being held from. e.g. "module-a"
   */
  source: string;

  get defaultImport(): ImportDefaultSpecifier | undefined {
    return this.specifiers.find((s) => {
      return s.type == _SPEFICIER_DEFAULT_IMPORT;
    });
  }

  constructor(params: { specifiers?: BaseImportSpecifier[]; source: string }) {
    super(_DECLARATION_IMPORT);
    if (params.specifiers) {
      this.specifiers = params.specifiers;
    }
    this.source = params.source;
  }

  public exportAs() {
    // const { default: _default, source: _from, _import } = this;
    // const importIsNotEmpty = _import != null && _import.join("") !== "";
    // let code = "import";
    // _default != null && (code += ` ${_default}`);
    // if (importIsNotEmpty && _default != null) {
    //   code += `,`;
    // }
    // importIsNotEmpty && (code += ` { ${_import.join(", ")} }`);
    // _from != null && (code += ` from "${_from}"`);
    // return code;
  }
}
