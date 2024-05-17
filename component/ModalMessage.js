import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

const ModalMessage = ({
  text,
  duration = 2000,
  closeMainModal,
  color="blue",
  registorIsOk,
  setThereIsError,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (registorIsOk) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (closeMainModal) {
          closeMainModal();
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[styles.messageText, { color: color }]}>{text}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setThereIsError(false);
            setVisible(false);
          }}
          style={{
            backgroundColor: "#5294D2",
            padding: 10,
            marginTop: 20,
            right: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 17, color: "white" }}>Ok</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
//
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
   ...StyleSheet.absoluteFillObject,
    position:"absolute",
    zIndex:10,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  messageText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ModalMessage;
