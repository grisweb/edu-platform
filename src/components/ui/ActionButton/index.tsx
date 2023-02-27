import { FC, MouseEventHandler } from 'react';
import {
  Box,
  Button,
  ButtonProps,
  ButtonPropsVariantOverrides,
  ColorObject,
  SvgIconTypeMap,
  SxProps
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface ActionButtonProps {
  text: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  onClick?: MouseEventHandler;
  color?: ColorObject;
  MuiButtonProps?: ButtonProps | ButtonPropsVariantOverrides;
  sx?: SxProps;
}

const ActionButton: FC<ActionButtonProps> = ({
  text,
  onClick,
  icon: Icon,
  MuiButtonProps,
  sx
}) => (
  <Button
    onClick={onClick}
    sx={{ lineHeight: '1.5', ...sx }}
    variant="text"
    {...MuiButtonProps}
  >
    <Icon fontSize="small" sx={{ marginRight: '6px', marginLeft: '-6px' }} />
    <Box marginTop="2px">{text}</Box>
  </Button>
);

export default ActionButton;
