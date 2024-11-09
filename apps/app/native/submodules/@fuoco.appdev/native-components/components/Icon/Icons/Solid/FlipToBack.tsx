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
      d="M7 5a2 2 0 0 1 2-2v2H7Zm2 2H7v2h2V7Zm0 4H7v2h2v-2Zm4 4h-2v2h2v-2Zm6-10V3c1.1 0 2 .9 2 2h-2Zm-6-2h-2v2h2V3ZM9 15v2a2 2 0 0 1-2-2h2Zm10-2h2v-2h-2v2Zm2-4h-2V7h2v2Zm-2 8c1.1 0 2-.9 2-2h-2v2ZM3 7h2v12h12v2H5a2 2 0 0 1-2-2V7Zm12-2h2V3h-2v2Zm2 12h-2v-2h2v2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
