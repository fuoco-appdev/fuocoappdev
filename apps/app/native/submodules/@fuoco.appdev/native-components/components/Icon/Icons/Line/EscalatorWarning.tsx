import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm9 7.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S18.33 8 17.5 8 16 8.67 16 9.5Zm3 2.5h-2.84c-.58.01-1.14.32-1.45.86l-.92 1.32L10.22 8a2.02 2.02 0 0 0-1.71-1H5.5c-1.1 0-2 .9-2 2v6H5v7h5V11.61L12.53 16h2.2l.77-1.1V22h4v-5h1v-3.5c0-.82-.67-1.5-1.5-1.5Z" />
  </Svg>
)

export default Icon
