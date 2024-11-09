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
      d="M6 2h12v2H6V2ZM4 8h16V6H4v2Zm16 2c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16Zm-10 2.73L16 16l-6 3.26v-6.53Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
