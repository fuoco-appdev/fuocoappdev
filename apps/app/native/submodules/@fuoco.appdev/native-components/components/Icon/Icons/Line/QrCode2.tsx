import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M15 21h-2v-2h2v2Zm-2-7h-2v5h2v-5Zm8-2h-2v4h2v-4Zm-2-2h-2v2h2v-2ZM7 12H5v2h2v-2Zm-2-2H3v2h2v-2Zm7-5h2V3h-2v2Zm-7.5-.5v3h3v-3h-3ZM9 9H3V3h6v6Zm-4.5 7.5v3h3v-3h-3ZM9 21H3v-6h6v6Zm7.5-16.5v3h3v-3h-3ZM21 9h-6V3h6v6Zm-2 10v-3h-4v2h2v3h4v-2h-2Zm-2-7h-4v2h4v-2Zm-4-2H7v2h2v2h2v-2h2v-2Zm1-1V7h-2V5h-2v4h4ZM6.75 5.25h-1.5v1.5h1.5v-1.5Zm0 12h-1.5v1.5h1.5v-1.5Zm12-12h-1.5v1.5h1.5v-1.5Z" />
  </Svg>
)

export default Icon
