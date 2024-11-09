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
      d="M5 3v9c0 1.66 1.34 3 3 3h6v2H8c-2.76 0-5-2.24-5-5V3h2Zm14 15h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H16v-7H9c-1.65 0-3-1.35-3-3V3h6v6h5c1.1 0 2 .9 2 2v7Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
