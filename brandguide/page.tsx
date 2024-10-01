'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Copy } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export default function BrandguideAndDocsPage() {
  const [activeTab, setActiveTab] = useState("brandguide")
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The code has been copied to your clipboard.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Brandguide and Documentation</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="brandguide">Brand Guidelines</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="brandguide">
          <Card>
            <CardHeader>
              <CardTitle>BARK Brand Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Logo</h2>
                  <div className="flex space-x-4">
                    <img src="/placeholder.svg?height=100&width=100" alt="BARK Logo" className="w-24 h-24" />
                    <img src="/placeholder.svg?height=100&width=100" alt="BARK Logo (Dark)" className="w-24 h-24 bg-gray-800" />
                  </div>
                  <p className="mt-2">Use the appropriate logo version based on the background color.</p>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="w-full h-20 bg-primary rounded-md"></div>
                      <p className="mt-1 text-sm">Primary</p>
                    </div>
                    <div>
                      <div className="w-full h-20 bg-secondary rounded-md"></div>
                      <p className="mt-1 text-sm">Secondary</p>
                    </div>
                    <div>
                      <div className="w-full h-20 bg-accent rounded-md"></div>
                      <p className="mt-1 text-sm">Accent</p>
                    </div>
                    <div>
                      <div className="w-full h-20 bg-background rounded-md border"></div>
                      <p className="mt-1 text-sm">Background</p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Typography</h2>
                  <div className="space-y-2">
                    <p className="text-4xl font-bold">Heading 1</p>
                    <p className="text-3xl font-bold">Heading 2</p>
                    <p className="text-2xl font-bold">Heading 3</p>
                    <p className="text-xl font-semibold">Subheading</p>
                    <p className="text-base">Body text</p>
                    <p className="text-sm">Small text</p>
                  </div>
                  <p className="mt-2">We use the Inter font family for all text in the BARK Dashboard.</p>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>Developer Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="getting-started">
                  <AccordionTrigger>Getting Started</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">To get started with the BARK Dashboard, follow these steps:</p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Clone the repository: <code className="bg-muted p-1 rounded">git clone https://github.com/bark-protocol/dashboard.git</code></li>
                      <li>Install dependencies: <code className="bg-muted p-1 rounded">npm install</code></li>
                      <li>Set up environment variables: Copy <code className="bg-muted p-1 rounded">.env.example</code> to <code className="bg-muted p-1 rounded">.env.local</code> and fill in the required values</li>
                      <li>Run the development server: <code className="bg-muted p-1 rounded">npm run dev</code></li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="api-reference">
                  <AccordionTrigger>API Reference</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">The BARK Dashboard uses the following API endpoints:</p>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Endpoint</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>/api/tokens</TableCell>
                          <TableCell>GET</TableCell>
                          <TableCell>Retrieve user's token balances</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>/api/nfts</TableCell>
                          <TableCell>GET</TableCell>
                          <TableCell>Retrieve user's NFT collection</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>/api/swap</TableCell>
                          <TableCell>POST</TableCell>
                          <TableCell>Perform a token swap</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="components">
                  <AccordionTrigger>Components</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">Here are some key components used in the BARK Dashboard:</p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">TokenBalance</h3>
                        <p className="mb-2">Displays a user's token balance with a progress bar.</p>
                        <div className="bg-muted p-4 rounded-md">
                          <pre><code>{`<TokenBalance
  token="BARK"
  balance={1000}
  totalSupply={1000000}
/>`}</code></pre>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => copyToClipboard(`<TokenBalance
  token="BARK"
  balance={1000}
  totalSupply={1000000}
/>`)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">NFTCard</h3>
                        <p className="mb-2">Displays an NFT with its details.</p>
                        <div className="bg-muted p-4 rounded-md">
                          <pre><code>{`<NFTCard
  id={1}
  name="BARK #001"
  image="/nft-image.png"
  description="A rare BARK NFT"
/>`}</code></pre>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => copyToClipboard(`<NFTCard
  id={1}
  name="BARK #001"
  image="/nft-image.png"
  description="A rare BARK NFT"
/>`)}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}