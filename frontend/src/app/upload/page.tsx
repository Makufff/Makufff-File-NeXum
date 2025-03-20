"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileUploader } from "@/components/file-uploader"
import { UploadedFiles } from "@/components/uploaded-files"
import { UploadStats } from "@/components/upload-stats"
import type { ApiResponse } from "@/types/api"
import { ArrowLeft, Upload, FileImage, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { env } from "@/config/env"

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResponse, setUploadResponse] = useState<ApiResponse | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [glitchActive, setGlitchActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [progress, setProgress] = useState(0)
  const [processedFiles, setProcessedFiles] = useState(0)
  const [totalSize, setTotalSize] = useState(0)
  const [processedSize, setProcessedSize] = useState(0)

  // Randomly trigger glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      
      // Check file sizes
      const oversizedFiles = selectedFiles.filter(file => file.size > env.maxFileSize)
      if (oversizedFiles.length > 0) {
        alert(`Some files exceed the maximum size of ${env.maxFileSize / (1024 * 1024)}MB`)
        return
      }

      setFiles(selectedFiles)
      setTotalSize(selectedFiles.reduce((acc, file) => acc + file.size, 0))
      setProcessedSize(0)
      setProcessedFiles(0)
      setProgress(0)
    }
  }

  const handleUpload = async () => {
    if (!files.length) return

    setIsUploading(true)
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }

    try {
      const response = await fetch(`${env.apiUrl}/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      setProgress(100)
      setProcessedFiles(files.length)
      setProcessedSize(totalSize)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <main className={`container mx-auto px-4 py-8 ${glitchActive ? "glitch-container" : ""}`}>
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8 glitch" data-text="File Upload System">
        File Upload System
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className={`${glitchActive ? "glitch-card" : ""}`}>
            <FileUploader onUpload={handleUpload} isUploading={isUploading} onFileChange={handleFileChange} />
          </div>

          {uploadResponse && (
            <div
              className={`mt-6 p-4 rounded-md ${uploadResponse.status ? "bg-primary/10 text-primary border border-primary/30" : "bg-destructive/10 text-destructive border border-destructive/30"} ${glitchActive ? "glitch-text" : ""}`}
            >
              <p className="font-medium">{uploadResponse.message}</p>
              {uploadResponse.file_paths.length > 0 && (
                <ul className="mt-2 text-sm">
                  {uploadResponse.file_paths.map((path, index) => (
                    <li key={index} className="truncate">
                      {path}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div>
          <div className={`${glitchActive ? "glitch-card" : ""}`}>
            <UploadStats
              progress={progress}
              totalFiles={files.length}
              processedFiles={processedFiles}
              totalSize={totalSize}
              processedSize={processedSize}
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className={`mt-6 ${glitchActive ? "glitch-card" : ""}`}>
              <h2 className="text-xl font-semibold mb-4 glitch" data-text="Uploaded Files">
                Uploaded Files
              </h2>
              <UploadedFiles files={uploadedFiles} />
            </div>
          )}
        </div>
      </div>

      {/* Glitch overlay elements */}
      <div className={`glitch-overlay ${glitchActive ? "active" : ""}`}></div>
      <div className={`glitch-scanlines ${glitchActive ? "active" : ""}`}></div>

      {/* Floating glitch elements */}
      <div className="fixed pointer-events-none z-10">
        <div className={`glitch-element upload-icon ${Math.random() > 0.5 ? "active" : ""}`}>
          <Upload className="h-8 w-8 text-primary opacity-30" />
        </div>
        <div className={`glitch-element file-icon ${Math.random() > 0.5 ? "active" : ""}`}>
          <FileImage className="h-8 w-8 text-primary opacity-30" />
        </div>
        <div className={`glitch-element alert-icon ${Math.random() > 0.5 ? "active" : ""}`}>
          <AlertCircle className="h-8 w-8 text-destructive opacity-30" />
        </div>
      </div>
    </main>
  )
}

