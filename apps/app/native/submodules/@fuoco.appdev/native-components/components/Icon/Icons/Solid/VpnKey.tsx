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
      d="M7 6a5.99 5.99 0 0 1 5.65 4H23v4h-2v4h-4v-4h-4.35A5.99 5.99 0 0 1 7 18c-3.31 0-6-2.69-6-6s2.69-6 6-6Zm-2 6c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
