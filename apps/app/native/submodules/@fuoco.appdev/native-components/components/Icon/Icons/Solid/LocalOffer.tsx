import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="m12.41 2.58 9 9c.36.36.59.87.59 1.42 0 .55-.22 1.05-.59 1.41l-7 7c-.36.37-.86.59-1.41.59-.55 0-1.05-.22-1.41-.58l-9-9C2.22 12.05 2 11.55 2 11V4c0-1.1.9-2 2-2h7c.55 0 1.05.22 1.41.58ZM4 5.5C4 6.33 4.67 7 5.5 7S7 6.33 7 5.5 6.33 4 5.5 4 4 4.67 4 5.5Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
