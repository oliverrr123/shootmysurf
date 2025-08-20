"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"

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

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem } = useCart()

  const itemsByAlbum = useMemo(() => {
    const groups: Record<number, CartItem[]> = {}
    for (const item of items) {
      if (!groups[item.albumId]) groups[item.albumId] = []
      groups[item.albumId].push(item)
    }
    return groups
  }, [items])

  const orderSummary = useMemo(() => {
    const totalCents = items.reduce((sum, item) => sum + item.priceCents, 0)
    return {
      count: items.length,
      totalCents,
    }
  }, [items])

  return (
    <div className="pt-20 pb-20">
      <div className="w-full px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: Cart list */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold text-[#163F69] font-neulis">Your cart</h1>

            {items.length === 0 ? (
              <div className="bg-white rounded-3xl border-2 border-[#EEEEEE] p-8 text-center">
                <p className="text-lg text-[#163F69]">You don't have any photos in your cart</p>
              </div>
            ) : (
              Object.values(itemsByAlbum).map((group) => {
                const first = group[0]
                return (
                  <div
                    key={`${first.albumId}`}
                    className="bg-white rounded-3xl border-2 border-[#EEEEEE]"
                  >
                    {/* Album header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[#EEEEEE]">
                      <div className="flex items-center gap-4 flex-wrap">
                        <h2 className="text-lg md:text-xl font-bold text-[#163F69]">{first.albumTitle}</h2>
                        <div className="flex items-center gap-2 text-[#163F69] text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(first.date)} | {first.time}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 mr-1">Seller:</span>
                        <button
                          className="text-[#163F69] font-semibold underline-offset-2 hover:underline"
                          onClick={() =>
                            router.push(`/photographers/${slugify(first.sellerName)}`)
                          }
                        >
                          {first.sellerName}
                        </button>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="px-4 py-4 space-y-4">
                      {group.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border-2 border-[#EEEEEE] p-3 md:p-4"
                        >
                          <div className="grid grid-cols-[160px_minmax(4rem,100px)_1fr_auto] md:grid-cols-[208px_minmax(4rem,100px)_1fr_auto] items-center gap-4">
                            <div className="relative h-28 w-40 md:h-32 md:w-52 rounded-xl overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={`${item.albumTitle} photo ${item.id}`}
                                className="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                              />
                            </div>

                            <div className="text-[#163F69] text-sm md:text-base font-semibold whitespace-nowrap pl-1">{(item.priceCents / 100).toFixed(0)} €</div>

                            <div></div>

                            <div className="flex items-center justify-end">
                              <button
                                className="h-9 w-9 inline-flex items-center justify-center rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50"
                                aria-label="Remove item"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Right: Summary */}
          {items.length > 0 && (
            <aside className="lg:col-span-1 relative">
              <div className="bg-white rounded-3xl border-2 border-[#EEEEEE] p-5 fixed top-28 w-[calc(100vw-2rem-66.666667%)] right-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#163F69] font-neulis mb-4">Order summary</h2>

                <div className="space-y-3 text-[#163F69] mb-4">
                  <div className="flex items-center justify-between">
                    <span>Items ({orderSummary.count})</span>
                    <span>{(orderSummary.totalCents / 100).toFixed(0)} €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{(orderSummary.totalCents / 100).toFixed(0)} €</span>
                  </div>
                </div>

                <Button className="w-full bg-[#163F69] hover:bg-[#163F69]/90 rounded-full h-11">Go to checkout</Button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}


