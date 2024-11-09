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
      d="M3 3h18c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-7v-2h7V5H3v3H1V5c0-1.1.9-2 2-2Zm2 4h14v10h-5.63A13.033 13.033 0 0 0 5 8.63V7Zm-4 7v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7Zm0 4v3h3c0-1.66-1.34-3-3-3Zm0-8v2a9 9 0 0 1 9 9h2c0-6.08-4.93-11-11-11Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
