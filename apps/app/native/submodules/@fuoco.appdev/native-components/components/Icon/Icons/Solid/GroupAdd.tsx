import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M18 11c1.66 0 2.99-1.34 2.99-3S19.66 5 18 5c-.32 0-.63.05-.91.14.57.81.9 1.79.9 2.86 0 1.07-.34 2.04-.9 2.86.28.09.59.14.91.14ZM8 10H5V7H3v3H0v2h3v3h2v-3h3v-2Zm7.99-2c0 1.66-1.33 3-2.99 3-1.66 0-3-1.34-3-3s1.34-3 3-3 2.99 1.34 2.99 3Zm3.63 5.16c.83.73 1.38 1.66 1.38 2.84v2h3v-2c0-1.54-2.37-2.49-4.38-2.84ZM7 16c0-2 4-3 6-3s6 1 6 3v2H7v-2Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
