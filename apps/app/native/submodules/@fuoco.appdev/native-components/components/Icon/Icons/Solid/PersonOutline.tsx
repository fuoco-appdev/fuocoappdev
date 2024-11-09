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
      d="M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Zm2.1 4a2.1 2.1 0 1 0-4.2 0 2.1 2.1 0 0 0 4.2 0Zm4 9c0-.64-3.13-2.1-6.1-2.1-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17ZM4 17c0-2.66 5.33-4 8-4s8 1.34 8 4v3H4v-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
