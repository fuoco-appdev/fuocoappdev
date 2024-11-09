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
      d="M13 2h-2v3h2V2ZM9 17l-3-3V9h12v5l-3 3v5H9v-5ZM3.5 5.88l1.41-1.41 2.12 2.12L5.62 8 3.5 5.88Zm15.58-1.41-2.12 2.12L18.38 8l2.11-2.12-1.41-1.41Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
