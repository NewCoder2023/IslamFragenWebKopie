import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { useColorScheme } from 'hooks/useColorScheme.web';

interface HeaderLeftProps {
  canBack: boolean;
}

const HeaderLeft: React.FC<HeaderLeftProps> = ({ canBack }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  
  return (
    <View style={styles.canBack}>
      {canBack ? (
        <Pressable onPress={router.back}>
          <Entypo name="chevron-left" size={24} color={colorScheme === 'light' ? 'black' : 'white'} />
        </Pressable>
      ) : (
        <Pressable onPress={() => router.push('/')}>
          <Entypo name="home" size={24} color={colorScheme === 'light' ? 'black' : 'white'} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  canBack: {
    backgroundColor: 'transparent',
    marginLeft: 15,
  },
});

export default HeaderLeft;
