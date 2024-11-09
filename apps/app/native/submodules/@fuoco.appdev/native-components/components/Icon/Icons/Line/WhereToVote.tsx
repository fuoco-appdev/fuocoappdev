import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12 .755c-4.41 0-8 3.59-8 8 0 5.57 6.96 13.34 7.26 13.67l.74.82.74-.82c.3-.33 7.26-8.1 7.26-13.67 0-4.41-3.59-8-8-8Zm0 19.47c-2.18-2.61-6-7.93-6-11.47 0-3.31 2.69-6 6-6s6 2.69 6 6c0 3.83-4.25 9.36-6 11.47Zm-1.53-9.3-1.76-1.77-1.42 1.42 3.18 3.18 6.01-6.01-1.41-1.42-4.6 4.6Z" />
  </Svg>
)

export default Icon
