import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, ArrowRight, FileImage, Shield, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-background/80">
        <div className="container max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Upload className="h-6 w-6 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Secure File Upload API</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 glitch" data-text="File Upload System">
            File Upload System
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A modern, secure, and easy-to-use file upload system built with Rust and Axum on the backend.
          </p>

          <Link href="/upload">
            <Button size="lg" className="gap-2">
              Try File Upload
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-lg p-6 card-hover">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <FileImage className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple File Types</h3>
              <p className="text-muted-foreground">
                Support for PNG, WEBP, JPG, GIF, and BMP file formats with automatic validation.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 card-hover">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
              <p className="text-muted-foreground">
                Files are stored with randomized names and proper validation to ensure system security.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 card-hover">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Performance</h3>
              <p className="text-muted-foreground">
                Built with Rust and Axum for maximum performance and minimal resource usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-button terminal-button-red"></div>
              <div className="terminal-button terminal-button-yellow"></div>
              <div className="terminal-button terminal-button-green"></div>
              <div className="terminal-title">upload_api.rs</div>
            </div>
            <div className="terminal-content">
              <p className="mb-2">
                <span className="text-primary">$</span> curl -X POST -F &quot;images=@image.png&quot; {process.env.NEXT_PUBLIC_API_URL || "http://localhost:4813"}/upload
              </p>
              <pre className="text-sm text-muted-foreground mb-4">
                {JSON.stringify({ status: true, message: "Files uploaded successfully", file_paths: ["/data/abc123xyz.png"] }, null, 2)}
              </pre>
              <p className="text-primary">Ready to try it yourself?</p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/upload">
              <Button size="lg" className="gap-2">
                Go to Upload System
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} File Upload System. Built with Rust, Axum, and Next.js.</p>
        </div>
      </footer>
    </div>
  )
}

