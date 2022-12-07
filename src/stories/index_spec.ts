import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';
import {Schema as ApplicationOptions} from '@schematics/angular/application/schema';

const collectionPath = path.join(__dirname, '../collection.json');
const runner = new SchematicTestRunner('schematics', collectionPath);

let appTree: UnitTestTree;

const workspaceOptions: WorkspaceOptions = {
  name: 'workspace',
  version: '14.0.0',
}

const appOptions: ApplicationOptions = {
  name: 'app',
  projectRoot: 'apps',
}

describe('stories', () => {

  beforeEach(async () => {
    appTree = await runner.runExternalSchematicAsync(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    ).toPromise();
    appTree = await runner.runExternalSchematicAsync(
      '@schematics/angular',
      'application',
      appOptions,
      appTree
    ).toPromise();
    appTree = await runner.runExternalSchematicAsync(
      '@schematics/angular',
      'component',
      {
        name: 'components/my-custom-component',
        project: 'app'
      },
      appTree
    ).toPromise();
  })

  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    appTree = await runner
      .runSchematicAsync('stories', {
        name: 'apps/src/app/components/my-custom-component',
        title: 'Design System/My Custom Component'
      }, appTree)
      .toPromise();
    const storyFile = '/apps/src/app/components/my-custom-component/my-custom-component.stories.ts';
    expect(appTree.files).toContain(storyFile);
    const contents = appTree.read(storyFile)?.toString();
    expect(contents).toContain('title: "Design System/My Custom Component"');
    expect(contents).toContain('component: MyCustomComponent');
  });
});
