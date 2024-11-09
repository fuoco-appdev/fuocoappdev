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
      d="m1.45 3.55 1.06-1.06 19.05 19.05-1.06 1.06-7.6-7.6H9.5v-3.4L8 10.1V15H6.5v-2.5h-2V15H3V9h1.5v2h2V9h.4L1.45 3.55ZM13 10.5v.36l1.5 1.5V10.5c0-.8-.7-1.5-1.5-1.5h-1.86l1.5 1.5H13Zm4.5 2.5v2h-.36L16 13.86V9h3.5c.8 0 1.5.7 1.5 1.5v1c0 .6-.4 1.1-.9 1.4L21 15h-1.5l-.9-2h-1.1Zm2-2.5h-2v1h2v-1Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
