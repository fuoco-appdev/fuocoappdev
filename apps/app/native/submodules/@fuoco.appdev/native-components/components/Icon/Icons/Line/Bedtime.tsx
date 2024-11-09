import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9.94 4.485c-1.63 7.54 3.75 12.41 7.66 13.8a7.993 7.993 0 0 1-4.93 1.71c-4.41 0-8-3.59-8-8 0-3.45 2.2-6.4 5.27-7.51Zm2.72-2.48c-5.59 0-9.99 4.53-9.99 9.99 0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.97h-.35Z" />
  </Svg>
)

export default Icon
