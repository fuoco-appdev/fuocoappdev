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
      d="m14.81 8.62 7.19.62-5.45 4.73L18.18 21 12 17.27 5.82 21l1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.62Zm-6.57 9.05L12 15.4l3.77 2.28-1-4.28 3.32-2.88-4.38-.38L12 6.1l-1.7 4.03-4.38.38 3.32 2.88-1 4.28Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
