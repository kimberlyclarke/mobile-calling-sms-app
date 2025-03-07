import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import twilio from 'twilio';  // You may need to install Twilio SDK (react-native-twilio)

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [callStatus, setCallStatus] = useState('');

  // Twilio credentials (store securely)
  const twilioAccountSid = 'AC9332c4bb09dace138874148d';
  const twilioAuthToken = '9827b3a959d5c1c429bbb688f6';
  const twilioPhoneNumber = '+18667070019';

  // Function to send SMS via Twilio API
  const sendSMS = async () => {
    try {
      // Make a request to your server or use Twilio's API directly
      const response = await fetch('https://twilio.com/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message,
          from: twilioPhoneNumber,
        }),
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('SMS Sent Successfully!');
      } else {
        Alert.alert('Failed to Send SMS');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error Sending SMS');
    }
  };

  // Function to initiate a call via Twilio API
  const initiateCall = async () => {
    try {
      const response = await fetch('https://twilio.com/make-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          from: twilioPhoneNumber,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCallStatus('Call Initiated');
        Alert.alert('Call Initiated');
      } else {
        setCallStatus('Failed to Initiate Call');
        Alert.alert('Call Failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error Initiating Call');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Twilio SMS and Call App</Text>

      {/* Phone number input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
      />

      {/* Message input */}
      <TextInput
        style={styles.input}
        placeholder="Enter SMS Message"
        onChangeText={setMessage}
        value={message}
      />

      <View style={styles.buttonContainer}>
        {/* Send SMS button */}
        <Button title="Send SMS" onPress={sendSMS} />
        {/* Initiate Call button */}
        <Button title="Initiate Call" onPress={initiateCall} />
      </View>

      {/* Call Status */}
      {callStatus ? <Text style={styles.statusText}>{callStatus}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  statusText: {
    marginTop: 20,
    color: 'green',
    fontSize: 16,
  },
});
