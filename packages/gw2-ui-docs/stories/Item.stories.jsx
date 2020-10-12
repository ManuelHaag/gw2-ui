import React from 'react'
import Item from './Item'

export default {
  title: 'Core/Item',
  component: Item,
}

const Template = (args) => <Item {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 80002,
}
