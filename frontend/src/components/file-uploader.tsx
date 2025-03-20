"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload, X, AlertCircle, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FileUploaderProps {
  onUpload: (files: File[]) => void
  isUploading: boolean
}

export function FileUploader({ onUpload, isUploading }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [validationError, setValidationError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILES = 10
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED_TYPES = [".png", ".webp", ".jpg", ".jpeg", ".gif", ".bmp"]

  const validateFiles = (files: File[]): boolean => {
    if (files.length > MAX_FILES) {
      setValidationError(`Maximum ${MAX_FILES} files allowed per upload`)
      return false
    }

    for (const file of files) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setValidationError(`File "${file.name}" exceeds the 10MB size limit`)
        return false
      }

      // Check file type
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
      if (!ALLOWED_TYPES.includes(fileExtension)) {
        setValidationError(`Only ${ALLOWED_TYPES.join(", ")} files are supported`)
        return false
      }
    }

    setValidationError(null)
    return true
  }

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files)
      if (validateFiles(filesArray)) {
        setSelectedFiles(filesArray)
      }
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      if (validateFiles(filesArray)) {
        setSelectedFiles(filesArray)
      }
    }
  }

  const handleUploadClick = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles)
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const openFileSelector = () => {
    fileInputRef.current?.click()
  }

  const clearFiles = () => {
    setSelectedFiles([])
    setValidationError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          } transition-colors`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_TYPES.join(",")}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Drag and drop your files</h3>
              <p className="text-sm text-muted-foreground mt-1">
                or{" "}
                <button type="button" onClick={openFileSelector} className="text-primary hover:underline">
                  browse
                </button>{" "}
                to select files
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>Supported formats: PNG, WEBP, JPG, GIF, BMP</p>
              <p>Maximum 10 files, 10MB each</p>
            </div>
          </div>
        </div>

        {validationError && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-start gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>{validationError}</p>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Selected Files ({selectedFiles.length})</h3>
              <Button variant="ghost" size="sm" onClick={clearFiles}>
                Clear all
              </Button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted/40 p-2 rounded-md">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileImage className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeFile(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleUploadClick}
                disabled={isUploading || selectedFiles.length === 0}
                className="gap-2"
              >
                {isUploading ? (
                  <>
                    <span className="animate-pulse">Uploading...</span>
                    <Progress value={45} className="w-16 h-2" />
                  </>
                ) : (
                  <>
                    Upload Files
                    <Upload className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
