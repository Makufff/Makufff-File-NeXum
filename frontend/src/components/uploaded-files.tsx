"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadedFilesProps {
  files: string[]
}

export function UploadedFiles({ files }: UploadedFilesProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (path: string, index: number) => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4813"}${path}`)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getFileUrl = (path: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4813"}${path}`
  }

  const getFileName = (path: string) => {
    return path.split("/").pop() || "file"
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {files.map((file, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <div className="relative h-32 bg-muted">
                <Image
                  src={getFileUrl(file) || "/placeholder.svg"}
                  alt={getFileName(file)}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    // Fallback for images that can't be loaded
                    e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                  }}
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate mb-2">{getFileName(file)}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(getFileUrl(file), "_blank")}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleCopy(file, index)}>
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy URL
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}