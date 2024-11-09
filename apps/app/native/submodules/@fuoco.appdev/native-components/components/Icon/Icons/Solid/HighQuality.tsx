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
      d="M5 4h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm4.5 11H11V9H9.5v2.5h-2V9H6v6h1.5v-2h2v2Zm8.5-1c0 .55-.45 1-1 1h-.75v1.5h-1.5V15H14c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1h3c.55 0 1 .45 1 1v4Zm-1.5-.5h-2v-3h2v3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
