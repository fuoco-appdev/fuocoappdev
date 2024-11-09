import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M9 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M15 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <Path d="M5.78 15.5h.44c.43 0 .78-.36.78-.81V13.5h10v1.19c0 .45.34.81.78.81h.44c.43 0 .78-.36.78-.81v-6.5L17.44 3.5c-.05-.16-.12-.29-.19-.4-.02-.02-.03-.04-.05-.07-.38-.52-.92-.53-.92-.53H7.72s-.54.01-.92.54c-.02.02-.03.04-.05.06-.07.11-.14.24-.19.4L5 8.19v6.5c0 .45.35.81.78.81Zm2.55-11h7.34l.23.69.43 1.31H7.67l.66-2ZM7 8.5h10v3H7v-3Z" />
    <Path d="M4 16.51v1.99h7v3h2v-3h7v-1.99H4Z" />
  </Svg>
)

export default Icon
