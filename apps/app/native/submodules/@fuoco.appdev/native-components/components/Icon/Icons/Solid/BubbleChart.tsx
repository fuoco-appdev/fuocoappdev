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
      d="M20 8.8a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0ZM7.2 17.6a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm7.6 2.4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
