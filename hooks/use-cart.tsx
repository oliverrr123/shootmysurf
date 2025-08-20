"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

type CartItem = {
  id: number
  albumId: number
  albumTitle: string
  date: Date
  time: string
  sellerName: string
  imageUrl: string
  priceCents: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: number) => void
  clearCart: () => void
  cartCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      albumId: 101,
      albumTitle: "Beach",
      date: new Date(2025, 6, 25),
      time: "10:00 - 12:00",
      sellerName: "John Doe",
      imageUrl: "/images/card.jpg",
      priceCents: 600,
    },
    {
      id: 2,
      albumId: 101,
      albumTitle: "Beach",
      date: new Date(2025, 6, 25),
      time: "10:00 - 12:00",
      sellerName: "John Doe",
      imageUrl: "/images/card.jpg",
      priceCents: 600,
    },
    {
      id: 3,
      albumId: 202,
      albumTitle: "Beach",
      date: new Date(2025, 6, 25),
      time: "10:00 - 12:00",
      sellerName: "John Doe",
      imageUrl: "/images/card.jpg",
      priceCents: 800,
    },
    {
      id: 4,
      albumId: 303,
      albumTitle: "Sunset Surf",
      date: new Date(2025, 7, 15),
      time: "18:00 - 20:00",
      sellerName: "Sarah Wilson",
      imageUrl: "/images/card.jpg",
      priceCents: 750,
    },
    {
      id: 5,
      albumId: 303,
      albumTitle: "Sunset Surf",
      date: new Date(2025, 7, 15),
      time: "18:00 - 20:00",
      sellerName: "Sarah Wilson",
      imageUrl: "/images/card.jpg",
      priceCents: 750,
    },
    {
      id: 6,
      albumId: 404,
      albumTitle: "Big Wave Challenge",
      date: new Date(2025, 8, 3),
      time: "14:00 - 16:00",
      sellerName: "Mike Johnson",
      imageUrl: "/images/card.jpg",
      priceCents: 900,
    },
    {
      id: 7,
      albumId: 505,
      albumTitle: "Morning Session",
      date: new Date(2025, 6, 30),
      time: "06:00 - 08:00",
      sellerName: "Emma Davis",
      imageUrl: "/images/card.jpg",
      priceCents: 650,
    },
    {
      id: 8,
      albumId: 505,
      albumTitle: "Morning Session",
      date: new Date(2025, 6, 30),
      time: "06:00 - 08:00",
      sellerName: "Emma Davis",
      imageUrl: "/images/card.jpg",
      priceCents: 650,
    },
    {
      id: 9,
      albumId: 606,
      albumTitle: "Storm Surf",
      date: new Date(2025, 7, 22),
      time: "12:00 - 14:00",
      sellerName: "Carlos Rodriguez",
      imageUrl: "/images/card.jpg",
      priceCents: 850,
    },
    {
      id: 10,
      albumId: 707,
      albumTitle: "Weekend Warriors",
      date: new Date(2025, 8, 10),
      time: "09:00 - 11:00",
      sellerName: "Lisa Chen",
      imageUrl: "/images/card.jpg",
      priceCents: 700,
    },
  ])

  const addItem = (item: CartItem) => {
    setItems(prev => [...prev, { ...item, id: Date.now() }])
  }

  const removeItem = (itemId: number) => {
    setItems(prev => prev.filter(item => item.id !== itemId))
  }

  const clearCart = () => {
    setItems([])
  }

  const cartCount = items.length
  const totalPrice = items.reduce((sum, item) => sum + item.priceCents, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      cartCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
