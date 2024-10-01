'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Pagination } from "@/components/ui/pagination"

const mockProducts = [
  { id: 1, name: "BARK T-Shirt", price: 25, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "BARK Hoodie", price: 50, image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "BARK Cap", price: 20, image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "BARK Mug", price: 15, image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "BARK Sticker Pack", price: 10, image: "/placeholder.svg?height=100&width=100" },
]

const mockOrders = [
  { id: 1, product: "BARK T-Shirt", quantity: 2, total: 50, date: "2023-05-01", status: "Shipped" },
  { id: 2, product: "BARK Hoodie", quantity: 1, total: 50, date: "2023-04-30", status: "Processing" },
  { id: 3, product: "BARK Cap", quantity: 3, total: 60, date: "2023-04-29", status: "Delivered" },
]

export default function CommercePage() {
  const [cart, setCart] = useState<{id: number, name: string, price: number, quantity: number}[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { toast } = useToast()

  const itemsPerPage = 3
  const totalPages = Math.ceil(mockOrders.length / itemsPerPage)
  const paginatedOrders = mockOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const addToCart = (product: typeof mockProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed.",
    })

    setCart([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">BARK Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {mockProducts.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg">
                  <img src={product.image} alt={product.name} className="w-full h-auto mb-2" />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>${product.price}</p>
                  <Button onClick={() => addToCart(product)} className="mt-2 w-full">Add to Cart</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price * item.quantity}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="font-semibold">Total: ${getTotalPrice()}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={cart.length === 0}>Checkout</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Order</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to place this order?
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p><strong>Total:</strong> ${getTotalPrice()}</p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>Cancel</Button>
                  <Button onClick={handleCheckout}>Place Order</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardFooter>
      </Card>
    </div>
  )
}