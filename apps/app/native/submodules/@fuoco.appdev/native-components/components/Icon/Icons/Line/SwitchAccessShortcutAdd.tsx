import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M5.56 8.94 3.5 8l2.06-.94L6.5 5l.94 2.06L9.5 8l-2.06.94L6.5 11l-.94-2.06ZM6.5 21l.94-2.06L9.5 18l-2.06-.94L6.5 15l-.94 2.06L3.5 18l2.06.94L6.5 21Zm-3.63-8.63L1.5 13l1.37.63L3.5 15l.63-1.37L5.5 13l-1.37-.63L3.5 11l-.63 1.37ZM10.5 12c0-3.09 1.38-5.94 3.44-8H10.5V2h7v7h-2V5.28c-1.8 1.74-3 4.2-3 6.72 0 3.32 2.1 6.36 5 7.82V22c-4.09-1.59-7-5.65-7-10Zm12 2h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2Z" />
  </Svg>
)

export default Icon
