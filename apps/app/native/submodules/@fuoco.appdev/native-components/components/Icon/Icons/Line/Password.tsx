import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M2 16h20v2H2v-2Zm1.15-4.05L4 10.47l.85 1.48 1.3-.75-.85-1.48H7v-1.5H5.3l.85-1.47L4.85 6 4 7.47 3.15 6l-1.3.75.85 1.47H1v1.5h1.7l-.85 1.48 1.3.75Zm6.7-.75 1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H15v-1.5h-1.7l.85-1.47-1.3-.75L12 7.47 11.15 6l-1.3.75.85 1.47H9v1.5h1.7l-.85 1.48ZM23 8.22h-1.7l.85-1.47-1.3-.75L20 7.47 19.15 6l-1.3.75.85 1.47H17v1.5h1.7l-.85 1.48 1.3.75.85-1.48.85 1.48 1.3-.75-.85-1.48H23v-1.5Z" />
  </Svg>
)

export default Icon
