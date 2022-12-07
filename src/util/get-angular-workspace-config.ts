import { SchematicsException, Tree } from "@angular-devkit/schematics";
import { relativePathToWorkspaceRoot } from "@schematics/angular/utility/paths";

export function getAngularWorkspaceConfig(tree: Tree) {
    const workspaceConfigBuffer = tree.read('angular.json');
    if(!workspaceConfigBuffer) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }
    const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    const project = workspaceConfig.projects[workspaceConfig.defaultProject];
    const defaultProjectPath = relativePathToWorkspaceRoot(project);
    
    return {
        workspaceConfig,
        project,
        defaultProjectPath,
    }
}