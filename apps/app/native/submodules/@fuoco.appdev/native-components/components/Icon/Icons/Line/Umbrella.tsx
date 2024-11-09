import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M14.5 7.42 13 6.27V3.9c0-.26.22-.48.5-.48s.5.21.5.48v.6h2v-.6c0-1.33-1.12-2.4-2.5-2.4S11 2.57 11 3.9v2.37L9.5 7.42 6 6.57l5.05 15.25c.15.45.55.68.95.68.4 0 .8-.23.95-.69L18 6.57l-3.5.85ZM13.28 9l.76.58.92-.23L13 15.3V8.79l.28.21Zm-3.32.59.76-.58.28-.22v6.51L9.03 9.36l.93.23Z" />
  </Svg>
)

export default Icon
