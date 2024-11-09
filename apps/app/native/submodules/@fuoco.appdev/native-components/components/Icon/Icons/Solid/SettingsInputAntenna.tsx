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
      d="M1 12C1 5.93 5.93 1 12 1s11 4.93 11 11h-2a9 9 0 0 0-18 0H1Zm11-7c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7Zm1 9.29c.88-.39 1.5-1.26 1.5-2.29a2.5 2.5 0 0 0-5 0c0 1.02.62 1.9 1.5 2.29v3.3L7.59 21 9 22.41l3-3 3 3L16.41 21 13 17.59v-3.3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
