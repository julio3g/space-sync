'use client'

import { clientWAAutomate } from "@/lib/client-wa-automate"
import { useEffect } from "react"

export function InitWA() {
  useEffect(()=> {
    clientWAAutomate()
  },[])
  return <></>
}