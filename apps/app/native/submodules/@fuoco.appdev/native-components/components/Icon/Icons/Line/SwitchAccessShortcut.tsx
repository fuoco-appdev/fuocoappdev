import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M8.06 8.94 6 8l2.06-.94L9 5l.94 2.06L12 8l-2.06.94L9 11l-.94-2.06ZM9 21l.94-2.06L12 18l-2.06-.94L9 15l-.94 2.06L6 18l2.06.94L9 21Zm-3.63-8.63L4 13l1.37.63L6 15l.63-1.37L8 13l-1.37-.63L6 11l-.63 1.37ZM13 12c0-3.09 1.38-5.94 3.44-8H13V2h7v7h-2V5.28c-1.8 1.74-3 4.2-3 6.72 0 3.32 2.1 6.36 5 7.82V22c-4.09-1.59-7-5.65-7-10Z" />
  </Svg>
)

export default Icon
