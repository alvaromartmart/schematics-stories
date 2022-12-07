import { moduleMetadata, StoryFn } from '@storybook/angular';
import type { Meta } from '@storybook/angular';
import { <%= className %> } from './<%= componentPath %>'

export default {
  title: "<%= title %>",
  component: <%= className %>,
  decorators: [
    moduleMetadata({
      imports: [
        
      ]
    }),
  ],
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: StoryFn<<%= className %>> = (args: <%= className %>) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  
};
