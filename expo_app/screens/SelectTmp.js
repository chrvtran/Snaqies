<SafeAreaView style={styles.container}>
            {/*
            <Slider ref={sliderRef} photos={photoSet} style={styles.sliderContainer} />
            */}
          {photoSet[selectedPhotoIndex] && (
            <Image
              style={styles.selectedImage}
              source={{ uri: photoSet[selectedPhotoIndex].uri }}
            />
          )}


          {/* Back Arrow Button */}
          <View style={styles.touchableBackButtonArea}>
            <TouchableOpacity 
              onPress={() => console.log("Go back home!")}
              style={styles.touchableBackButtonArea}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} 
              activeOpacity={0.7}
            >
              <BackArrow style={{ fill: 'black' }} />
            </TouchableOpacity>
          </View>

          {/* Forward Arrow Button */}
          <View style={styles.nextButton}>
          <TouchableOpacity
            style={styles.selectNextButton}
            onPress={() => {
              storeData(true, null);
              navigation.navigate("Location", {
                key: key,
                photoSet: photoSet,
                setPhotoSet: setPhotoSet,
                photoList: photoList,
              });
            }}
            >
              <NextArrow />
            </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
                <Text style={styles.title}>New Post</Text>
                <Text style={[styles.subtitle, { marginTop: 10 }]}>Which photos do you want to Snaq?</Text>
            </View>

          {/* Bar */}
          <View style={styles.bar}>
            <View style={styles.barRight}>
              <TouchableOpacity style={styles.iconButton} onPress={uploadPhoto}>
                <UploadButton width={24} height={24} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.barButton} onPress={async () => {
                navigation.navigate("Home");
                await handleSaveDraft();
                
                // Clear photo set
                photoList.current = [];
                setPhotoSet([]);
                setPickedImages(false);
              }}>
              <Text>Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.barButton} onPress={() =>
              navigation.navigate("TagFood", {
                image: selectedPhotoIndex !== null ? photoSet[selectedPhotoIndex] :  photoSet[0],
              })
            }>
              
              <Text>Tag Food</Text>
            </TouchableOpacity>
            <View style={styles.barRight}>
              <TouchableOpacity style={styles.iconButton}  onPress={savePhoto}>
                <DownloadButton />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={deletePhoto}>
                <TrashCanButton />
              </TouchableOpacity>
            </View>
          </View>

          {/* Area towards the bottom */}
          <SafeAreaView style={styles.photoList}>
            <ScrollView horizontal={true}>
              {photoSet && photoSet.map((photo, index) => (
                <Pressable
                  key={index}
                  onPress={() => handlePhotoSelect(index)} 
                  style={[
                    styles.imageContainer,
                    selectedPhotoIndex === index && styles.selectedPhotoContainer,
                  ]}
                >
                  <Image
                    style={[
                      styles.imageRoll,
                      selectedPhotoIndex === index && styles.selectedPhoto,
                    ]}
                    source={{ uri: photo.uri }}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </SafeAreaView>
          <StatusBar style="auto" />
        </SafeAreaView>
/*
<SafeAreaView style={styles.photoList}>
<ScrollView horizontal={true}>
    {photos.map((photo, index) => (
        <Pressable
          key={index}
          onPress={() => setIndex(index)}
          style={[styles.imageContainer, styles.selectedPhotoContainer]}
        >
            <Image
              style={[
                styles.imageRoll, 
                selectedIndex === index && styles.selectedPhoto
              ]}
              source={ {uri: photo} }
             />
        </Pressable>
    ))}
</ScrollView>
</SafeAreaView>
<StatusBar style="auto" />
*/