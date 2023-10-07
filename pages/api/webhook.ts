// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const accessToken = "jcpuNnqe4lKctn9BMjd8eRFLx9fIgsVj";
const myUserId = 21;
const baseURL = "http://localhost:3000";

type chatbotEventRequest = {
  event: "load" | "newUser" | "newRoom" | "createContact" | "newMessage"
  data?: any | chatbotEventRequestDataNewMessage,
  responsibleBotId: number
}

type User = {
  id: number,
  emailAddress: string,
  telephoneNumber: string,
  displayName: string,
}

type chatbotEventRequestDataNewMessage = {
  body: string,
  fromUserId: number,
  users: User[]
  room: {
    id: number,
    type: 'private' | 'group',
    name: string,
  }
  messageType: 'text' | 'file',
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {

  if (req.method !== "POST") {
    res.status(405).send("Method not allowed")
  }

  const webhookEvent: chatbotEventRequest = req.body as chatbotEventRequest;

  if (webhookEvent.event == "load") {

  }

  else if (webhookEvent.event == "newMessage") {


    (async () => {

      try {
        const webbookData: chatbotEventRequestDataNewMessage = webhookEvent.data;
        const roomId: number = webbookData.room.id;
        const fromUserId: number = webbookData.fromUserId;
        const message: string = webbookData.body;
        const botId: number = webhookEvent.responsibleBotId;

        if (fromUserId === myUserId) return; 6
        if (botId !== myUserId) return;

        await axios.post(`${baseURL}/api/messenger/messages`, {
          roomId: 3,
          type: "text",
          body: {
            text: `You said "${message}"`
          }
        }, {
          headers: {
            Accesstoken: accessToken
          }
        });
      } catch (e: any) {
        console.error(`Failed to send message on ${webhookEvent.event}`)
        console.error(e.message)
      }


    })()
  }

  res.status(200).send("OK")
}
