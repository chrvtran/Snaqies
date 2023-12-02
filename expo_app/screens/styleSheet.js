import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    margin: 5,
    backgroundColor: '#33D7FF'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center'
  },
  cameraBottomContainer: {
    width: '100%',
    flex: 7
  },
  cameraButtonContainer: {
    // flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    bottom: 100,
    width: '100%',
    position: 'absolute'
  },
  cameraFullImageRoll: {
    height: 200,
    width: 100
  },
  cameraHeaderContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
    // height: 40,
    // width: 100,
  },
  cameraHeaderText: {
    fontWeight: 'bold',
    fontSize: 17
  },
  cameraIcon: {
    width: '100%',
    height: '100%',
    fill: '#748c94'
  },
  cameraImageContainer: {
    flex: 3,
    backgroundColor: 'yellow',
    alignSelf: 'stretch',
    height: '30%',
    flexDirection: 'row'
  },
  cameraImage: {
    height: 100,
    width: 100,
    borderRadius: 25
  }, 
  cameraImageInnerCont: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraImageRoll: {
    height: 80,
    width: 50,
    borderRadius: 5,
    marginLeft: 5
  }, 
  cameraLocationCont: {
    flex: 1,
    backgroundColor: 'blue'
  },
  cameraNextButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '200',
    backgroundColor: 'green'
  },
  cameraPicButtons: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    width: 100,
    height: 30,
    backgroundColor: 'white'
  },
  cameraPhotoList: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'white',
    width: '100%'
  },
  cameraPriceCont: {
    flex: 1,
    backgroundColor: 'green'
  },
  cameraRateCont: {
    flex: 1,
    backgroundColor: 'red'
  }, 
  cameraTextInput: {
    flex: 2,
    borderWidth: 1
    // alignContent: 'stretch',
  },
  cameraTopButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // backgroundColor: '#008000',
    width: 60
    // height: 40,
  },
  header: {
    width: '98%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between' 
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#737373',
    letterSpacing: 1
  },
  headerImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  }, 
  headerIcon: {
    width: '100%',
    height: '100%'
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
  imageIconContainer: {
    width: '50%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  locationMap: {
    width: '100%',
    height: '100%'
  },
  pricePickerText: {
    fontWeight: 'bold',
    fontSize: 32
  },
  ratingsText: {
    fontWeight: 'bold',
    fontSize: 32
  },
  reviewContainer: {
    backgroundColor: '#33D7FF'
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  sliderImage: {
    flex: 0.7,
    width: '100%'
  },
  slideItemsContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'yellow'
  },
  slideItemsImage: {
    flex: 0.7,
    width: '100%'
  },
  snaqContainer: {
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: 6,
    backgroundColor: '#33D7FF',
    width: '45%',
    height: 300
  },
  snaqButton: {
  },
  snaqPhoto: {
    borderRadius: 10,
    width: '100%',
    height: 300
  }
});

export default styles;