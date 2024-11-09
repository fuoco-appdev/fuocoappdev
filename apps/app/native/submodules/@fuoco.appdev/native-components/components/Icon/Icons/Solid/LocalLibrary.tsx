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
      d="M15 5c0 1.66-1.34 3-3 3S9 6.66 9 5s1.34-3 3-3 3 1.34 3 3ZM3 8c3.48 0 6.64 1.35 9 3.55C14.36 9.35 17.52 8 21 8v11c-3.48 0-6.64 1.36-9 3.55C9.64 20.35 6.48 19 3 19V8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
