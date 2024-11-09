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
      d="M17 4V2l3 3-3 3V6H9V4h8Zm1 5c1.1 0 2 .9 2 2v6h2v2h-8c0 1.66-1.34 3-3 3s-3-1.34-3-3H6c-1.1 0-2-.9-2-2v-3h7v-3H7v2l-3-3 3-3v2h11Zm-8 10c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1Zm8-5h-4v-3h4v3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
