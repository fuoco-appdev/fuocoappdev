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
      d="M15 10.6V5c0-1.66-1.34-3-3-3-1.54 0-2.79 1.16-2.96 2.65L15 10.6Zm4 .4h-1.7c0 .58-.1 1.13-.27 1.64l1.27 1.27c.44-.88.7-1.87.7-2.91ZM3 4.27l1.41-1.41 16.75 16.75-1.41 1.41-4.2-4.2c-.78.45-1.64.77-2.55.9V21h-2v-3.28c-3.28-.49-6-3.31-6-6.72h1.7c0 3 2.54 5.1 5.3 5.1.81 0 1.6-.19 2.31-.52l-1.66-1.66c-.21.05-.42.08-.65.08-1.66 0-3-1.34-3-3v-.73l-6-6Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
