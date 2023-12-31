import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 10,
        paddingTop: 15,
        backgroundColor: '#201520',
        alignItems: 'center',
    },
    // Top layout
    topLayout: {
        width: '100%',
        height: 180,
        flexDirection: 'row',
    },
    // Left layout
    leftLayout: {
        width: '70%',
        height: '100%',
        justifyContent: 'center',
    },
    text: {
        color: '#EFE3C8',
        width: '100%',
        fontSize: 22,
    },
    // Right layout
    rightLayout: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    imgAvatar: {
        width: 65,
        height: 65,
        borderWidth: 2,
        borderColor: '#EFE3C8',
        borderRadius: 100,
        overflow: 'hidden',
    },
    // Bottom layout
    bottomLayout: {
        marginTop: 10,
        height: '85%', 
    },
    imgFeature:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },  
    imgFeatureBox: {
        width: 330,
        height: 180,
        backgroundColor: 'red',
        marginRight: 13,
        borderRadius: 30,
        overflow: 'hidden',
    },
    listHeader: {
        color: '#EFE3C8',
        fontSize: 23,
        marginVertical: 5,
        fontWeight: 'bold'
    }
})