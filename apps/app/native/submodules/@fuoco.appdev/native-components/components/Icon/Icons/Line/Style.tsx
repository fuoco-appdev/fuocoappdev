import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m2.792 19.4 1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61Zm19.5-3.7-4.96-11.97a2.013 2.013 0 0 0-1.81-1.23c-.26 0-.53.04-.79.15L7.362 5.7a1.999 1.999 0 0 0-1.08 2.6l4.96 11.97a1.998 1.998 0 0 0 2.6 1.08l7.36-3.05a1.994 1.994 0 0 0 1.09-2.6Zm-9.2 3.8L8.132 7.54l7.35-3.04h.01l4.95 11.95-7.35 3.05Z" />
    <Path d="M11.262 9.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M6.142 19.5c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34Z" />
  </Svg>
)

export default Icon
