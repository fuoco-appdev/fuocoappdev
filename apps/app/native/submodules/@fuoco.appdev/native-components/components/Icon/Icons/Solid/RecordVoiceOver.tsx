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
      d="M18.44 3.63 20.07 2c3.91 4.05 3.9 10.11 0 14l-1.63-1.63c2.77-3.18 2.77-7.72 0-10.74ZM13 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM1 19c0-2.66 5.33-4 8-4s8 1.34 8 4v2H1v-2ZM15.08 7.05c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27l-1.68 1.69Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
