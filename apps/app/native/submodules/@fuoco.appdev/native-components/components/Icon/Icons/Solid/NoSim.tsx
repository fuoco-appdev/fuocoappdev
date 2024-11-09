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
      d="M19 5v11.11L7.95 5.06 10.01 3H17c1.1 0 2 .9 2 2Zm-16.62.15 1.41-1.41 17.47 17.47-1.41 1.41-1.88-1.88c-.29.16-.62.26-.97.26H7c-1.1 0-2-.9-2-2V8.01l.12-.12-2.74-2.74Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
