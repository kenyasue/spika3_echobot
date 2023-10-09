// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const accessToken = process.env.ACCESS_TOKEN;
const myUserId = parseInt(process.env.USER_ID as string);
const baseURL = process.env.SPIKA_BASE_URL;

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

type chatbotEventRequestDataNewRoom = {
  room: {
    id: number,
    type: 'private' | 'group',
    name: string,
  }
}

type chatbotEventRequestDataNewUser = {
  userId: number
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

        if (fromUserId === myUserId) return; 
        if (botId !== myUserId) return;

        await axios.post(`${baseURL}/api/messenger/messages`, {
          roomId: roomId,
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

  else if (webhookEvent.event == "newUser") {

    /*
    (async () => {

      try {
        const webbookData: chatbotEventRequestDataNewUser = webhookEvent.data;
        const userId: number = webbookData.userId;
        const botId: number = webhookEvent.responsibleBotId;

        if (userId === myUserId) return;
        if (botId !== myUserId) return;


        let roomId: number = 0;

        try {
          const checkRoomResponse = await axios.get(`${baseURL}/api/messenger/rooms/users/${userId}`, {
            headers: {
              Accesstoken: accessToken
            }
          });

          console.log(checkRoomResponse);

          roomId = checkRoomResponse.data.room.id;

        } catch (e) {

          // create room
          const roomResponse = await axios.post(`${baseURL}/api/messenger/rooms`, {
            userIds: [userId]
          }, {
            headers: {
              Accesstoken: accessToken
            }
          });

          console.log(roomResponse)
          roomId = roomResponse.data.data.room.id;

        }

        await axios.post(`${baseURL}/api/messenger/messages`, {
          roomId: roomId,
          type: "text",
          body: {
            text: `Hi I'm echo bot. I do nothin. Just say what you said.`
          }
        }, {
          headers: {
            Accesstoken: accessToken
          }
        });

      } catch (e: any) {
        console.error(`Failed to handle newMessage ${webhookEvent.event}`)
        console.error(e.message)
      }
      

    })()
    */
  }


  else if (webhookEvent.event == "newRoom") {

    (async () => {

      try {
        try {

          const webbookData: chatbotEventRequestDataNewRoom = webhookEvent.data;
          const roomId: number = webbookData.room.id;
          const botId: number = webhookEvent.responsibleBotId;

          if (botId !== myUserId) return;

          await axios.post(`${baseURL}/api/messenger/messages`, {
            roomId: roomId,
            type: "text",
            body: {
              text: `Hi I'm echo bot.`
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

      } catch (e: any) {
        console.error(`Failed to handle newMessage ${webhookEvent.event}`)
        console.error(e.message)
      }


    })()


  }

  res.status(200).send("OK")
}
