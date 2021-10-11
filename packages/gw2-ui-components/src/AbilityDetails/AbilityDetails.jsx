import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import DetailsHeader from '../DetailsHeader'
import DetailsFact from '../DetailsFact'
import DetailsText from '../DetailsText'
import { factsOrder, populateMissingTraitAPI } from '../helpers'
import { Spinner } from '..'

const axios = require('axios')

// type is "skills" or "traits"
const AbilityDetails = forwardRef(({ data, type: apiType, ...rest }, ref) => {
  const { name, id } = data

  const { CancelToken } = axios
  const source = CancelToken.source()

  const [state, setState] = React.useState({
    unparsedDescription: data.description,
    categories: data.categories,
    facts: data.facts,
  })

  React.useEffect(() => {
    const { categories, facts } = state
    // only request data in case it wasnt provided by props
    if (!(categories || facts)) {
      // only show native language for chinese people
      const userLang = navigator.language || navigator.userLanguage
      const language = userLang.includes('zh') ? 'zh' : 'en'
      axios
        .get(
          `https://api.guildwars2.com/v2/${apiType}?ids=${id}&lang=${language}`,
          {
            cancelToken: source.token,
          },
        )
        .catch(() => {})
        .then((res) => {
          if (res && res.data && res.data.length === 1) {
            const [apiData] = res.data
            const { description, categories, facts } =
              apiType === 'traits' ? populateMissingTraitAPI(apiData) : apiData
            setState({
              unparsedDescription: description,
              categories,
              facts,
            })
          }
        })

      return () => {
        source.cancel(
          `Operation cancelled for fetching ${apiType} with id ${id}`,
        )
      }
    }
  }, [])

  const { unparsedDescription, categories, facts } = state

  const { value: rechargeValue, icon: rechargeIcon } =
    (facts && facts.find(({ type }) => type === 'Recharge')) || {}

  let description = unparsedDescription

  if (categories) {
    description = description.replace(
      new RegExp(
        `^(${categories.map((category) => `${category}\\. `).join('|')})`,
        'g',
      ),
      '',
    )
  }

  return (
    <div {...rest} ref={ref}>
      <DetailsHeader
        sx={{ mb: '8px' }}
        {...(rechargeValue && {
          flags: [
            {
              value: rechargeValue,
              icon: rechargeIcon,
            },
          ],
        })}
      >
        {name}
      </DetailsHeader>
      {!(unparsedDescription || categories || facts) && <Spinner />}
      <DetailsText
        lines={[
          categories && (
            <span sx={{ color: 'gw2.details.abilityType' }}>
              {categories.map((category) => `${category}. `)}
            </span>
          ),
          description,
        ]}
        lineComponent="span"
      />

      {facts && (facts.length > 1 || facts[0].type !== 'Recharge') && (
        <div sx={{ mt: '12px' }}>
          {facts
            .filter(
              (
                { text, type, status, prefix: { status: prefixStatus } = {} },
                index,
              ) =>
                type !== 'Recharge' &&
                facts.findIndex(
                  ({
                    text: otherText,
                    type: otherType,
                    status: otherStatus,
                    prefix: { status: otherPrefixStatus } = {},
                  }) =>
                    text === otherText &&
                    type === otherType &&
                    status === otherStatus &&
                    prefixStatus === otherPrefixStatus,
                ) === index,
            )
            .sort(
              ({ type: a }, { type: b }) =>
                (factsOrder[a] || 0) - (factsOrder[b] || 0),
            )
            .map((data, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <DetailsFact key={`${data.type}-${index}`} data={data} />
            ))}
        </div>
      )}
    </div>
  )
})

AbilityDetails.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired, // skills or traits
}

AbilityDetails.displayName = 'AbilityDetails'

export default AbilityDetails
