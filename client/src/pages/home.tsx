import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" data-testid="icon-logo" />
            <h1 className="text-xl font-semibold" data-testid="text-app-title">Invoice Generator</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" data-testid="text-hero-heading">Create Professional Invoices</h2>
            <p className="text-muted-foreground text-lg" data-testid="text-hero-description">
              A simple and clean foundation for building your custom invoice generator
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card data-testid="card-features">
              <CardHeader>
                <CardTitle data-testid="text-features-title">Ready to Customize</CardTitle>
                <CardDescription data-testid="text-features-description">
                  This is a basic React application setup with Express backend
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li data-testid="text-feature-react">✓ React with TypeScript</li>
                  <li data-testid="text-feature-tailwind">✓ Tailwind CSS & shadcn/ui</li>
                  <li data-testid="text-feature-express">✓ Express backend</li>
                  <li data-testid="text-feature-hotreload">✓ Hot reload development</li>
                </ul>
              </CardContent>
            </Card>

            <Card data-testid="card-nextsteps">
              <CardHeader>
                <CardTitle data-testid="text-nextsteps-title">Next Steps</CardTitle>
                <CardDescription data-testid="text-nextsteps-description">
                  Add your own invoice generation code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li data-testid="text-step-forms">• Create invoice forms</li>
                  <li data-testid="text-step-pdf">• Add PDF export</li>
                  <li data-testid="text-step-storage">• Implement data storage</li>
                  <li data-testid="text-step-templates">• Design invoice templates</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" data-testid="button-get-started">
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
