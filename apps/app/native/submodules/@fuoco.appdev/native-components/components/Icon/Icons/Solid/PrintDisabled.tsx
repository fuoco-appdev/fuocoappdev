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
      d="M1.41 1.6 0 3.01l5 5c-1.66 0-3 1.33-3 2.99v6h4v4h12l2.95 2.96 1.41-1.41L1.41 1.6ZM9.65 7H18V3.01H6v.35L9.65 7Zm1.01 1.01 9 8.99H22v-5.99c0-1.66-1.34-3-3-3h-8.34ZM20 11c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1ZM8 15v4.01l8-.01-4-4H8Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
