import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileImage, FileCheck, FileX, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { env } from "@/config/env"

interface UploadStatsProps {
  progress: number;
  totalFiles: number;
  processedFiles: number;
  totalSize: number;
  processedSize: number;
}

export function UploadStats({
  progress,
  totalFiles,
  processedFiles,
  totalSize,
  processedSize,
}: UploadStatsProps) {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Info className="h-5 w-5" />
          Upload Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <FileImage className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Supported File Types</h3>
              <p className="text-sm text-muted-foreground">PNG, WEBP, JPG, GIF, BMP</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <FileCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">File Limits</h3>
              <p className="text-sm text-muted-foreground">Maximum 10 files per upload</p>
              <p className="text-sm text-muted-foreground">Maximum 10MB per file</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <FileX className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">API Endpoint</h3>
              <p className="text-sm text-muted-foreground">POST {process.env.NEXT_PUBLIC_API_URL || "http://localhost:4813"}/upload</p>
              <p className="text-sm text-muted-foreground">Form key: &quot;images&quot;</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Uploading {processedFiles} of {totalFiles} files
            </div>
            <div className="text-sm text-muted-foreground">
              {formatSize(processedSize)} of {formatSize(totalSize)}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-muted-foreground">
            Maximum file size: {formatSize(env.maxFileSize)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
