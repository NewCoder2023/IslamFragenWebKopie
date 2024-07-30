import useColorSchemeStore from 'components/colorStore';

export function useColorScheme() {
  const colorScheme = useColorSchemeStore((state) => state.colorScheme);
  return colorScheme;
}
