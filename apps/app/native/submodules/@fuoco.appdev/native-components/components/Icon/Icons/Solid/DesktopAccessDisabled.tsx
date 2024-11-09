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
      d="M1.41 1.69 0 3.1l.99.99V16c0 1.1.9 2 2 2H10v2H8v2h8v-2h-2v-2h.9l6 6 1.41-1.41-20.9-20.9ZM2.99 16V6.09L12.9 16H2.99ZM6.55 4l-2-2h16.44c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-.44l-2-2h2.44V4H6.55Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
