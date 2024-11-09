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
      d="M15 3h-2v2h2V3Zm8 8h-2v2h2v-2Zm0 4h-2v2h2v-2Zm0 4h-2v2c1 0 2-1 2-2ZM21 7h2v2h-2V7Zm0-2V3c1 0 2 1 2 2h-2ZM1 7h2v2H1V7Zm18-4h-2v2h2V3Zm-2 16h2v2h-2v-2ZM1 5c0-1 1-2 2-2v2H1Zm8-2h2v2H9V3ZM7 3H5v2h2V3Zm-6 8v8c0 1.1.9 2 2 2h12V11H1Zm4.5 4.79L3 19h10l-3.21-4.28-2.5 3.22-1.79-2.15Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
