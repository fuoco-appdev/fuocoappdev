import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m16.715 12.865-1.5-1.5v-2.67h1.5v4.17Zm3.78 9.44-1.85-1.85c-.28.15-.59.24-.93.24 0 .55-.45 1-1 1s-1-.45-1-1h-6c0 .55-.45 1-1 1s-1-.45-1-1c-1.1 0-2-.9-2-2v-11c0-.05.02-.1.02-.15l-3.63-3.63 1.41-1.41 18.38 18.38-1.4 1.42Zm-3.61-3.61-3.42-3.42v2.42h-1.5v-3.92l-1.75-1.75v5.67h-1.5v-7.17l-1-1v9.17h9.17Zm-3.42-10h-.92l.92.92v-.92Zm6.25-1v8.17l-2-2v-6.17h-6.17l-1.83-1.83v-3.17c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v3h2c1.1 0 2 .9 2 2Zm-8.5-2h3v-2.5h-3v2.5Z" />
  </Svg>
)

export default Icon
