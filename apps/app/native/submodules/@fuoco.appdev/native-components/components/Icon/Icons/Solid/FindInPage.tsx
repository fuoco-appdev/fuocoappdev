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
      d="M20 8v11.59l-3.83-3.84c.52-.79.83-1.73.83-2.75 0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.02 0 1.96-.31 2.76-.83l4.43 4.43c-.34.25-.74.4-1.19.4H5.99C4.89 22 4 21.1 4 20l.01-16c0-1.1.89-2 1.99-2h8l6 6Zm-8 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
