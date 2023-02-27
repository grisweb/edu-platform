import { forwardRef, PropsWithChildren } from 'react';
import { Box, BoxProps, SxProps } from '@mui/material';

interface ImageBoxProps {
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
  sx?: SxProps;
}

const ImageBox = forwardRef<
  HTMLDivElement,
  PropsWithChildren<BoxProps & ImageBoxProps>
>(
  (
    {
      children,
      isDragAccept,
      isDragReject,
      isFocused,
      sx,
      ...propsWithoutChildren
    },
    ref
  ) => {
    const getColor = () => {
      if (isDragAccept) {
        return '#00e676';
      }

      if (isDragReject) {
        return '#ff1744';
      }

      if (isFocused) {
        return '#2196f3';
      }

      return '#eeeeee';
    };

    return (
      <Box
        {...propsWithoutChildren}
        ref={ref}
        sx={{
          width: '100%',
          maxWidth: '500px',
          aspectRatio: '16/9',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: '2px',
          borderRadius: '2px',
          borderColor: getColor(),
          borderStyle: 'dashed',
          backgroundColor: '#fafafa',
          color: '#bdbdbd',
          outline: 'none',
          cursor: 'pointer',
          transition: 'border .24s ease-in-out',
          ...sx
        }}
      >
        {children}
      </Box>
    );
  }
);

export default ImageBox;
