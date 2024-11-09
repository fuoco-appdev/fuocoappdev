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
      d="M18 11a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-5.44 3.33c-.34.27-.56.7-.56 1.17V21h7c1.1 0 2-.9 2-2v-5.98c-.94-.33-1.95-.52-3-.52-2.03 0-3.93.7-5.44 1.83ZM12.24 3a6.465 6.465 0 0 0 1.17 7.59l-9.82 9.82C3.23 20.05 3 19.55 3 19V5c0-1.1.9-2 2-2h7.24Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
