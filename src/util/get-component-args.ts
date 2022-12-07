import { SchematicsException, Tree } from "@angular-devkit/schematics";

export function getComponentArgs(tree: Tree, { name }: { name: string } ) {
    /* name is a path and it should support, in this order of preference
        - src/shared/foo/foo.component.ts
        - src/shared/foo = src/shared/foo/foo.component.ts
        - src/shared/foo = src/shared/foo.component.ts
    */
    let fullComponentPath: string;
    let componentName: string;
    if(name.endsWith('.component.ts')) {
        fullComponentPath = name;
        componentName = /\/([\w\.]+)\.component.ts$/.exec(name)?.[1] ?? '';
    } else {
        const rootPath = name + '.component.ts';
        componentName = name.split('/').splice(-1)?.[0]; // foo
        if(tree.exists(rootPath)) {
            fullComponentPath = rootPath;
        } else {
            fullComponentPath = `${name}/${componentName}.component.ts`;
        }
    }
    if(!tree.exists(fullComponentPath)) {
        throw new SchematicsException(`Could not find the component in ${fullComponentPath}`);
    }

    // Now we get the class name
    const componentContents = tree.read(fullComponentPath)?.toString() ?? '';
    const capture = /export class (\w+)/.exec(componentContents);
    const className = capture?.[1];
    
    return {
        fullComponentPath,
        componentName,
        className,
    }
}