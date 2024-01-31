import { Channel, Members } from "pusher-js"
import userActivelist from "./useActiveList"
import { useEffect, useState } from "react"
import { pusherClient } from "../libs/pusher"

const useActiveChannel = () => {
    const { set, add, remove } = userActivelist()
    const [activeChannel, setactiveChannel] = useState<Channel | null>(null)

    useEffect(() => {
      
        let channel = activeChannel

        if (!channel) {
            channel = pusherClient.subscribe('presence-messenger')
            setactiveChannel(channel)
        }

        channel.bind('pusher:subscription_succeeded',(members:Members)=>{
            const initialMembers: string[] = []

            members.each((member:Record<string,any>) => initialMembers.push(member.id))
            set(initialMembers)
        })

        channel.bind('pusher:member_added',(member:Record<string,any>)=>{
            add(member.id)
        })

        channel.bind('pusher:member_removed',(member:Record<string,any>)=>{
            remove(member.id)
        })

        return()=>{
            if (activeChannel) {
                pusherClient.unsubscribe('presence-messenger')
                setactiveChannel(null)
            }
        }


    }, [activeChannel,set,add,remove])
    
}

export default useActiveChannel