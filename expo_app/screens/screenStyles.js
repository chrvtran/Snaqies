import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  COBottomContainer: {
    width: '100%',
    flex: 7
  },
  COButtonContainer: {
    // flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    bottom: 100,
    width: '100%',
    position: 'absolute',
  },
  COContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  COFullImageRoll: {
    height: 200,
    width: 100
  },
  COHeaderContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // height: 40,
    // width: 100,
  },
  COHeaderText: {
    fontWeight: 'bold',
    fontSize: 17
  },
  COIcon: {
    width: '100%',
    height: '100%',
    fill: '#748c94'
  },
  COImageContainer: {
    flex: 3,
    backgroundColor: 'yellow',
    alignSelf: 'stretch',
    height: '30%',
    flexDirection: 'row',
  },
  COImage: {
    height: 100,
    width: 100,
    borderRadius: 25
  }, 
  COImageInnerCont: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  COImageRoll: {
    height: 80,
    width: 50,
    borderRadius: 5,
    marginLeft: 5
  }, 
  COLocationCont: {
    flex: 1,
    backgroundColor: 'blue'
  },
  CONextButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '200',
    backgroundColor: 'green'
  },
  COPicButtons: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    width: 100,
    height: 30,
    backgroundColor: 'white'
  },
  COPhotoList: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'white',
    width: '100%'
  },
  COPriceCont: {
    flex: 1,
    backgroundColor: 'green'
  },
  CORateCont: {
    flex: 1,
    backgroundColor: 'red'
  }, 
  COTextInput: {
    flex: 2,
    borderWidth: 1
    // alignContent: 'stretch',
  },
  COTopButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // backgroundColor: '#008000',
    width: 60
    // height: 40,
  },
    homeContainer: {
      backgroundColor: '#fff'
  },
  homeSnaqContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: '#fff'
  },
  homeHeaderText: {
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 20,
      marginTop: 15,
      marginBottom: 5
  },
  locationContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locationMap: {
    width: '100%',
    height: '100%'
  },
  postContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  priceContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pricePickerText: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingsText: {
      fontWeight: 'bold',
      fontSize: 32
  },
  reviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default styles;