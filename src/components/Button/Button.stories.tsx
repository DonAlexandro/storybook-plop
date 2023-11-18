import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Buttons help people take actions, such as sending an email, sharing a document, or liking a comment.
*/
const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Story />
    ),
  ],
  argTypes: {
    children: {
      type: 'string',
    },
    disabled: {
      type: 'boolean'
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/G6AI3rPezguMuCC4UCJihs/Material-Design-3-(Dev-Mode)?node-id=53923%3A27460'
    }
  }
};

type Story = StoryObj<typeof Button>;

/**
 * Filled buttons are high-emphasis buttons.
 * They have the most visual impact after the FAB, and should be used for important,
 * final actions that complete a flow, like "Save", "Join now", or "Confirm".
 */
export const Filled: Story = {
  args: {
    children: 'Label',
    variant: 'filled'
  }
}

export const FilledDisabled: Story = {
  args: {
    ...Filled.args,
    disabled: true,
    variant: 'filled'
  }
}

/**
 * Outlined buttons are medium-emphasis buttons.
 * They contain actions that are important, but aren’t the primary action in an app.
 * Outlined buttons pair well with filled buttons to indicate an alternative, secondary action.
 */
export const Outlined: Story = {
  args: {
    ...Filled.args,
    variant: 'outlined'
  }
}

export const OutlinedDisabled: Story = {
  args: {
    ...Filled.args,
    disabled: true,
    variant: 'outlined'
  }
}

export default meta;
