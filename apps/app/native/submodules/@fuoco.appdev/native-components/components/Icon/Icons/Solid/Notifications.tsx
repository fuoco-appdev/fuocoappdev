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
      d="M18 11v5l2 2v1H4v-1l2-2v-5c0-3.08 1.63-5.64 4.5-6.32V4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.68C16.36 5.36 18 7.93 18 11Zm-4 9a2 2 0 1 1-4 0h4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
