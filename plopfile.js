import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';

export default function (plop) {
  plop.setHelper('capitalize', (text) => upperFirst(camelCase(text)));
  plop.setHelper('camelCase', (text) => camelCase(text));
  plop.setHelper('toLower', (text) => kebabCase(text));

  plop.setGenerator('component', {
    description: 'Generate a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter component name:',
      },
      {
        type: 'input',
        name: 'figmaLink',
        message: 'Enter a URL for the Figma design:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{capitalize name}}/{{capitalize name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{capitalize name}}/{{toLower name}}.styled.ts',
        templateFile: 'plop-templates/component-styled.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{capitalize name}}/{{capitalize name}}.test.js',
        templateFile: 'plop-templates/component-test.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{capitalize name}}/index.ts',
        templateFile: 'plop-templates/component-index.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{capitalize name}}/interface.ts',
        templateFile: 'plop-templates/component-interface.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{capitalize name}}/{{capitalize name}}.stories.tsx',
        templateFile: 'plop-templates/component-stories.hbs',
      },
    ],
  });

  plop.setGenerator('util', {
    description: 'Generate a new util',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter util name:',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/utils/{{camelCase name}}.ts',
        templateFile: 'plop-templates/util-function.hbs',
      },
      {
        type: 'add',
        path: 'src/docs/functions/{{camelCase name}}.md',
      },
      {
        type: 'add',
        path: 'src/utils/{{camelCase name}}.stories.mdx',
        templateFile: 'plop-templates/util-stories.hbs',
      },
    ],
  });
}
