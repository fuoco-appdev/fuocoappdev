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
      d="M9.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm6.99 8.25v1.75H22V17h-5.51v1.75L14 16.25l2.49-2.5Zm-2.49 6h5.51V18L22 20.5 19.51 23v-1.75H14v-1.5ZM3 23 5.75 8.9 4 9.65V13H2V8.3l5.25-2.15c.25-.1.5-.15.75-.15.7 0 1.35.35 1.7.95l.95 1.6C11.55 10 13.15 11 15 11v2c-2.2 0-4.15-1-5.45-2.6l-.6 3L11 15.45V23H9v-6l-2.15-2-1.75 8H3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
