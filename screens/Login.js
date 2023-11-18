import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { Divider, PaperProvider } from 'react-native-paper';
export default function App() {
    return (
        <PaperProvider>
            <View>
                <View style={styles.container}>
                    <View style={{
                        marginLeft: '8px',
                        height: '80px'
                    }}>
                        <Image style={styles.img} source={'https://hasaki.vn/images/graphics/img_login_fb_2.jpg'} />

                    </View>
                    <View style={
                        {
                            height: '50px'
                        }
                    }>
                        <Image style={styles.img} source={'https://hasaki.vn/images/graphics/img_login_gg_2.jpg'} />

                    </View>
                </View>

                <View style={styles.center}>
                    <Text>Hoặc tài khoản Hasaki.vn</Text>

                    <View style={{
                        marginTop: '100px',
                        width: '380px',
                        gap: '15px',
                        display: 'flex',
                        flex: '1'
                    }}>
                        <TextInput placeholderTextColor="gray" placeholder='Email/Phone number'></TextInput>
                        <Divider />
                        <TextInput placeholderTextColor="gray" placeholder='Password'></TextInput>
                        <Divider />
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}>
                            <Text style={{
                                display: 'flex',
                                color: '#0d5c37',
                                fontWeight: '600',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                width: '120px'

                            }}>Forgot password?</Text>

                        </View>

                    </View>
                    <View style={{
                        display: 'flex',
                        gap: '20px'
                    }}>
                        <Pressable style={{
                            width: '380px',
                            height: '50px',
                            backgroundColor: '#0d5c37'
                        }}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                                marginTop: '15px'
                            }}>LOGIN</Text>
                        </Pressable>

                        <Pressable style={{
                            width: '380px',
                            height: '50px',
                            border: '1px solid #0d5c37'
                        }}>
                            <Text style={{
                                color: '#0d5c37',
                                textAlign: 'center',
                                marginTop: '15px'
                            }}>SIGNUP</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </PaperProvider>
    )

};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        gap: '10px',
        justifyContent: 'center',
    },
    center: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    img: {
        height: '45px',
        width: '200px',
    },

}
)