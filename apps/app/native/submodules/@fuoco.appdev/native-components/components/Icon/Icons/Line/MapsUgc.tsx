import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M12.5 3.5c4.41 0 8 3.59 8 8s-3.59 8-8 8c-1.18 0-2.34-.26-3.43-.78-.27-.13-.56-.19-.86-.19-.19 0-.38.03-.56.08l-3.2.94.94-3.2c.14-.47.1-.98-.11-1.42a7.925 7.925 0 0 1-.78-3.43c0-4.41 3.59-8 8-8Zm0-2c-5.52 0-10 4.48-10 10 0 1.54.36 2.98.97 4.29L1.5 22.5l6.71-1.97c1.31.61 2.75.97 4.29.97 5.52 0 10-4.48 10-10s-4.48-10-10-10Z" />
    <Path
      fillRule="evenodd"
      d="M13.5 7.5h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
