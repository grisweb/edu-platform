import { FC, MouseEventHandler } from 'react';
import {
  Box,
  Button,
  ButtonProps,
  ButtonPropsVariantOverrides,
  SvgIconTypeMap
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface ActionButtonProps {
  text: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  onClick?: MouseEventHandler;
  MuiButtonProps?: ButtonProps | ButtonPropsVariantOverrides;
}

const ActionButton: FC<ActionButtonProps> = ({
  text,
  onClick,
  icon: Icon,
  MuiButtonProps
}) => (
  <Button
    onClick={onClick}
    sx={{ lineHeight: '1.5' }}
    variant="text"
    {...MuiButtonProps}
  >
    <Icon fontSize="small" sx={{ marginRight: '6px', marginLeft: '-6px' }} />
    <Box marginTop="2px">{text}</Box>
  </Button>
);

export default ActionButton;
