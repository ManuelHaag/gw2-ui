import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/core';

const progress = keyframes({
  from: {
    backgroundPosition: '-4em 0',
  },
  to: {
    backgroundPosition: '4em 0',
  },
});

const Progress = forwardRef(
  ({ component: Component, inline, ...rest }, ref) => (
    <Component
      sx={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        width: '4em',
        height: '1em',
        ...(inline && { verticalAlign: 'text-top' }),
        ':before': {
          content: '""',
          width: '100%',
          height: '85%',
          backgroundColor: `rgba(0,0,0,0.2)`,
          backgroundImage:
            'linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.2), currentColor, rgba(0,0,0,0.2), rgba(0,0,0,0))',
          backgroundRepeat: 'no-repeat',
          animation: `${progress} 1.5s infinite`,
          borderRadius: '4px',
        },
      }}
      {...rest}
      ref={ref}
    />
  ),
);

Progress.propTypes = {
  component: PropTypes.elementType,
  inline: PropTypes.bool,
};

Progress.defaultProps = {
  component: 'span',
  inline: true,
};

Progress.displayName = 'Progress';

export default Progress;
