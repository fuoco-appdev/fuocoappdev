import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 18.5c.83 0 1.5-.67 1.5-1.5h-3c0 .83.67 1.5 1.5 1.5ZM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm4-8.61c0-2.11-1.03-3.92-3-4.39v-.5c0-.57-.43-1-1-1-.57 0-1 .43-1 1V7c-1.97.47-3 2.27-3 4.39V14H7v2h10v-2h-1v-2.61ZM14 14h-4v-3c0-1.1.9-2 2-2s2 .9 2 2v3Z" />
  </Svg>
)

export default Icon
