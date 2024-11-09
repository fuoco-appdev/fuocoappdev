import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M16 15.62a1.12 1.12 0 1 0 0-2.24 1.12 1.12 0 0 0 0 2.24Z" />
    <Path
      fillRule="evenodd"
      d="M16 16.5c-.73 0-2.19.36-2.24 1.08.5.71 1.32 1.17 2.24 1.17.92 0 1.74-.46 2.24-1.17-.05-.72-1.51-1.08-2.24-1.08Z"
      clipRule="evenodd"
    />
    <Path
      fillRule="evenodd"
      d="M17 10.09V5.27L9.5 2 2 5.27v4.91c0 4.54 3.2 8.79 7.5 9.82.55-.13 1.08-.32 1.6-.55A5.973 5.973 0 0 0 16 22c3.31 0 6-2.69 6-6 0-2.97-2.16-5.43-5-5.91ZM10 16c0 .56.08 1.11.23 1.62-.24.11-.48.22-.73.3-3.17-1-5.5-4.24-5.5-7.74v-3.6l5.5-2.4 5.5 2.4v3.51c-2.84.48-5 2.94-5 5.91Zm6 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4Z"
      clipRule="evenodd"
    />
  </Svg>
)

export default Icon
