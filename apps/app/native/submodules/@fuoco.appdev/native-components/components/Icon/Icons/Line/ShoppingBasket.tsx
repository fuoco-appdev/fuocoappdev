import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M22 9.49h-4.79l-4.38-6.56a.993.993 0 0 0-.83-.42c-.32 0-.64.14-.83.43L6.79 9.49H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27.03-.27c0-.55-.45-1-1-1Zm-10-4.2 2.8 4.2H9.2l2.8-4.2Zm6.5 14.2-12.99.01-2.2-8.01H20.7l-2.2 8Zm-6.5-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" />
  </Svg>
)

export default Icon
