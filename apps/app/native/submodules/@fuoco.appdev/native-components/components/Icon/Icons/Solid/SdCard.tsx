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
      d="M10 2h8c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2l.02-12L10 2Zm0 6h2V4h-2v4Zm5 0h-2V4h2v4Zm1 0h2V4h-2v4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
