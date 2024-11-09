import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M7.695 3.845c.01 0 .01-.01.02-.01v-2.14h3v2h4v-2h3v2.14c1.72.45 3 2 3 3.86v9.17l-2-2v-7.17c0-1.1-.9-2-2-2h-7.17l-1.85-1.85Zm7.85 7.85 1.67 1.67v-1.67h-1.67Zm4.95 10.61-.85-.85c-.28.15-.59.24-.93.24h-12c-1.1 0-2-.9-2-2v-12c0-.36.06-.69.15-1.02l-2.76-2.76 1.41-1.41 18.38 18.38-1.4 1.42Zm-2.61-2.61-6-6h-3.67v-2h1.67l-3.17-3.17v11.17h11.17Z" />
  </Svg>
)

export default Icon
