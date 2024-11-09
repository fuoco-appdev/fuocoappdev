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
      d="m8.46 5.54 1.77 1.76L12 5.54l1.77 1.76 1.77-1.76L12 2 8.46 5.54ZM5.54 8.46 2 12l3.54 3.54 1.76-1.77L5.54 12l1.76-1.77-1.76-1.77Zm12.92 0-1.76 1.77L18.46 12l-1.76 1.77 1.76 1.77L22 12l-3.54-3.54Zm-8.23 8.24L12 18.46l1.77-1.76 1.77 1.76L12 22l-3.54-3.54 1.77-1.76ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
