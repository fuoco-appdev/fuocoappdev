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
      d="M6 3h12v4H6V3ZM5 8h14c1.66 0 3 1.34 3 3v6h-4v4H6v-4H2v-6c0-1.66 1.34-3 3-3Zm3 11h8v-5H8v5Zm11-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
