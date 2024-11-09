import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16.49 15.25V13.5L14 16l2.49 2.5v-1.75H22v-1.5h-5.51Zm3.02 4.25H14V21h5.51v1.75l2.49-2.5-2.49-2.5v1.75ZM9.5 5.25c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm-3.75 3.4L3 22.75h2.1l1.75-8 2.15 2v6h2V15.2l-2.05-2.05.6-3c1.3 1.6 3.25 2.6 5.45 2.6v-2c-1.85 0-3.45-1-4.35-2.45L9.7 6.7c-.35-.6-1-.95-1.7-.95-.25 0-.5.05-.75.15L2 8.05v4.7h2V9.4l1.75-.75Z" />
  </Svg>
)

export default Icon