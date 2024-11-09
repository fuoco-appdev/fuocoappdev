import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m20.364 8.551-1.23 1.85a8 8 0 0 1-.22 7.58H5.054a8 8 0 0 1 10.51-11.15l1.85-1.23a10 10 0 0 0-14.08 13.38 2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44l-.01.01Z" />
    <Path d="M10.574 15.391a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2.002 2.002 0 0 0 0 2.83Z" />
  </Svg>
)

export default Icon
