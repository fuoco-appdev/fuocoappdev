import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="m8 4-6 6v10h12V10L8 4Zm4 14H9v-3H7v3H4v-7.17l4-4 4 4V18Zm-3-5H7v-2h2v2Zm9 7V8.35L13.65 4h-2.83L16 9.18V20h2Zm4 0V6.69L19.31 4h-2.83L20 7.52V20h2Z" />
  </Svg>
)

export default Icon
