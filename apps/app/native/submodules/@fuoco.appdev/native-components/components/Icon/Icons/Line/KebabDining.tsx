import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M17.75 7h.75a2.5 2.5 0 0 0 0-5h-.75V1h-1.5v1h-.75a2.5 2.5 0 0 0 0 5h.75v1H13v5h3.25v1h-.75a2.5 2.5 0 0 0 0 5h.75v4h1.5v-4h.75a2.5 2.5 0 0 0 0-5h-.75v-1H21V8h-3.25V7ZM15.5 5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h3c.28 0 .5.22.5.5s-.22.5-.5.5h-3Zm3 11c.28 0 .5.22.5.5s-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h3Zm.5-6v1h-4v-1h4ZM7.75 7h.75a2.5 2.5 0 0 0 0-5h-.75V1h-1.5v1H5.5a2.5 2.5 0 0 0 0 5h.75v1H3v5h3.25v1H5.5a2.5 2.5 0 0 0 0 5h.75v4h1.5v-4h.75a2.5 2.5 0 0 0 0-5h-.75v-1H11V8H7.75V7ZM5.5 5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h3c.28 0 .5.22.5.5s-.22.5-.5.5h-3Zm3 11c.28 0 .5.22.5.5s-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h3Zm.5-6v1H5v-1h4Z" />
  </Svg>
)

export default Icon
