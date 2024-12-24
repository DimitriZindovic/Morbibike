import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Bike } from '../models/Bike'

interface BikeContextProps {
  bikes: Bike[]
  setBikes: React.Dispatch<React.SetStateAction<Bike[]>>
}

const BikeContext = createContext<BikeContextProps | undefined>(undefined)

export const BikeProvider = ({ children }: { children: ReactNode }) => {
  const [bikes, setBikes] = useState<Bike[]>([])
  return (
    <BikeContext.Provider value={{ bikes, setBikes }}>
      {children}
    </BikeContext.Provider>
  )
}

export const useBikeContext = () => {
  const context = useContext(BikeContext)
  if (!context) {
    throw new Error('useBikeContext must be used within a BikeProvider')
  }
  return context
}
