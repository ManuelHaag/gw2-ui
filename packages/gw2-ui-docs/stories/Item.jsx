import {
  Item as Gw2UiItem,
  itemArmorWeights as ITEM_ARMOR_WEIGHTS,
  itemStatNames as ITEM_STAT_NAMES,
  itemTypeNames as ITEM_TYPE_NAMES,
} from 'gw2-ui'
import PropTypes from 'prop-types'
import React from 'react'
import filterNullishProps from '../utils/filterNullishProps'

/**
 * Renders a Guild Wars 2 item.
 */
const Item = (props) => <Gw2UiItem {...filterNullishProps(props)} />

Item.propTypes = {
  /**
   * The item id
   */
  id: PropTypes.number,
  /**
   * The item count
   */
  count: PropTypes.number,
  /**
   * The custom item type
   */
  type: PropTypes.oneOf(Object.values(ITEM_TYPE_NAMES)),
  /**
   * The custom item stat
   */
  stat: PropTypes.oneOf(Object.values(ITEM_STAT_NAMES)),
  /**
   * The custom item armor weight
   */
  weight: PropTypes.oneOf(Object.values(ITEM_ARMOR_WEIGHTS)),
  /**
   * The item upgrades. The array elements can be either an id or a tuple with id and count (for runes)
   */
  upgrades: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
    ]),
  ),
  /**
   * The properties passed to the `<Tooltip/>` component
   */
  tooltipProps: PropTypes.object,
  /**
   * The properties passed to the `<WikiLink/>` component
   */
  wikiLinkProps: PropTypes.object,
}

Item.defaultProps = {
  id: null,
  count: null,
  type: undefined,
  stat: undefined,
  weight: undefined,
  upgrades: null,
  tooltipProps: {},
  wikiLinkProps: {},
}

export default Item
