import * as React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ReactInputVerificationCode from './';

export default {
  title: 'ReactInputVerificationCode',
  component: ReactInputVerificationCode,
  argTypes: {
    onChange: { action: 'onChange' },
    onCompleted: { action: 'onCompleted' },
  },
} as ComponentMeta<typeof ReactInputVerificationCode>;

const Template: ComponentStory<typeof ReactInputVerificationCode> = (args) => (
  <ReactInputVerificationCode onChange={console.log} {...args} />
);

export const Default = Template.bind({});

export const CustomLength = Template.bind({});
CustomLength.args = {
  length: 6,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: '⎽',
};

export const CustomType = Template.bind({});
CustomType.args = {
  type: 'alphanumeric',
};
CustomType.argTypes = {
  type: {
    control: {
      type: 'select',
      options: ['number', 'alphanumeric'],
    },
  },
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  value: '7890',
};
