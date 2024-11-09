import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V5h14v14ZM8.57 6H6v2.58c1.42 0 2.57-1.16 2.57-2.58ZM12 6h-1.71c0 2.36-1.92 4.29-4.29 4.29V12c3.32 0 6-2.69 6-6Zm2.14 5.86-3 3.87L9 13.15 6 17h12l-3.86-5.14Z" />
  </Svg>
)

export default Icon
