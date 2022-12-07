import { apply, mergeWith, move, Rule, SchematicContext, strings, template, Tree, url } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { getAngularWorkspaceConfig } from '../util/get-angular-workspace-config';
import { getComponentArgs } from '../util/get-component-args';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function stories(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const { defaultProjectPath } = getAngularWorkspaceConfig(tree);

    const {
      fullComponentPath,
      componentName,
      className,
    } = getComponentArgs(tree, { name: _options.name });

    const componentPath = parseName(defaultProjectPath, fullComponentPath);
    const templates = url(_options.mdx ? './files/mdx' : './files/component');
    
    const parametrizedTemplates = apply(templates, [
      template({
        ..._options,
        ...strings,
        name: componentName,
        componentPath: fullComponentPath.split('/').splice(-1)[0].replace(/.ts$/, ''),
        className,
      }),
      move(componentPath.path),
    ])

    return mergeWith(parametrizedTemplates)(tree,_context);
  };
}
