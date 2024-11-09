import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22.25 10V1h-8v9c0 1.86 1.28 3.41 3 3.86V21h-2v2h6v-2h-2v-7.14c1.72-.45 3-2 3-3.86Zm-2-7v3h-4V3h4Zm-4 7V8h4v2c0 1.1-.9 2-2 2s-2-.9-2-2Zm-6-1h-2V8h2a2.5 2.5 0 0 0 0-5h-2V1h-2v2h-2a2.5 2.5 0 0 0 0 5h2v1h-2a2.5 2.5 0 0 0 0 5h2v9h2v-9h2a2.5 2.5 0 0 0 0-5Zm-6-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h6c.28 0 .5.22.5.5s-.22.5-.5.5h-6Zm6 6h-6c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h6c.28 0 .5.22.5.5s-.22.5-.5.5Z" />
  </Svg>
)

export default Icon
