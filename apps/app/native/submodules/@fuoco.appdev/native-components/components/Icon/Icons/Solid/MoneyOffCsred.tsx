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
      d="M15 9c-.06-1.25-.72-2.1-2.5-2.1-.4 0-.77.05-1.09.13L9.9 5.52c.35-.15.71-.28 1.1-.36V3h3v2.19c2.09.51 3.14 2.09 3.21 3.81H15ZM4.06 5.33l1.41-1.41 14.62 14.62-1.41 1.41-2.22-2.22c-.63.57-1.5.94-2.46 1.12V21h-3v-2.17c-1.92-.41-3.56-1.64-3.68-3.83h2.2c.11 1.18.92 2.1 2.98 2.1 1.37 0 2.08-.42 2.42-.91l-3.51-3.51c-2.35-.69-3.91-1.83-3.91-3.91L4.06 5.33Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
