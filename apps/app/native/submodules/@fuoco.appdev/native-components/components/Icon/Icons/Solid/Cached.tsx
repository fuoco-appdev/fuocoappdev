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
      d="M12 6c-3.31 0-6 2.69-6 6h3l-4 4-4-4h3c0-4.42 3.58-8 8-8 1.57 0 3.03.46 4.26 1.24L14.8 6.7A5.87 5.87 0 0 0 12 6Zm3 6 4-4 4 4h-3c0 4.42-3.58 8-8 8a7.93 7.93 0 0 1-4.26-1.24L9.2 17.3c.83.45 1.79.7 2.8.7 3.31 0 6-2.69 6-6h-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
