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
      d="m3 5 9-4 9 4v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5Zm3 8 4 4 8-8-1.41-1.42L10 14.17l-2.59-2.58L6 13Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
