import PropTypes from 'prop-types';
import { ForwardedRef, forwardRef } from 'react';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

interface IconifyProps {
  icon:  string;
  width?: number;
  sx?: object;
  [key: string]: any;
}

const Iconify = forwardRef((
  { icon, width = 20, sx, ...other }: IconifyProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  width: PropTypes.number,
};

export default Iconify;
