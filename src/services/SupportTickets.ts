/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/configs/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export async function addNewTicket(
  values: any,
  user_id: string,
  username: string
) {
  try {
    const docRef = collection(db, "tickets");
    const newTopic = await addDoc(docRef, {
      created_at: new Date(),
      topic: values?.topic,
      description: values?.description,
      user_id,
      username,
      status: "opened",
    });
    if (newTopic) {
      const chatRef = collection(db, "tickets", newTopic.id, "conversation");
      await addDoc(chatRef, {
        created_at: new Date(),
        text: values?.description,
        images: [],
        user_id,
        username,
      });
    }
    return { status: true, id: newTopic.id };
  } catch (error) {
    console.error("fallo al agregar el ticket", error);
    return { status: false, id: "" };
  }
}

export async function sendMessage(values: any) {
  try {
    const chatRef = collection(db, "tickets", values.id, "conversation");
    await addDoc(chatRef, {
      created_at: new Date(),
      text: values?.description,
      images: [],
      user_id: values.user_id,
      username: values.username,
      unread: true,
    });
  } catch (error) {
    console.error("fallo al enviar el mensaje", error);
  }
}

export async function readMessage(values: any) {
  const chatRef = collection(db, "tickets", values.id, "conversation");
  const q = query(
    chatRef,
    where("user_id", "!=", values.user_id),
    where("unread", "==", true)
  );
  const chats_unread = await getDocs(q);
  if (!chats_unread.empty) {
    await Promise.all(
      chats_unread.docs.map(async (chat) => {
        const chatUnreadRef = doc(
          db,
          "tickets",
          values.id,
          "conversation",
          chat.id
        );
        await updateDoc(chatUnreadRef, {
          unread: false,
        });
      })
    );
  }
}
