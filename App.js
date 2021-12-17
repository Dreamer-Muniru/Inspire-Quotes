import React, {useState, useEffect} from 'react';
import Tts from 'react-native-tts';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// Tts.setDefaultLanguage('en-GB');
// Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
// Tts.setDefaultRate(0.5);
// Tts.setDefaultPitch(1.2);


const App =() => {
    const [Quote, setQuote] = useState('Loading...')
    const [Author, setAuthor] = useState('Loading...')
  const [isLoading, setIsloading] = useState(false)

  //Fetching Random API
    const randomQuote = () =>{
      setIsloading(true)
      fetch("https://api.quotable.io/random").then(res => res.json()).then(result =>{
        console.log(result)
        setQuote(result.content);
        setAuthor(result.author)
        setIsloading(false)
      })
    }

    useEffect(() =>{
      randomQuote();
    }, []);
    //Speak function (Only support by IOS)
  // const speakNow =() =>{
  // Tts.stop();
  //   Tts.speak(Quote)
  // }

  // Copy text
  const copyToClipboard = ()  =>{
    alert("Quote Copied!")
  }

      //Copy function (Still to fix errors)
  // const copyToClipboard = () =>{
  //   Clipboard.setString(Quote);
  //   Snackbar.show({
  //     text: 'Quote Copied',
  //     duration: Snackbar.LENGTH_SHORT,
  //   });
  // }

  // Share Quote to Twitter
 const tweetNow = () =>{
   const url = "https://twitter.com/intent/tweet?text=" + Quote;
   Linking.openURL(url)
 }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{marginTop: 100, color: '#fff', fontSize: 30}}>INSPIRE QUOTES</Text>
      <View style={styles.main}>
        <FontAwesome5 name="quote-left" style={styles.icon_left} /> 
        <Text style={styles.quote_title}>Quote of the day</Text>
        <Text style={styles.quote_text}>
          {Quote}
        </Text>
        <FontAwesome5 name="quote-right" style={styles.icon_right}  /> 
        <Text style={styles.author_name}>__ {Author} </Text>
        
        <TouchableOpacity style={{    padding: 20, 
            borderRadius: 30, marginVertical: 20, 
            backgroundColor: isLoading ? 'rgba(83, 114, 240, 0.7)' : '#000',  }}
            onPress={randomQuote}>
          <Text style={styles.btn_text}>{isLoading ? "Loading..." : "New Quote"}</Text>
        </TouchableOpacity >

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {/* <TouchableOpacity onPress={{}} style={styles.volume_icon}>
          <FontAwesome name="volume-up" size={22} color="#5372F0" />
          </TouchableOpacity> */}

          <TouchableOpacity onPress={copyToClipboard} style={styles.volume_icon}>
          <FontAwesome5 name="copy" size={22} color="#5372F0" />
          </TouchableOpacity>

          <TouchableOpacity onPress={tweetNow} style={styles.volume_icon}>
          <FontAwesome name="twitter" size={22} color="#5372F0" />
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
   
  },
  main:{
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 20
  },
  quote_title:{
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,

  },
  quote_text:{
    color: '#000',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 1.1,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 30
  },

  btn_text:{
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',

  },
  author_name:{
    textAlign: 'right',
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: 16,
    color: '#000'
  },

  icon_left:{
    color: 'purple',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: -12
  },
  icon_right:{
    color: 'purple',
    fontSize: 20,
    textAlign: 'right',
    marginBottom: 20
  },
  volume_icon:{
    borderWidth: 2,
    borderColor: '#5372F0',
    borderRadius: 50,
    padding: 10
    

  }


});

export default App;