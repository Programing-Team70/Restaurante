import { View, ActivityIndicator } from 'react-native';

export const Spinner = () => {
    return (
        <View className='w-full h-full flex items-center justify-center'>
            <ActivityIndicator size='large' color='#3b82f6' />
        </View>
    );
};
