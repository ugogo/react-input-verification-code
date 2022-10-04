import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ReactInputVerificationCode from './';
// import styled from 'styled-components';

export default {
  title: 'ReactInputVerificationCode',
  component: ReactInputVerificationCode,
  argTypes: {
    onChange: { action: 'onChange' },
    onCompleted: { action: 'onCompleted' },
  },
} as ComponentMeta<typeof ReactInputVerificationCode>;

const Template: ComponentStory<typeof ReactInputVerificationCode> = (args) => (
  <ReactInputVerificationCode
    autoFocus
    onChange={(value) => console.log(value)}
    onCompleted={(value) => console.log(value)}
    {...args}
  >
    <ReactInputVerificationCode.Input />
    <ReactInputVerificationCode.Input />
    <ReactInputVerificationCode.Input />
  </ReactInputVerificationCode>
);

export const Default = Template.bind({});

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  defaultValue: '7890',
};

// export const CustomInputProps = Template.bind({});
// CustomInputProps.args = {
//   placeholder: '',
//   inputProps: {
//     type: 'password',
//   },
// };

// export const CustomLength = Template.bind({});
// CustomLength.args = {
//   length: 6,
// };

// export const CustomPlaceholder = Template.bind({});
// CustomPlaceholder.args = {
//   placeholder: '⎽',
// };

// const CustomStylesContainer = styled.div`
//   position: relative;

//   .ReactInputVerificationCode-item {
//     width: 2.5rem;
//     height: 3.5rem;
//     color: #262626;
//     font-weight: 500;
//     border-radius: 0;
//     border-bottom: 1px solid #ddd;
//     transition: border-bottom-color 0.2s ease-out;
//   }

//   .ReactInputVerificationCode-item:focus {
//     border-bottom-color: #046cde;
//   }

//   .ReactInputVerificationCode-item,
//   .ReactInputVerificationCode-item:focus {
//     box-shadow: none;
//   }
// `;

// export const CustomStyles = () => (
//   <CustomStylesContainer>
//     <ReactInputVerificationCode autoFocus placeholder='' />
//   </CustomStylesContainer>
// );

// export const CustomType = Template.bind({});
// CustomType.args = {
//   type: 'alphanumeric',
// };
// CustomType.argTypes = {
//   type: {
//     control: {
//       type: 'select',
//       options: ['number', 'alphanumeric'],
//     },
//   },
// };
