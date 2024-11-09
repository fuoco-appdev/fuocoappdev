import Svg, { Path } from 'react-native-svg';

const Icon = ({ size = 46, color = 'currentColor', ...props }) => (
  <Svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    
    {...props}
  >
    <Path d="M13.001 3v1h-2V3h2Zm-1 7.11 5.38 1.77 2.39.78-1.12 3.97c-.54-.3-.94-.71-1.14-.94l-1.51-1.73-1.51 1.72c-.34.4-1.28 1.32-2.49 1.32-1.21 0-2.15-.92-2.49-1.32l-1.51-1.72-1.51 1.72c-.2.23-.6.63-1.14.93l-1.13-3.96 2.4-.79 5.38-1.75Zm3-9.11h-6v3h-3c-1.1 0-2 .9-2 2v4.62l-1.29.42a1.007 1.007 0 0 0-.66 1.28l1.9 6.68h.05c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78a.997.997 0 0 0-.6-.5l-1.28-.42V6c0-1.1-.9-2-2-2h-3V1Zm-9 8.97V6h12v3.97l-6-1.97-6 1.97Zm10 9.71a6.985 6.985 0 0 1-4 1.28c-1.39 0-2.78-.43-4-1.28-1.22.85-2.61 1.32-4 1.32h-2v2h2c1.38 0 2.74-.35 4-.99 1.26.64 2.63.97 4 .97s2.74-.32 4-.97c1.26.65 2.62.99 4 .99h2v-2h-2c-1.39 0-2.78-.47-4-1.32Z" />
  </Svg>
)

export default Icon