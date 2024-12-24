import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  PropsWithChildren,
} from 'react'
import { Bike } from '../models/Bike'

interface BikeContextProps {
  bikes: Bike[]
  setBikes: React.Dispatch<React.SetStateAction<Bike[]>>
}

const BikeContext = createContext<BikeContextProps | undefined>(undefined)

export const BikeProvider = ({ children }: PropsWithChildren) => {
  const [bikes, setBikes] = useState<Bike[]>([])
  return (
    <BikeContext.Provider value={{ bikes, setBikes }}>
      {children}
    </BikeContext.Provider>
  )
}

export const useBikeContext = () => useContext(BikeContext) as BikeContextProps
